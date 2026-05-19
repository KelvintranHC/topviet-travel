import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/dashboard/login-form'
import { getCurrentUser } from '@/core/auth/session'
import { canReadDashboard } from '@/core/access/roles'

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user && canReadDashboard(user)) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm />
    </div>
  )
}
