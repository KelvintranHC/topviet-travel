import { notFound } from 'next/navigation'

import { ContactPageView } from '@/components/touriza/ContactPageView'
import { TourizaShell } from '@/components/touriza/TourizaShell'
import { getPageBySlug, getTourizaHomeData } from '@/lib/getTourizaData'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const [data, page] = await Promise.all([getTourizaHomeData(), getPageBySlug('lien-he')])

  if (!page) notFound()

  const topbar = data.settings.topbar || {}

  return (
    <TourizaShell data={data}>
      <ContactPageView page={page} topbar={topbar} tours={data.tours} />
    </TourizaShell>
  )
}
