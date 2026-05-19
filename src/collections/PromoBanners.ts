import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const PromoBanners: CollectionConfig = {
  slug: 'promo-banners',
  admin: { useAsTitle: 'title', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'tag', type: 'text' },
    {
      name: 'overlayStyle',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Tối', value: 'dark' },
        { label: 'Xanh lá', value: 'green' },
        { label: 'Xanh dương', value: 'blue' },
      ],
    },
    { name: 'subtitle', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    { name: 'gradientFrom', type: 'text' },
    { name: 'gradientTo', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
