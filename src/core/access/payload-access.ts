import type { Access, AccessArgs } from 'payload'

import {
  canDeleteContent,
  canManageUsers,
  canMutateContent,
  canReadDashboard,
  type AuthUser,
} from './roles'

function getUser({ req }: AccessArgs): AuthUser | null {
  const user = req.user
  if (!user || typeof user !== 'object') return null
  return {
    id: user.id,
    email: String(user.email ?? ''),
    role: 'role' in user ? (user.role as AuthUser['role']) : null,
  }
}

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const dashboardRead: Access = (args) => canReadDashboard(getUser(args))

export const contentRead: Access = dashboardRead

export const contentCreate: Access = (args) => canMutateContent(getUser(args))

export const contentUpdate: Access = contentCreate

export const contentDelete: Access = (args) => canDeleteContent(getUser(args))

export const usersRead: Access = (args) => canManageUsers(getUser(args))

export const usersCreate: Access = usersRead

export const usersUpdate: Access = (args) => {
  const actor = getUser(args)
  if (!canManageUsers(actor)) return false
  const target = args.data as { role?: string } | undefined
  if (target?.role === 'super_admin' && actor?.role !== 'super_admin') return false
  return true
}

export const usersDelete: Access = (args) => {
  const actor = getUser(args)
  return actor?.role === 'super_admin'
}
