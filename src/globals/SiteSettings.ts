import type { GlobalConfig } from 'payload'

import { contentUpdate } from '@/core/access/payload-access'

const bannerGroup = (name: string, label: string): GlobalConfig['fields'][number] => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'title', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text', admin: { description: 'URL ảnh nền (fallback)' } },
  ],
})

const sectionIntro = (name: string, label: string): GlobalConfig['fields'][number] => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'label', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaLink', type: 'text' },
  ],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Cài đặt website',
  admin: { hidden: true },
  access: {
    read: () => true,
    update: contentUpdate,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Think Forward' },
    { name: 'siteTagline', type: 'text', defaultValue: 'Summit' },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'ctaLabel', type: 'text', defaultValue: 'Get tickets' },
        { name: 'ctaLink', type: 'text', defaultValue: '#pricing' },
        { name: 'dateRange', type: 'text' },
        { name: 'venue', type: 'text' },
        { name: 'location', type: 'text' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'About' },
        { name: 'heading', type: 'textarea' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'number', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    sectionIntro('whatsOn', "What's on"),
    sectionIntro('speakers', 'Speakers'),
    {
      name: 'agenda',
      type: 'group',
      label: 'Agenda',
      fields: [
        { name: 'dateRange', type: 'text' },
        { name: 'label', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
      ],
    },
    sectionIntro('testimonials', 'Testimonials'),
    sectionIntro('pricing', 'Pricing'),
    sectionIntro('sponsors', 'Sponsors'),
    sectionIntro('faq', 'FAQ'),
    bannerGroup('involveBanner', 'Banner — Want to be involved?'),
    bannerGroup('sponsorBanner', 'Banner — Become a sponsor'),
    {
      name: 'footerCta',
      type: 'group',
      label: 'Footer CTA',
      fields: [
        { name: 'credit', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaLink', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
    {
      name: 'footerLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
