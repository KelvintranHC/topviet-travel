import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const FAQItems: CollectionConfig = {
  slug: 'faq-items',
  admin: { useAsTitle: 'question', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
