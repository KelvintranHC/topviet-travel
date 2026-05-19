import { getPayloadClient } from '@/infrastructure/payload/client'

export async function findDestinations({ limit = 50 } = {}) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'destinations',
    limit,
    sort: 'order',
    depth: 0,
    overrideAccess: true,
    select: {
      name: true,
      fallbackEmoji: true,
      tourCount: true,
    },
  })
}
