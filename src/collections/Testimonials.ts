import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'authorName', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorLocation', type: 'text' },
    { name: 'tourName', type: 'text' },
    { name: 'authorCompany', type: 'text' },
    {
      name: 'avatarVariant',
      type: 'select',
      defaultValue: 'av1',
      options: [
        { label: 'Avatar 1', value: 'av1' },
        { label: 'Avatar 2', value: 'av2' },
        { label: 'Avatar 3', value: 'av3' },
        { label: 'Avatar 4', value: 'av4' },
        { label: 'Avatar 5', value: 'av5' },
        { label: 'Avatar 6', value: 'av6' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
