import Link from 'next/link'

import { Button } from '@/components/ui/button'

type Props = {
  page: number
  totalPages: number
  totalDocs: number
  searchParams?: Record<string, string | undefined>
}

function buildHref(page: number, searchParams?: Record<string, string | undefined>) {
  const params = new URLSearchParams()
  if (searchParams?.created) params.set('created', searchParams.created)
  if (searchParams?.deleted) params.set('deleted', searchParams.deleted)
  if (page > 1) params.set('page', String(page))
  const q = params.toString()
  return q ? `/dashboard/tours?${q}` : '/dashboard/tours'
}

export function ToursPagination({ page, totalPages, totalDocs, searchParams }: Props) {
  if (totalPages <= 1) {
    return (
      <p className="text-sm text-muted-foreground">
        Hiển thị {totalDocs} tour
      </p>
    )
  }

  const from = (page - 1) * 25 + 1
  const to = Math.min(page * 25, totalDocs)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
      <p className="text-sm text-muted-foreground">
        {from}–{to} / {totalDocs} tour · Trang {page}/{totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} asChild={page > 1}>
          {page > 1 ? (
            <Link href={buildHref(page - 1, searchParams)}>← Trước</Link>
          ) : (
            <span>← Trước</span>
          )}
        </Button>
        <Button variant="outline" size="sm" disabled={page >= totalPages} asChild={page < totalPages}>
          {page < totalPages ? (
            <Link href={buildHref(page + 1, searchParams)}>Sau →</Link>
          ) : (
            <span>Sau →</span>
          )}
        </Button>
      </div>
    </div>
  )
}
