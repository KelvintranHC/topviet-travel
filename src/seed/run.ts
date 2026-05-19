import { getPayload } from 'payload'
import config from '@payload-config'

import { seedTouriza } from './touriza-seed'

const payload = await getPayload({ config })
await seedTouriza(payload)
process.exit(0)
