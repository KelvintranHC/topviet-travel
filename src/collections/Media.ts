import type { CollectionConfig } from 'payload'

import { contentCreate, contentDelete, contentUpdate } from '@/core/access/payload-access'
import { hiddenAdmin } from './shared'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { ...hiddenAdmin },
  access: {
    read: () => true,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
