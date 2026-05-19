import type { Page, Tour } from '@/payload-types'

import { CONTACT_PAGE_SEED } from '@/seed/contact-page-data'

import { ContactFaqClient } from './ContactFaqClient'
import { ContactFormClient } from './ContactFormClient'
import { Icon } from './Icon'

type ContactContent = NonNullable<Page['contact']>
type Topbar = { hotline?: string | null; email?: string | null; address?: string | null }

const DEFAULTS = CONTACT_PAGE_SEED.contact!

function ContactHeroTitle({ title }: { title: string }) {
  const lines = title.split(/\n|<br\s*\/?>/i)
  if (lines.length <= 1) return <>{title}</>
  return (
    <>
      {lines[0]}
      <br />
      <span>{lines.slice(1).join(' ')}</span>
    </>
  )
}

function tourLabel(tour: Tour): string {
  const title = tour.title || ''
  const duration = tour.duration ? ` (${tour.duration})` : ''
  return `${title}${duration}`
}

export function ContactPageView({
  page,
  topbar,
  tours,
}: {
  page: Page
  topbar: Topbar
  tours: Tour[]
}) {
  const c: ContactContent = {
    ...DEFAULTS,
    ...page.contact,
    stats: page.contact?.stats?.length ? page.contact.stats : DEFAULTS.stats,
    workingHours: page.contact?.workingHours?.length ? page.contact.workingHours : DEFAULTS.workingHours,
    faqs: page.contact?.faqs?.length ? page.contact.faqs : DEFAULTS.faqs,
  }

  const hotline = topbar.hotline || '0906 371 538'
  const email = topbar.email || 'info@topviettravel.com'
  const addressLine1 = c.addressLine1 || '37/4 Nguyễn Cảnh Chân'
  const addressLine2 = c.addressLine2 || 'P. Cầu Ông Lãnh, Quận 1, TP.HCM'
  const officeShort = topbar.address || `${addressLine1}, Q.1, TP.HCM`
  const telHref = `tel:${hotline.replace(/\s/g, '')}`
  const heroTitle = page.heroTitle || page.title || 'LIÊN HỆ VỚI\nTOP VIET TRAVEL'
  const heroDesc = c.heroDescription || page.heroSubtitle || DEFAULTS.heroDescription

  const tourOptions = tours.map((t) => ({
    id: String(t.id),
    label: tourLabel(t),
  }))

  return (
    <div id="contact-page" className="page static-page contact-page">
      <div className="contact-hero">
        <div className="container">
          <div className="ch-top">
            {c.heroBadge && (
              <div className="ch-badge">
                <Icon id="i-headset" /> {c.heroBadge}
              </div>
            )}
            <h1 className="ch-title">
              <ContactHeroTitle title={heroTitle} />
            </h1>
            {heroDesc && <p className="ch-desc">{heroDesc}</p>}
          </div>

          <div className="ch-middle">
            <div className="ch-contacts">
              <a href={telHref} className="ch-card">
                <div className="ch-card-icon">
                  <Icon id="i-phone" />
                </div>
                <div className="ch-card-body">
                  <div className="ch-card-label">Hotline</div>
                  <div className="ch-card-value">{hotline}</div>
                </div>
              </a>
              <a href={`mailto:${email}`} className="ch-card">
                <div className="ch-card-icon">
                  <Icon id="i-mail" />
                </div>
                <div className="ch-card-body">
                  <div className="ch-card-label">Email</div>
                  <div className="ch-card-value">{email}</div>
                </div>
              </a>
              <div className="ch-card">
                <div className="ch-card-icon">
                  <Icon id="i-map" />
                </div>
                <div className="ch-card-body">
                  <div className="ch-card-label">Văn phòng</div>
                  <div className="ch-card-value">{officeShort}</div>
                </div>
              </div>
            </div>

            <div className="ch-divider" />

            <div className="ch-stats">
              {(c.stats || []).map((stat, i) => (
                <div key={i} className="ch-stat">
                  <div className="ch-stat-num">{stat.value}</div>
                  <div className="ch-stat-lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="contact-body">
        <div className="container">
          <div className="contact-grid">
            <div className="form-card">
              <ContactFormClient tours={tourOptions} hotline={hotline} />
            </div>

            <div className="contact-info">
              <div className="info-card">
                <div className="info-card-head">
                  <div className="info-card-icon ic-g">
                    <Icon id="i-map" />
                  </div>
                  <div>
                    <h3>Thông Tin Liên Hệ</h3>
                    <span>Văn phòng tại TP. Hồ Chí Minh</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="ii-icon">
                    <Icon id="i-map" />
                  </div>
                  <div className="ii-text">
                    <div className="ilabel">Địa chỉ</div>
                    <span>{addressLine1}</span>
                    <div className="isub">{addressLine2}</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="ii-icon">
                    <Icon id="i-phone" />
                  </div>
                  <div className="ii-text">
                    <div className="ilabel">Hotline</div>
                    <a href={telHref}>{hotline}</a>
                    <div className="isub">Hỗ trợ 7 ngày / tuần</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="ii-icon">
                    <Icon id="i-mail" />
                  </div>
                  <div className="ii-text">
                    <div className="ilabel">Email</div>
                    <a href={`mailto:${email}`}>{email}</a>
                    <div className="isub">Phản hồi trong 1–2 giờ làm việc</div>
                  </div>
                </div>
              </div>

              {c.mapEmbedUrl && (
                <div className="info-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="map-embed">
                    <iframe
                      src={c.mapEmbedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Top Viet Travel - Bản đồ"
                    />
                  </div>
                </div>
              )}

              <div className="info-card">
                <div className="info-card-head">
                  <div className="info-card-icon ic-b">
                    <Icon id="i-clock" />
                  </div>
                  <div>
                    <h3>Giờ Làm Việc</h3>
                    <span>Múi giờ: GMT+7 (TP.HCM)</span>
                  </div>
                </div>
                {(c.workingHours || []).map((row, i) => (
                  <div key={i} className="hour-row">
                    <span className="hday">{row.day}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="htime">{row.time}</span>
                      <span className={row.isOpen ? 'badge-open' : 'badge-closed'}>
                        {row.isOpen ? 'MỞ CỬA' : 'ĐÓNG CỬA'}
                      </span>
                    </div>
                  </div>
                ))}
                {c.afterHoursNote && (
                  <div
                    style={{
                      marginTop: 14,
                      background: 'var(--mint)',
                      borderRadius: 10,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>💡</span>
                    <p style={{ fontSize: 12.5, color: 'var(--gd)', lineHeight: 1.6, fontWeight: 600 }}>
                      {c.afterHoursNote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-wrap">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>
              <Icon id="i-help" /> Câu hỏi thường gặp
            </div>
            <h2 className="sec-title">CÂU HỎI THƯỜNG GẶP</h2>
            <p
              style={{
                color: 'var(--mu)',
                fontSize: 14.5,
                maxWidth: 520,
                margin: '8px auto 0',
                lineHeight: 1.65,
              }}
            >
              Những thắc mắc phổ biến nhất từ khách hàng khi đặt tour cùng Top Viet Travel
            </p>
          </div>
          <ContactFaqClient faqs={(c.faqs || []) as { question: string; answer: string }[]} />
        </div>
      </div>
    </div>
  )
}
