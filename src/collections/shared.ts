import type { CollectionConfig } from 'payload'

import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from '@/core/access/payload-access'

/** Public read for marketing site; mutations require dashboard role */
export const contentCollectionAccess: NonNullable<CollectionConfig['access']> = {
  read: () => true,
  create: contentCreate,
  update: contentUpdate,
  delete: contentDelete,
}

export const hiddenAdmin = { hidden: true } as const
