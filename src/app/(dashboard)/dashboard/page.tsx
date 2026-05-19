import Link from 'next/link'

import { DashboardHeader } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requireAuth } from '@/core/auth/session'
import { getPayloadClient } from '@/infrastructure/payload/client'

export default async function DashboardOverviewPage() {
  const user = await requireAuth()
  const payload = await getPayloadClient()

  const [tours, destinations, testimonials, users] = await Promise.all([
    payload.count({ collection: 'tours' }),
    payload.count({ collection: 'destinations' }),
    payload.count({ collection: 'testimonials' }),
    payload.count({ collection: 'users' }),
  ])

  const stats = [
    { label: 'Tours', value: tours.totalDocs },
    { label: 'Điểm đến', value: destinations.totalDocs },
    { label: 'Đánh giá', value: testimonials.totalDocs },
    { label: 'Người dùng', value: users.totalDocs },
  ]

  return (
    <>
      <DashboardHeader
        user={user}
        title="Tổng quan"
        description="Top Viet Travel — dashboard quản lý nội dung Touriza"
      />
      <main className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardHeader className="pb-2">
                <CardDescription>{s.label}</CardDescription>
                <CardTitle className="text-3xl tabular-nums">{s.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Website công khai</CardTitle>
            <CardDescription>Frontend Next.js lấy dữ liệu từ Payload REST</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <a href="/" className="text-primary hover:underline" target="_blank">
              Mở trang chủ →
            </a>
            {' · '}
            <Link href="/dashboard/tours" className="text-primary hover:underline">
              Quản lý tours
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
