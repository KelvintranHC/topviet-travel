import { notFound } from 'next/navigation'

import { AboutPageView } from '@/components/touriza/AboutPageView'
import { TourizaShell } from '@/components/touriza/TourizaShell'
import { getPageBySlug, getTourizaHomeData } from '@/lib/getTourizaData'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const [data, page] = await Promise.all([getTourizaHomeData(), getPageBySlug('gioi-thieu')])

  if (!page) notFound()

  const hotline = data.settings.topbar?.hotline || '0906 371 538'
  const hasAboutContent = Boolean(page.about?.stats?.length)

  return (
    <TourizaShell data={data}>
      {hasAboutContent ? (
        <AboutPageView page={page} hotline={hotline} />
      ) : (
        <div id="about-page" className="page static-page about-page">
          <div className="about-hero">
            <div className="container">
              <h1>{page.heroTitle || page.title}</h1>
              {page.heroSubtitle && <p className="sub">{page.heroSubtitle}</p>}
            </div>
          </div>
          <div className="about-body">
            {page.content && <p style={{ lineHeight: 1.8 }}>{page.content}</p>}
          </div>
        </div>
      )}
    </TourizaShell>
  )
}
