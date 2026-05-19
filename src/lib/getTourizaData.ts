import { getPayload } from 'payload'
import config from '@payload-config'

const sortByOrder = <T extends { order?: number | null }>(items: T[]) =>
  [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export async function getTourizaHomeData() {
  const payload = await getPayload({ config })

  const [settings, tours, destinations, testimonials, promoBanners, galleryItems] =
    await Promise.all([
      payload.findGlobal({ slug: 'touriza-settings', depth: 2 }),
      payload.find({ collection: 'tours', limit: 100, sort: 'order', depth: 1 }),
      payload.find({ collection: 'destinations', limit: 20, sort: 'order', depth: 1 }),
      payload.find({ collection: 'testimonials', limit: 20, sort: 'order' }),
      payload.find({ collection: 'promo-banners', limit: 10, sort: 'order', depth: 1 }),
      payload.find({ collection: 'gallery-items', limit: 20, sort: 'order', depth: 1 }),
    ])

  return {
    settings,
    tours: sortByOrder(tours.docs),
    destinations: sortByOrder(destinations.docs),
    testimonials: sortByOrder(testimonials.docs),
    promoBanners: sortByOrder(promoBanners.docs),
    galleryItems: sortByOrder(galleryItems.docs),
  }
}

export async function getTourBySlug(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function getRelatedTours(category: string, excludeSlug: string, limit = 3) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'tours',
    where: {
      and: [{ category: { equals: category } }, { slug: { not_equals: excludeSlug } }],
    },
    limit,
    sort: 'order',
    depth: 1,
  })
  return result.docs
}

export async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

export type TourizaHomeData = Awaited<ReturnType<typeof getTourizaHomeData>>
