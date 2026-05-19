# Kiến trúc SaaS — Payload Headless + Custom Admin Dashboard

## 1. Tổng quan

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Next.js 15 (App Router)                          │
├──────────────────────┬──────────────────────┬───────────────────────────┤
│   (public)           │   (dashboard)        │   (payload)               │
│   Marketing site     │   Custom Admin UI    │   API only (no UI)        │
│   shadcn minimal     │   shadcn/ui full     │   REST + GraphQL          │
└──────────┬───────────┴──────────┬───────────┴─────────────┬─────────────┘
           │                      │                         │
           └──────────────────────┼─────────────────────────┘
                                  ▼
                    ┌─────────────────────────────┐
                    │   Payload CMS (Engine)       │
                    │   • Schema / Migrations      │
                    │   • Auth + JWT/Cookies       │
                    │   • RBAC (access control)    │
                    │   • Hooks / Business logic   │
                    │   • Media / Upload           │
                    └─────────────┬───────────────┘
                                  ▼
                           SQLite / Postgres
```

**Nguyên tắc:** Payload **không** render admin UI. Mọi thao tác quản trị đi qua dashboard Next.js gọi Payload API.

## 2. Phân tầng (Layered Architecture)

| Tầng | Thư mục | Trách nhiệm |
|------|---------|-------------|
| **Presentation** | `app/(dashboard)`, `components/dashboard` | UI, forms, tables, layout |
| **Application** | `src/modules/*` | Use-cases: listUsers, updateSpeaker |
| **Domain** | `src/core/access`, `src/core/auth` | RBAC, permissions, session |
| **Infrastructure** | `src/infrastructure/payload` | getPayload, API client |
| **Engine** | `src/collections`, `src/globals`, hooks | Schema, validation, business rules |

## 3. Payload — chỉ là Backend Engine

### 3.1 Trách nhiệm

- Định nghĩa **collections / globals** (single source of truth cho DB schema)
- **REST** `/api/*` và **GraphQL** `/api/graphql`
- **Authentication** (email/password, cookies `payload-token`)
- **Access control** (`access.read/create/update/delete`) theo role
- **Hooks** (`beforeChange`, `afterDelete`) cho business logic
- **Upload** media qua collection `media`

### 3.2 Không làm

- Không dùng Payload Admin UI (`app/(payload)/admin` đã gỡ)
- Không nhúng `@payloadcms/ui` trong dashboard

### 3.3 Cấu hình

```ts
// payload.config.ts
admin: {
  disable: true, // ẩn hoàn toàn admin mặc định
},
routes: {
  admin: '/_payload-admin-disabled', // fallback an toàn
},
```

## 4. Custom Dashboard (Linear / Notion / Stripe)

### 4.1 Design system

- **Tailwind CSS** + **CSS variables** (dark-first, neutral zinc)
- **shadcn/ui** (Radix primitives)
- Typography: Inter; spacing 4px grid; border subtle `border-border/60`
- Sidebar cố định, content scroll, command palette (phase 2)

### 4.2 Route structure

```
/dashboard              → Overview
/dashboard/users        → Quản lý users
/dashboard/speakers     → Speakers CRUD
/dashboard/content      → Site settings, FAQ, pricing...
/dashboard/media        → Thư viện file
/dashboard/settings     → Cấu hình hệ thống
/login                  → Đăng nhập
```

### 4.3 Auth flow

1. User POST `/api/users/login` (Payload REST) → cookie `payload-token`
2. Middleware `src/middleware.ts` bảo vệ `/dashboard/*`
3. Server Components: `getCurrentUser()` qua `payload.auth({ headers })`
4. Client Components: `fetch('/api/users/me', { credentials: 'include' })`

## 5. RBAC (Role-Based Access Control)

### 5.1 Roles

| Role | Mô tả |
|------|--------|
| `super_admin` | Full access, quản lý users & roles |
| `admin` | CRUD mọi content, không đổi super_admin |
| `editor` | CRUD content, không xóa users |
| `viewer` | Chỉ đọc |

### 5.2 Implementation

```ts
// src/core/access/roles.ts
export const ROLES = ['super_admin', 'admin', 'editor', 'viewer'] as const
export function hasRole(user, ...allowed: Role[]) { ... }
```

Collection `users` có field `role`. Mỗi collection dùng:

```ts
access: {
  read: canReadContent,
  create: canMutateContent,
  update: canMutateContent,
  delete: canDeleteContent,
}
```

## 6. Module pattern (mở rộng nhanh)

Mỗi module trong `src/modules/<name>/`:

```
users/
  types.ts           # DTO / view models
  repository.ts      # Payload queries (server-only)
  actions.ts         # Server Actions
  schema.ts          # Zod validation
  components/        # Module-specific UI (optional)
```

**Ví dụ thêm module mới (Speakers):**

1. Thêm access rules nếu cần tách biệt
2. `modules/speakers/repository.ts` — `findSpeakers`, `createSpeaker`
3. `app/(dashboard)/dashboard/speakers/page.tsx` — table + dialog
4. Đăng ký nav item trong `config/navigation.ts`

## 7. API consumption

### 7.1 Server (ưu tiên)

```ts
import { getPayloadClient } from '@/infrastructure/payload/client'
const payload = await getPayloadClient()
const users = await payload.find({ collection: 'users', ... })
```

### 7.2 Client (khi cần realtime)

```ts
import { api } from '@/infrastructure/api/client'
await api.post('/users/login', { email, password })
```

### 7.3 Server Actions

```ts
'use server'
export async function updateUserAction(id, data) {
  const user = await requireAuth()
  requireRole(user, 'admin', 'super_admin')
  return usersRepository.update(id, data)
}
```

## 8. Production checklist

- [ ] `PAYLOAD_SECRET` ≥ 32 chars, rotate định kỳ
- [ ] Database: Postgres (Supabase/Neon) thay SQLite
- [ ] Media: S3/R2 adapter
- [ ] Rate limiting trên `/api/users/login`
- [ ] CORS chỉ cho domain production
- [ ] Audit log collection (phase 2)
- [ ] E2E: Playwright login + CRUD smoke tests

## 9. Lộ trình triển khai

| Phase | Nội dung |
|-------|----------|
| **1** ✅ | Headless Payload, RBAC, dashboard shell, Users module |
| **2** | Speakers, Media library, Site Settings editor |
| **3** | Command palette, bulk actions, audit logs |
| **4** | Multi-tenant / organizations (nếu SaaS) |
