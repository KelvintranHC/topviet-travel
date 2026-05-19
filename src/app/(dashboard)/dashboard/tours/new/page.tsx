import { DashboardHeader } from '@/components/dashboard/header'
import { TourForm } from '@/components/dashboard/tour-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { canMutateContent } from '@/core/access/roles'
import { requireAuth } from '@/core/auth/session'
import { createTourAction } from '@/modules/tours/actions'

type Props = { searchParams: Promise<{ error?: string }> }

export default async function NewTourPage({ searchParams }: Props) {
  const user = await requireAuth()
  if (!canMutateContent(user)) {
    return (
      <>
        <DashboardHeader user={user} title="Thêm tour" />
        <main className="p-6 text-sm text-muted-foreground">Bạn không có quyền tạo tour.</main>
      </>
    )
  }

  const params = await searchParams

  return (
    <>
      <DashboardHeader user={user} title="Thêm tour" description="Tạo tour mới trên website" />
      <main className="p-6">
        {params.error && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{params.error}</p>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin tour</CardTitle>
          </CardHeader>
          <CardContent>
            <TourForm action={createTourAction} submitLabel="Tạo tour" />
          </CardContent>
        </Card>
      </main>
    </>
  )
}
