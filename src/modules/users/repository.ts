import { getPayloadClient } from '@/infrastructure/payload/client'

export async function findUsers({ page = 1, limit = 20 } = {}) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'users',
    page,
    limit,
    sort: '-createdAt',
    depth: 0,
    overrideAccess: true,
  })
}

export async function findUserById(id: string | number) {
  const payload = await getPayloadClient()
  return payload.findByID({
    collection: 'users',
    id,
    depth: 0,
  })
}

export async function createUser(data: {
  email: string
  password: string
  role: string
  name?: string
}) {
  const payload = await getPayloadClient()
  return payload.create({
    collection: 'users',
    data: data as never,
    overrideAccess: true,
  })
}

export async function updateUser(
  id: string | number,
  data: { email?: string; role?: string; name?: string },
) {
  const payload = await getPayloadClient()
  return payload.update({
    collection: 'users',
    id,
    data: data as never,
    overrideAccess: true,
  })
}

export async function deleteUser(id: string | number) {
  const payload = await getPayloadClient()
  return payload.delete({
    collection: 'users',
    id,
    overrideAccess: true,
  })
}
