import Link from 'next/link'

import type { Page } from '@/payload-types'

import { Icon } from './Icon'

type AboutContent = NonNullable<Page['about']>

function HeroTitle({ title }: { title: string }) {
  const lines = title.split(/\n|<br\s*\/?>/i)
  if (lines.length <= 1) return <>{title}</>
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  )
}

export function AboutPageView({
  page,
  hotline,
}: {
  page: Page
  hotline: string
}) {
  const about = page.about as AboutContent | undefined
  if (!about?.stats?.length) return null

  const heroTitle = page.heroTitle || page.title
  const heroSubtitle = page.heroSubtitle
  const heroImage =
    about.heroImageUrl || 'https://topviettravel.com/wp-content/uploads/2023/04/bac-au-1024x614.jpg'
  const tel = hotline.replace(/\s/g, '')

  return (
    <div id="about-page" className="page static-page about-page">
      <div className="about-hero">
        <div className="container">
          {about.heroBadge && (
            <div className="badge">
              <Icon id="i-award" /> {about.heroBadge}
            </div>
          )}
          <h1>
            <HeroTitle title={heroTitle} />
          </h1>
          {heroSubtitle && <p className="sub">{heroSubtitle}</p>}
        </div>
      </div>

      <div className="about-body">
        <div className="about-stats">
          {about.stats.map((stat, i) => (
            <div key={i} className="astat">
              <div className="icon">
                <Icon id={stat.icon || 'i-award'} />
              </div>
              <div className="val">{stat.value}</div>
              <div className="lbl">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="about-intro">
          <div className="about-intro-text">
            <div className="about-section">
              {about.introTitle && <h2>{about.introTitle}</h2>}
              <div className="sec-line" />
              {about.introParagraphs?.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para.html }} />
              ))}
            </div>
          </div>
          <div className="about-img-wrap">
            <img src={heroImage} alt="Top Viet Travel Tours" />
            <div className="about-img-badge">
              <div className="ic-wrap">
                <Icon id="i-award" />
              </div>
              <div className="ib-text">
                <div className="val">{about.imageBadgeTitle || 'Được cấp phép'}</div>
                <div className="lbl">
                  {about.imageBadgeText ||
                    'Tổng cục Du lịch Việt Nam cấp phép kinh doanh lữ hành quốc tế'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>PHẠM VI HOẠT ĐỘNG</h2>
          <div className="sec-line" />
          {about.coverageIntro && <p>{about.coverageIntro}</p>}
          {about.coverage && about.coverage.length > 0 && (
            <div className="coverage-grid">
              {about.coverage.map((item, i) => (
                <div key={i} className="cov-item">
                  <div className={`cov-icon ${item.iconColor || 'blue'}`}>
                    <Icon id={item.icon || 'i-globe'} />
                  </div>
                  <div className="cov-text">
                    <div className="ctitle">{item.title}</div>
                    {item.description && <div className="cdesc">{item.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {about.mottoParts && about.mottoParts.length > 0 && (
          <div className="motto-banner">
            {about.mottoLabel && <div className="motto-label">{about.mottoLabel}</div>}
            <div className="motto-text">
              {about.mottoParts.map((part, i) => (
                <span key={i}>
                  {i > 0 && <>&nbsp;–&nbsp;</>}
                  <em>{part.text}</em>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="about-section">
          <h2>CAM KẾT CỦA CHÚNG TÔI</h2>
          <div className="sec-line" />
          {about.commitmentsIntro && <p>{about.commitmentsIntro}</p>}
          {about.commitments && about.commitments.length > 0 && (
            <div className="commit-list">
              {about.commitments.map((item, i) => (
                <div key={i} className="commit-item">
                  <div className="ci-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="ci-text">
                    <div className="ctitle">{item.title}</div>
                    {item.description && <div className="cdesc">{item.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {(about.closingTitle || about.closingParagraphs?.length) && (
          <div className="about-closing">
            {about.closingTitle && <h3>{about.closingTitle}</h3>}
            {about.closingParagraphs?.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para.html }} />
            ))}
            {about.closingSign && (
              <div className="sign">
                Trân trọng kính chào! &nbsp; — &nbsp;{' '}
                <span style={{ color: 'var(--ink)' }}>{about.closingSign}</span>
              </div>
            )}
          </div>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: 52,
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/#tours"
            className="btn-hero-primary"
            style={{
              background: 'var(--g)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 6px 20px rgba(34,197,94,.35)',
            }}
          >
            <Icon id="i-search" /> Xem các tour nước ngoài
          </Link>
          <a
            href={`tel:${tel}`}
            style={{
              background: '#fff',
              color: 'var(--ink)',
              border: '2px solid var(--g)',
              padding: '14px 32px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Icon id="i-phone" /> Liên hệ tư vấn ngay
          </a>
        </div>
      </div>
    </div>
  )
}
