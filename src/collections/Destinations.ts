import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: { useAsTitle: 'name', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'country', type: 'text' },
    { name: 'tourCount', type: 'number', defaultValue: 0 },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    { name: 'fallbackEmoji', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
