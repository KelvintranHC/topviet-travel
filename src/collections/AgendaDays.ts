import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const AgendaDays: CollectionConfig = {
  slug: 'agenda-days',
  admin: { useAsTitle: 'title', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'dayNumber', type: 'number', required: true, admin: { position: 'sidebar' } },
    {
      name: 'blocks',
      type: 'array',
      label: 'Khung giờ',
      fields: [
        {
          name: 'period',
          type: 'select',
          required: true,
          options: [
            { label: 'Morning', value: 'morning' },
            { label: 'Afternoon', value: 'afternoon' },
            { label: 'Evening', value: 'evening' },
          ],
        },
        {
          name: 'sessions',
          type: 'array',
          fields: [{ name: 'title', type: 'text', required: true }],
        },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
