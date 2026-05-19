import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: { useAsTitle: 'location', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'location', type: 'text', required: true },
    { name: 'guestName', type: 'text' },
    { name: 'caption', type: 'text' },
    { name: 'likeCount', type: 'number', defaultValue: 0 },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
        { label: 'Tall', value: 'tall' },
      ],
    },
    { name: 'hasInstagram', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
