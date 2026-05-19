import Link from 'next/link'

import { DashboardHeader } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requireAuth } from '@/core/auth/session'

const collections = [
  { slug: 'tours', label: 'Tours', description: 'Tour trong/ngoài nước, giá, lịch trình' },
  { slug: 'destinations', label: 'Điểm đến', description: 'Điểm đến nổi bật trên trang chủ' },
  { slug: 'promo-banners', label: 'Banner khuyến mãi', description: 'Banner quảng cáo' },
  { slug: 'gallery-items', label: 'Thư viện ảnh', description: 'Ảnh gallery' },
  { slug: 'testimonials', label: 'Đánh giá', description: 'Phản hồi khách hàng' },
  { slug: 'pages', label: 'Trang tĩnh', description: 'Giới thiệu, liên hệ' },
]
export const dynamic = 'force-dynamic'
export default async function ContentPage() {
  const user = await requireAuth()

  return (
    <>
      <DashboardHeader
        user={user}
        title="Nội dung Touriza"
        description="Quản lý qua REST API Payload — dashboard CRUD đang mở rộng"
      />
      <main className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Card key={c.slug}>
              <CardHeader>
                <CardTitle className="text-base">{c.label}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/api/${c.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                  target="_blank"
                >
                  API /api/{c.slug} →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Global: Cài đặt site</CardTitle>
            <CardDescription>Topbar, hero, mega menu, footer</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/api/globals/touriza-settings" className="text-sm font-medium text-primary hover:underline" target="_blank">
              API /api/globals/touriza-settings →
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
