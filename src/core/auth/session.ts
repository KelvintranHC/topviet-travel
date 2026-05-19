import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { canReadDashboard, type AuthUser } from '@/core/access/roles'
import { getPayloadClient } from '@/infrastructure/payload/client'

/** Một request chỉ gọi payload.auth một lần (layout + page dùng chung). */
export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  const payload = await getPayloadClient()
  const headersList = await headers()

  const { user } = await payload.auth({ headers: headersList })

  if (!user || typeof user !== 'object') return null

  return {
    id: user.id,
    email: String(user.email ?? ''),
    role: 'role' in user ? (user.role as AuthUser['role']) : null,
  }
})

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()
  if (!user || !canReadDashboard(user)) {
    redirect('/login')
  }
  return user
}
