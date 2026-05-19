import { getPayloadClient } from '@/infrastructure/payload/client'
import type { Tour } from '@/payload-types'

import type { TourFormInput } from './parse-form'

const TOUR_LIST_SELECT = {
  title: true,
  slug: true,
  region: true,
  price: true,
  priceLabel: true,
  featured: true,
} as const

/** Danh sách dashboard — chỉ field cần cho bảng, có phân trang. */
export async function findToursForList({ page = 1, limit = 25 } = {}) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'tours',
    page,
    limit,
    sort: 'order',
    depth: 0,
    overrideAccess: true,
    select: TOUR_LIST_SELECT,
  })
}

/** @deprecated Dùng findToursForList cho list view */
export async function findTours({ page = 1, limit = 100 } = {}) {
  return findToursForList({ page, limit: Math.min(limit, 100) })
}

export async function findTourById(id: string | number) {
  const payload = await getPayloadClient()
  return payload.findByID({
    collection: 'tours',
    id,
    depth: 0,
    overrideAccess: true,
  })
}

export async function createTour(data: TourFormInput) {
  const payload = await getPayloadClient()
  return payload.create({
    collection: 'tours',
    data: data as never,
    overrideAccess: true,
  })
}

export async function updateTour(id: string | number, data: TourFormInput) {
  const payload = await getPayloadClient()
  return payload.update({
    collection: 'tours',
    id,
    data: data as never,
    overrideAccess: true,
  })
}

export async function deleteTour(id: string | number) {
  const payload = await getPayloadClient()
  return payload.delete({
    collection: 'tours',
    id,
    overrideAccess: true,
  })
}

export type { Tour }
