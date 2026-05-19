import { DashboardHeader } from '@/components/dashboard/header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { canManageUsers } from '@/core/access/roles'
import { requireAuth } from '@/core/auth/session'
import { createUserAction } from '@/modules/users/actions'
import * as usersRepo from '@/modules/users/repository'
import { ROLES } from '@/core/access/roles'

export default async function UsersPage() {
  const user = await requireAuth()
  if (!canManageUsers(user)) {
    return (
      <>
        <DashboardHeader user={user} title="Người dùng" />
        <main className="p-6 text-sm text-muted-foreground">Bạn không có quyền truy cập module này.</main>
      </>
    )
  }

  const { docs } = await usersRepo.findUsers({ limit: 50 })

  return (
    <>
      <DashboardHeader user={user} title="Người dùng" description="CRUD qua Payload API + RBAC" />
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Danh sách</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Email</th>
                    <th className="pb-3 pr-4 font-medium">Tên</th>
                    <th className="pb-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((u) => (
                    <tr key={u.id} className="border-b border-border/50">
                      <td className="py-3 pr-4">{u.email}</td>
                      <td className="py-3 pr-4">{u.name || '—'}</td>
                      <td className="py-3">
                        <Badge variant="secondary">{String(u.role ?? 'editor')}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thêm người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createUserAction} className="grid max-w-md gap-3">
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Mật khẩu"
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              />
              <input
                name="name"
                type="text"
                placeholder="Tên hiển thị"
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              />
              <select
                name="role"
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                defaultValue="editor"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                Tạo user
              </button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
