import type { Tour } from '@/payload-types'

export type TourFormInput = {
  title: string
  slug: string
  category: Tour['category']
  region: string
  destination?: string
  duration?: string
  departureDate?: string
  price?: number
  priceLabel?: string
  badge?: Tour['badge']
  imageUrl?: string
  fallbackEmoji?: string
  externalUrl?: string
  featured?: boolean
  order?: number
  overview?: string
  itinerary?: Tour['itinerary']
  includes?: Tour['includes']
  excludes?: Tour['excludes']
  terms?: string
}

function str(formData: FormData, key: string): string | undefined {
  const v = formData.get(key)
  if (v === null || v === '') return undefined
  return String(v).trim()
}

function strRequired(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim()
}

function linesToItems(formData: FormData, key: string): { item: string }[] | undefined {
  const raw = str(formData, key)
  if (!raw) return undefined
  const items = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((item) => ({ item }))
  return items.length ? items : undefined
}

function parseItinerary(formData: FormData): Tour['itinerary'] | undefined {
  const raw = str(formData, 'itinerary')
  if (!raw || raw === '[]') return undefined
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) throw new Error('itinerary must be array')
    return parsed.map((row) => ({
      day: String((row as { day?: string }).day ?? ''),
      title: String((row as { title?: string }).title ?? ''),
      description: (row as { description?: string }).description || undefined,
    }))
  } catch {
    throw new Error('Lịch trình (JSON) không hợp lệ')
  }
}

export function parseTourFormData(formData: FormData): TourFormInput {
  const priceRaw = str(formData, 'price')
  const orderRaw = str(formData, 'order')

  return {
    title: strRequired(formData, 'title'),
    slug: strRequired(formData, 'slug'),
    category: strRequired(formData, 'category') as Tour['category'],
    region: strRequired(formData, 'region'),
    destination: str(formData, 'destination'),
    duration: str(formData, 'duration'),
    departureDate: str(formData, 'departureDate'),
    price: priceRaw && !Number.isNaN(Number(priceRaw)) ? Number(priceRaw) : undefined,
    priceLabel: str(formData, 'priceLabel'),
    badge: (str(formData, 'badge') as Tour['badge']) || 'none',
    imageUrl: str(formData, 'imageUrl'),
    fallbackEmoji: str(formData, 'fallbackEmoji'),
    externalUrl: str(formData, 'externalUrl'),
    featured: formData.get('featured') === 'on',
    order: orderRaw ? Number(orderRaw) : 0,
    overview: str(formData, 'overview'),
    itinerary: parseItinerary(formData),
    includes: linesToItems(formData, 'includes'),
    excludes: linesToItems(formData, 'excludes'),
    terms: str(formData, 'terms'),
  }
}

export function itineraryToJson(itinerary: Tour['itinerary']): string {
  if (!itinerary?.length) return ''
  return JSON.stringify(
    itinerary.map(({ day, title, description }) => ({ day, title, description: description ?? '' })),
    null,
    2,
  )
}

export function itemsToLines(items: Tour['includes']): string {
  if (!items?.length) return ''
  return items.map((i) => i.item).join('\n')
}
