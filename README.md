# Top Viet Travel (Touriza) — Payload Headless + Custom Admin

Website du lịch chuyển từ `touriza_topviet.html` sang **Next.js 15 + Payload CMS 3 + SQLite**.

## Kiến trúc

- **Payload CMS** — backend engine (schema, REST API, auth, RBAC, uploads)
- **Custom Dashboard** — `/dashboard` (Next.js + shadcn/ui)
- **Marketing site** — `app/(frontend)` — giao diện Touriza

Chi tiết: [`ARCHITECTURE.md`](./ARCHITECTURE.md)

## Chạy project

```bash
cd website
pnpm install
pnpm dev
```

| URL | Mô tả |
|-----|--------|
| http://localhost:3002 | Trang chủ Top Viet Travel |
| http://localhost:3002/tour/bac-au | Chi tiết tour |
| http://localhost:3002/gioi-thieu | Giới thiệu |
| http://localhost:3002/lien-he | Liên hệ |
| http://localhost:3002/dashboard | CMS dashboard |
| http://localhost:3002/login | Đăng nhập |
| http://localhost:3002/api/* | Payload REST API |

**Đăng nhập dashboard:** `admin@touriza.local` / `admin123`

## Collections (CMS)

| Collection | Nội dung |
|------------|----------|
| `tours` | Tour trong/ngoài nước, giá, lịch trình |
| `destinations` | Điểm đến trang chủ |
| `promo-banners` | Banner khuyến mãi |
| `gallery-items` | Thư viện ảnh |
| `testimonials` | Đánh giá khách hàng |
| `pages` | Trang Giới thiệu, Liên hệ |
| `media` | Upload ảnh |

## Global

**`touriza-settings`** — topbar, hero, mega menu, why choose, footer.

## Seed lại dữ liệu

Sau khi đổi schema, xóa DB và chạy lại:

```bash
rm payload.db && pnpm dev
```

Hoặc: `pnpm seed` (chạy `src/seed/run.ts`).

## File tham chiếu

- HTML gốc: `touriza_topviet.html`
- CSS/JS: `public/css/touriza.css`, `public/js/touriza.js`
