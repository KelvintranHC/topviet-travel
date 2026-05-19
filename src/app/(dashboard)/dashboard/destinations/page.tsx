import { DashboardHeader } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { requireAuth } from '@/core/auth/session'
import * as destinationsRepo from '@/modules/destinations/repository'

export default async function DestinationsDashboardPage() {
  const user = await requireAuth()
  const { docs } = await destinationsRepo.findDestinations({ limit: 50 })

  return (
    <>
      <DashboardHeader user={user} title="Điểm đến" description="Quản lý điểm đến trên trang chủ" />
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Danh sách điểm đến</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between border-b border-border/50 py-2">
                  <span>
                    {d.fallbackEmoji} {d.name}
                  </span>
                  <span className="text-muted-foreground">{d.tourCount} tour</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
