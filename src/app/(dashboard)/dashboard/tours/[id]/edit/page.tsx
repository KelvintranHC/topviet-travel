import { notFound } from 'next/navigation'

import { DashboardHeader } from '@/components/dashboard/header'
import { TourForm } from '@/components/dashboard/tour-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { canDeleteContent, canMutateContent } from '@/core/access/roles'
import { requireAuth } from '@/core/auth/session'
import { deleteTourAction, updateTourAction } from '@/modules/tours/actions'
import * as toursRepo from '@/modules/tours/repository'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string; error?: string }>
}

export default async function EditTourPage({ params, searchParams }: Props) {
  const user = await requireAuth()
  const { id } = await params
  const query = await searchParams

  if (!canMutateContent(user)) {
    return (
      <>
        <DashboardHeader user={user} title="Sửa tour" />
        <main className="p-6 text-sm text-muted-foreground">Bạn không có quyền chỉnh sửa tour.</main>
      </>
    )
  }

  let tour
  try {
    tour = await toursRepo.findTourById(id)
  } catch {
    notFound()
  }

  const boundUpdate = updateTourAction.bind(null, id)
  const boundDelete = canDeleteContent(user) ? deleteTourAction.bind(null, id) : null

  return (
    <>
      <DashboardHeader user={user} title="Sửa tour" description={tour.title} />
      <main className="p-6">
        {query.saved && (
          <p className="mb-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Đã lưu thay đổi.
          </p>
        )}
        {query.error && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{query.error}</p>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Chỉnh sửa: {tour.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <TourForm
              tour={tour}
              action={boundUpdate}
              deleteAction={boundDelete}
              submitLabel="Lưu thay đổi"
            />
          </CardContent>
        </Card>
      </main>
    </>
  )
}
