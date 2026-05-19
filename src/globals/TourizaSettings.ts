import type { GlobalConfig } from 'payload'

import { contentUpdate } from '@/core/access/payload-access'

export const TourizaSettings: GlobalConfig = {
  slug: 'touriza-settings',
  label: 'Cài đặt Touriza',
  admin: { hidden: true },
  access: {
    read: () => true,
    update: contentUpdate,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Top Viet Travel' },
    { name: 'logoUrl', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'topbar',
      type: 'group',
      fields: [
        { name: 'hotline', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'address', type: 'text' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'badge', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'primaryCta', type: 'text' },
        { name: 'secondaryCta', type: 'text' },
        { name: 'imageUrl', type: 'text' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'zalo', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
    {
      name: 'megaMenuDomestic',
      type: 'array',
      label: 'Mega menu — Tour trong nước',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'icon', type: 'text' },
        { name: 'iconBg', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'megaMenuInternational',
      type: 'array',
      label: 'Mega menu — Tour nước ngoài',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'icon', type: 'text' },
        { name: 'iconBg', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'whyChoose',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'footerAbout', type: 'textarea' },
    { name: 'copyright', type: 'text' },
  ],
}
