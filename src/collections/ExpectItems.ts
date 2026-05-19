import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const ExpectItems: CollectionConfig = {
  slug: 'expect-items',
  admin: { useAsTitle: 'title', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'number', type: 'text', required: true, admin: { description: 'VD: 01, 02, 03' } },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
