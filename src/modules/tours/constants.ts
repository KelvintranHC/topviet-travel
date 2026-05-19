import type { Tour } from '@/payload-types'

export const TOUR_CATEGORIES: { label: string; value: Tour['category'] }[] = [
  { label: 'Châu Âu', value: 'europe' },
  { label: 'Châu Á', value: 'asia' },
  { label: 'Trung Đông', value: 'middle-east' },
  { label: 'Châu Phi', value: 'africa' },
  { label: 'Châu Mỹ', value: 'americas' },
  { label: 'Châu Úc', value: 'oceania' },
  { label: 'Trong nước', value: 'domestic' },
]

export const TOUR_BADGES: { label: string; value: NonNullable<Tour['badge']> }[] = [
  { label: 'Không', value: 'none' },
  { label: 'Hot', value: 'hot' },
  { label: 'Mới', value: 'new' },
  { label: 'Xuân 2026', value: 'spring-2026' },
]
