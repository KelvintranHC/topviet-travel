import type { CollectionConfig } from 'payload'

import { contentCollectionAccess, hiddenAdmin } from './shared'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', ...hiddenAdmin },
  access: contentCollectionAccess,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'heroTitle', type: 'text' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'content', type: 'textarea', required: true },
    { name: 'metaDescription', type: 'textarea' },
    {
      name: 'about',
      type: 'group',
      label: 'Nội dung trang Giới thiệu',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'gioi-thieu',
      },
      fields: [
        { name: 'heroBadge', type: 'text' },
        { name: 'heroImageUrl', type: 'text' },
        { name: 'imageBadgeTitle', type: 'text' },
        { name: 'imageBadgeText', type: 'textarea' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'icon', type: 'text', defaultValue: 'i-award' },
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        { name: 'introTitle', type: 'text' },
        {
          name: 'introParagraphs',
          type: 'array',
          fields: [{ name: 'html', type: 'textarea', required: true }],
        },
        { name: 'coverageIntro', type: 'textarea' },
        {
          name: 'coverage',
          type: 'array',
          fields: [
            { name: 'icon', type: 'text', defaultValue: 'i-globe' },
            {
              name: 'iconColor',
              type: 'select',
              options: [
                { label: 'Green', value: 'green' },
                { label: 'Blue', value: 'blue' },
                { label: 'Orange', value: 'orange' },
                { label: 'Purple', value: 'purple' },
                { label: 'Teal', value: 'teal' },
                { label: 'Yellow', value: 'yellow' },
              ],
              defaultValue: 'blue',
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
        { name: 'mottoLabel', type: 'text' },
        {
          name: 'mottoParts',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'commitmentsIntro', type: 'textarea' },
        {
          name: 'commitments',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
        { name: 'closingTitle', type: 'text' },
        {
          name: 'closingParagraphs',
          type: 'array',
          fields: [{ name: 'html', type: 'textarea', required: true }],
        },
        { name: 'closingSign', type: 'text' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Nội dung trang Liên hệ',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'lien-he',
      },
      fields: [
        { name: 'heroBadge', type: 'text' },
        { name: 'heroDescription', type: 'textarea' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        { name: 'addressLine1', type: 'text' },
        { name: 'addressLine2', type: 'text' },
        { name: 'mapEmbedUrl', type: 'text' },
        {
          name: 'workingHours',
          type: 'array',
          fields: [
            { name: 'day', type: 'text', required: true },
            { name: 'time', type: 'text', required: true },
            { name: 'isOpen', type: 'checkbox', defaultValue: true },
          ],
        },
        { name: 'afterHoursNote', type: 'textarea' },
        {
          name: 'faqs',
          type: 'array',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
      ],
    },
  ],
}
