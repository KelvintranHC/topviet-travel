'use server'

import { revalidatePath } from 'next/cache'

import { canManageUsers, type Role } from '@/core/access/roles'
import { requireAuth } from '@/core/auth/session'

import * as usersRepo from './repository'

export async function createUserAction(formData: FormData) {
  const actor = await requireAuth()
  if (!canManageUsers(actor)) throw new Error('Forbidden')

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const role = String(formData.get('role') ?? 'editor') as Role
  const name = String(formData.get('name') ?? '') || undefined

  await usersRepo.createUser({ email, password, role, name })
  revalidatePath('/dashboard/users')
}

export async function updateUserAction(id: string, formData: FormData) {
  const actor = await requireAuth()
  if (!canManageUsers(actor)) throw new Error('Forbidden')

  const email = String(formData.get('email') ?? '')
  const role = String(formData.get('role') ?? 'editor') as Role
  const name = String(formData.get('name') ?? '') || undefined

  await usersRepo.updateUser(id, { email, role, name })
  revalidatePath('/dashboard/users')
}

export async function deleteUserAction(id: string) {
  const actor = await requireAuth()
  if (actor.role !== 'super_admin') throw new Error('Forbidden')

  await usersRepo.deleteUser(id)
  revalidatePath('/dashboard/users')
}
