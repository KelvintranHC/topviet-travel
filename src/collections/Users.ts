import type { CollectionConfig } from 'payload'

import { ROLES } from '@/core/access/roles'
import {
  usersCreate,
  usersDelete,
  usersRead,
  usersUpdate,
} from '@/core/access/payload-access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    hidden: true,
  },
  access: {
    read: usersRead,
    create: usersCreate,
    update: usersUpdate,
    delete: usersDelete,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: ROLES.map((value) => ({
        label: value.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        value,
      })),
      saveToJWT: true,
      access: {
        update: ({ req }) => req.user?.role === 'super_admin',
      },
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
}
