import { notFound } from 'next/navigation'

import { TourDetailView } from '@/components/touriza/TourDetailView'
import { TourizaShell } from '@/components/touriza/TourizaShell'
import { getRelatedTours, getTourBySlug, getTourizaHomeData } from '@/lib/getTourizaData'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params
  const [data, tour] = await Promise.all([getTourizaHomeData(), getTourBySlug(slug)])

  if (!tour) notFound()

  const relatedTours = await getRelatedTours(tour.category, tour.slug, 3)
  const hotline = data.settings.topbar?.hotline || '0906 371 538'
  const zaloUrl = data.settings.social?.zalo

  return (
    <TourizaShell data={data}>
      <TourDetailView
        tour={tour}
        relatedTours={relatedTours}
        testimonials={data.testimonials}
        hotline={hotline}
        zaloUrl={zaloUrl}
      />
    </TourizaShell>
  )
}
