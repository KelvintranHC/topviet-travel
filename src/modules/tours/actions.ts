'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { canDeleteContent, canMutateContent } from '@/core/access/roles'
import { requireAuth } from '@/core/auth/session'

import { parseTourFormData } from './parse-form'
import * as toursRepo from './repository'

export async function createTourAction(formData: FormData) {
  const user = await requireAuth()
  if (!canMutateContent(user)) throw new Error('Forbidden')

  try {
    const data = parseTourFormData(formData)
    await toursRepo.createTour(data)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Lỗi tạo tour'
    redirect(`/dashboard/tours/new?error=${encodeURIComponent(msg)}`)
  }

  revalidatePath('/dashboard/tours')
  revalidatePath('/')
  redirect('/dashboard/tours?created=1')
}

export async function updateTourAction(id: string, formData: FormData) {
  const user = await requireAuth()
  if (!canMutateContent(user)) throw new Error('Forbidden')

  try {
    const data = parseTourFormData(formData)
    await toursRepo.updateTour(id, data)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Lỗi cập nhật tour'
    redirect(`/dashboard/tours/${id}/edit?error=${encodeURIComponent(msg)}`)
  }

  revalidatePath('/dashboard/tours')
  revalidatePath(`/dashboard/tours/${id}/edit`)
  revalidatePath('/')
  revalidatePath(`/tour/${formData.get('slug')}`)
  redirect(`/dashboard/tours/${id}/edit?saved=1`)
}

export async function deleteTourAction(id: string) {
  const user = await requireAuth()
  if (!canDeleteContent(user)) throw new Error('Forbidden')

  await toursRepo.deleteTour(id)
  revalidatePath('/dashboard/tours')
  revalidatePath('/')
  redirect('/dashboard/tours?deleted=1')
}
