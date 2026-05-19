import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: { useAsTitle: 'title', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Châu Âu', value: 'europe' },
        { label: 'Châu Á', value: 'asia' },
        { label: 'Trung Đông', value: 'middle-east' },
        { label: 'Châu Phi', value: 'africa' },
        { label: 'Châu Mỹ', value: 'americas' },
        { label: 'Châu Úc', value: 'oceania' },
        { label: 'Trong nước', value: 'domestic' },
      ],
    },
    { name: 'region', type: 'text', required: true },
    { name: 'destination', type: 'text' },
    { name: 'duration', type: 'text', admin: { description: 'VD: 12N/11Đ' } },
    { name: 'departureDate', type: 'text' },
    {
      name: 'price',
      type: 'number',
      admin: { description: 'VND — để trống nếu "Liên hệ"' },
    },
    { name: 'priceLabel', type: 'text', admin: { description: 'VD: Liên hệ' } },
    {
      name: 'badge',
      type: 'select',
      options: [
        { label: 'Hot', value: 'hot' },
        { label: 'Mới', value: 'new' },
        { label: 'Xuân 2026', value: 'spring-2026' },
        { label: 'Không', value: 'none' },
      ],
      defaultValue: 'none',
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    { name: 'fallbackEmoji', type: 'text' },
    { name: 'externalUrl', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
    // Tour detail
    { name: 'route', type: 'text', admin: { description: 'VD: Copenhagen → Oslo → Stockholm' } },
    { name: 'overview', type: 'textarea' },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text', defaultValue: '✈️' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        { name: 'day', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'chip', type: 'text' },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'label', type: 'text' }],
        },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'tourCode', type: 'text' },
    { name: 'airline', type: 'text' },
    { name: 'departureFrom', type: 'text' },
    { name: 'hotelInfo', type: 'text' },
    { name: 'visaInfo', type: 'text' },
    { name: 'insuranceInfo', type: 'text' },
    { name: 'tourType', type: 'text' },
    { name: 'depositNote', type: 'text' },
    {
      name: 'includes',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'excludes',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'terms', type: 'textarea' },
  ],
}
