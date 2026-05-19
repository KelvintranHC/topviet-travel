import { dashboardNav } from '@/config/navigation'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { requireAuth } from '@/core/auth/session'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userRole={user.role} items={dashboardNav} />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
