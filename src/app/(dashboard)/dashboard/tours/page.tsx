import Link from 'next/link'

import { DashboardHeader } from '@/components/dashboard/header'
import { ToursPagination } from '@/components/dashboard/tours-pagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { canMutateContent } from '@/core/access/roles'
import { requireAuth } from '@/core/auth/session'
import * as toursRepo from '@/modules/tours/repository'

const PER_PAGE = 25

type Props = {
  searchParams: Promise<{ page?: string; created?: string; deleted?: string }>
}

export default async function ToursDashboardPage({ searchParams }: Props) {
  const user = await requireAuth()
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)
  const result = await toursRepo.findToursForList({ page, limit: PER_PAGE })
  const { docs, totalDocs, totalPages } = result
  const canEdit = canMutateContent(user)

  return (
    <>
      <DashboardHeader user={user} title="Tours" description={`${totalDocs} tour trong hệ thống`} />
      <main className="space-y-4 p-6">
        {params.created && (
          <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Đã tạo tour mới.
          </p>
        )}
        {params.deleted && (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Đã xóa tour.
          </p>
        )}

        <div className="flex justify-end">
          {canEdit && (
            <Button asChild>
              <Link href="/dashboard/tours/new">+ Thêm tour</Link>
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Danh sách tour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-4">Tên</th>
                    <th className="pb-2 pr-4">Slug</th>
                    <th className="pb-2 pr-4">Vùng</th>
                    <th className="pb-2 pr-4">Giá</th>
                    <th className="pb-2">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((t) => (
                    <tr key={t.id} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium">
                        {t.title}
                        {t.featured && (
                          <Badge variant="secondary" className="ml-2">
                            Nổi bật
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <a href={`/tour/${t.slug}`} className="text-primary hover:underline" target="_blank">
                          {t.slug}
                        </a>
                      </td>
                      <td className="py-3 pr-4">{t.region}</td>
                      <td className="py-3 pr-4">
                        {t.priceLabel || (t.price ? t.price.toLocaleString('vi-VN') + '₫' : '—')}
                      </td>
                      <td className="py-3">
                        {canEdit ? (
                          <Link href={`/dashboard/tours/${t.id}/edit`} className="text-primary hover:underline">
                            Sửa
                          </Link>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ToursPagination
              page={page}
              totalPages={totalPages}
              totalDocs={totalDocs}
              searchParams={{ created: params.created, deleted: params.deleted }}
            />
          </CardContent>
        </Card>
      </main>
    </>
  )
}
