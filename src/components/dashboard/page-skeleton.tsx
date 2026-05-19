import { cn } from '@/lib/utils'

function Bone({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} />
}

export function DashboardPageSkeleton({ rows = 6 }: { rows?: number }) {
  return (
  <>
      <div className="flex h-14 items-center justify-between border-b border-border px-6">
        <div className="space-y-2">
          <Bone className="h-5 w-40" />
          <Bone className="h-3 w-56" />
        </div>
        <div className="flex items-center gap-3">
          <Bone className="h-6 w-20" />
          <Bone className="h-4 w-32" />
          <Bone className="h-8 w-20" />
        </div>
      </div>
      <main className="space-y-4 p-6">
        <Bone className="ml-auto h-9 w-28" />
        <div className="rounded-lg border border-border bg-card p-6">
          <Bone className="mb-4 h-4 w-36" />
          <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
              <Bone key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export function DashboardStatsSkeleton() {
  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-border px-6">
        <div className="space-y-2">
          <Bone className="h-5 w-28" />
          <Bone className="h-3 w-64" />
        </div>
        <div className="flex items-center gap-3">
          <Bone className="h-6 w-20" />
          <Bone className="h-4 w-32" />
          <Bone className="h-8 w-20" />
        </div>
      </div>
      <main className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <Bone className="mb-2 h-3 w-16" />
              <Bone className="h-8 w-12" />
            </div>
          ))}
        </div>
        <Bone className="mt-6 h-40 w-full rounded-lg" />
      </main>
    </>
  )
}
