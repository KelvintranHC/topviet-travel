import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  admin: { useAsTitle: 'name', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoUrl',
      type: 'text',
      admin: { description: 'URL logo SVG/PNG (dùng khi chưa upload)' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
