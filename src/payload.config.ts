import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Destinations } from './collections/Destinations'
import { GalleryItems } from './collections/GalleryItems'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { PromoBanners } from './collections/PromoBanners'
import { Testimonials } from './collections/Testimonials'
import { Tours } from './collections/Tours'
import { Users } from './collections/Users'
import { TourizaSettings } from './globals/TourizaSettings'
import { seedTouriza } from './seed/touriza-seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Engine',
    },
  },
  routes: {
    admin: '/_payload-engine',
  },
  collections: [
    Users,
    Media,
    Tours,
    Destinations,
    PromoBanners,
    Testimonials,
    GalleryItems,
    Pages,
  ],
  globals: [TourizaSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),
  sharp,
  onInit: async (payload) => {
    await seedTouriza(payload)
  },
})
