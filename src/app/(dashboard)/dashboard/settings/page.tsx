import Link from 'next/link'

import { DashboardHeader } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requireAuth } from '@/core/auth/session'

export default async function SettingsPage() {
  const user = await requireAuth()

  return (
    <>
      <DashboardHeader
        user={user}
        title="Cài đặt site"
        description="Global Touriza — topbar, hero, mega menu, footer"
      />
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">touriza-settings</CardTitle>
            <CardDescription>Chỉnh sửa qua REST API (PATCH sau khi đăng nhập)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              Role: <strong>{user.role}</strong>
            </p>
            <Link href="/api/globals/touriza-settings" className="text-primary hover:underline" target="_blank">
              GET /api/globals/touriza-settings →
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
