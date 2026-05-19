import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  admin: { useAsTitle: 'name', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Ảnh diễn giả (ưu tiên hơn URL)' },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: { description: 'URL ảnh ngoài (dùng khi chưa upload)' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
