export const ROLES = ['super_admin', 'admin', 'editor', 'viewer'] as const

export type Role = (typeof ROLES)[number]

export type AuthUser = {
  id: number | string
  email: string
  role?: Role | null
}

export function hasRole(user: AuthUser | null | undefined, ...allowed: Role[]): boolean {
  if (!user?.role) return false
  return allowed.includes(user.role as Role)
}

export function isSuperAdmin(user: AuthUser | null | undefined): boolean {
  return user?.role === 'super_admin'
}

export function canManageUsers(user: AuthUser | null | undefined): boolean {
  return hasRole(user, 'super_admin', 'admin')
}

export function canMutateContent(user: AuthUser | null | undefined): boolean {
  return hasRole(user, 'super_admin', 'admin', 'editor')
}

export function canDeleteContent(user: AuthUser | null | undefined): boolean {
  return hasRole(user, 'super_admin', 'admin')
}

export function canReadDashboard(user: AuthUser | null | undefined): boolean {
  return hasRole(user, 'super_admin', 'admin', 'editor', 'viewer')
}
