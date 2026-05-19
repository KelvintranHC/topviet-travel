import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const PricingTiers: CollectionConfig = {
  slug: 'pricing-tiers',
  admin: { useAsTitle: 'name', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'currentPrice', type: 'number', required: true },
    { name: 'originalPrice', type: 'number', required: true },
    { name: 'intro', type: 'text', required: true },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Buy your ticket' },
    { name: 'ctaLink', type: 'text' },
    { name: 'offerNote', type: 'text', defaultValue: 'Offer ends in 12 days' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
