import Link from 'next/link'

import type { Testimonial, Tour } from '@/payload-types'
import { formatVnd, resolveImageUrl } from '@/lib/imageUrl'

import {
  TourDetailBooking,
  TourDetailMobileBar,
  TourDetailTabs,
} from './TourDetailClient'
import { Icon, initialsFromName } from './Icon'

type TermBlock = { title: string; body: string }

function parseTerms(terms?: string | null): TermBlock[] {
  if (!terms) return []
  try {
    const parsed = JSON.parse(terms) as TermBlock[]
    if (Array.isArray(parsed)) return parsed
  } catch {
    /* plain text fallback */
  }
  return []
}

function dayNumber(day: string): string {
  const m = day.match(/\d+/)
  return m ? m[0] : day
}

function badgeLabel(badge?: Tour['badge']): string | null {
  if (badge === 'hot') return '🔥 Bestseller'
  if (badge === 'new') return '✨ Tour mới'
  if (badge === 'spring-2026') return '🌸 Xuân 2026'
  return null
}

function renderOverview(html: string) {
  const parts = html.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

export function TourDetailView({
  tour,
  relatedTours,
  testimonials,
  hotline,
  zaloUrl,
}: {
  tour: Tour
  relatedTours: Tour[]
  testimonials: Testimonial[]
  hotline: string
  zaloUrl?: string | null
}) {
  const heroImg =
    resolveImageUrl(tour.image, tour.imageUrl) ||
    'https://topviettravel.com/wp-content/uploads/2023/04/bac-au.jpg'
  const priceDisplay = tour.price ? `${tour.price.toLocaleString('vi-VN')}₫` : formatVnd(tour.price, tour.priceLabel)
  const termBlocks = parseTerms(tour.terms)
  const badge = badgeLabel(tour.badge)
  const reviews = testimonials.slice(0, 3)

  return (
    <div id="tour-detail" className="page tour-detail-page">
      <div className="td2-hero">
        <div className="td2-hero-img">
          <img src={heroImg} alt={tour.title} />
          <div className="td2-hero-grad" />
        </div>
        <div className="container td2-hero-body">
          <nav className="td2-bc">
            <Link href="/" className="td2-bc-btn">
              Trang chủ
            </Link>
            <Icon id="i-cr" />
            <Link href="/" className="td2-bc-btn">
              Tour nước ngoài
            </Link>
            <Icon id="i-cr" />
            <span style={{ color: 'rgba(255,255,255,.55)', fontSize: 12.5 }}>{tour.region}</span>
          </nav>
          <div className="td2-badges">
            {badge && <span className="td2-badge td2-badge-fire">{badge}</span>}
            {tour.airline && <span className="td2-badge">✈️ {tour.airline}</span>}
            {tour.hotelInfo && <span className="td2-badge">🏨 Khách sạn {tour.hotelInfo}</span>}
            {tour.insuranceInfo && <span className="td2-badge">🛡️ Bảo hiểm {tour.insuranceInfo}</span>}
          </div>
          <h1 className="td2-title">{tour.title.replace(/ – /g, ' –\n')}</h1>
          {tour.route && <p className="td2-route">📍 {tour.route}</p>}
          <div className="td2-pills">
            {tour.duration && (
              <>
                <div className="td2-pill">
                  <span className="td2-pill-v">{tour.duration}</span>
                  <span className="td2-pill-l">Thời gian</span>
                </div>
                <div className="td2-pill-sep" />
              </>
            )}
            {tour.destination && (
              <>
                <div className="td2-pill">
                  <span className="td2-pill-v">4 QG</span>
                  <span className="td2-pill-l">Quốc gia</span>
                </div>
                <div className="td2-pill-sep" />
              </>
            )}
            {tour.tourType && (
              <>
                <div className="td2-pill">
                  <span className="td2-pill-v">{tour.tourType.split('–')[0]?.trim() || tour.tourType}</span>
                  <span className="td2-pill-l">Loại hình</span>
                </div>
                <div className="td2-pill-sep" />
              </>
            )}
            <div className="td2-pill">
              <span className="td2-pill-v">4.9 ⭐</span>
              <span className="td2-pill-l">128 đánh giá</span>
            </div>
            <div className="td2-pill-sep" />
            <div className="td2-pill td2-pill-price">
              <span className="td2-pill-v">{priceDisplay}</span>
              <span className="td2-pill-l">/ người</span>
            </div>
            <a href="#td2-booking" className="td2-hero-cta">
              Đặt ngay <Icon id="i-ar" />
            </a>
          </div>
        </div>
      </div>

      <TourDetailTabs />

      <div className="td2-wrap">
        <div className="container">
          <div className="td2-layout">
            <div className="td2-content">
              <div className="td2-sec" id="sec-overview">
                <div className="td2-sec-hd">
                  <div className="td2-sec-dot" style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' }}>
                    🗺️
                  </div>
                  <h2>Tổng Quan Hành Trình</h2>
                </div>
                {tour.overview && <p className="td2-intro">{renderOverview(tour.overview)}</p>}
                {tour.highlights && tour.highlights.length > 0 && (
                  <div className="td2-hl-grid">
                    {tour.highlights.map((hl, i) => (
                      <div key={i} className="td2-hl">
                        <div className="td2-hl-ico">{hl.icon || '✨'}</div>
                        <div>
                          <b>{hl.title}</b>
                          {hl.description && <p>{hl.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="td2-glance-box">
                  <div className="td2-glance-title">
                    <Icon id="i-globe" /> Thông tin chung
                  </div>
                  <div className="td2-glance-grid">
                    {tour.tourCode && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Mã tour</span>
                        <span className="td2-gl-v">{tour.tourCode}</span>
                      </div>
                    )}
                    {tour.departureDate && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Khởi hành</span>
                        <span className="td2-gl-v">{tour.departureDate}</span>
                      </div>
                    )}
                    {tour.duration && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Thời gian</span>
                        <span className="td2-gl-v">{tour.duration}</span>
                      </div>
                    )}
                    {tour.airline && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Hãng bay</span>
                        <span className="td2-gl-v">✈️ {tour.airline}</span>
                      </div>
                    )}
                    {tour.departureFrom && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Khởi hành từ</span>
                        <span className="td2-gl-v">{tour.departureFrom}</span>
                      </div>
                    )}
                    {tour.destination && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Điểm đến</span>
                        <span className="td2-gl-v">{tour.destination}</span>
                      </div>
                    )}
                    {tour.hotelInfo && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Khách sạn</span>
                        <span className="td2-gl-v">{tour.hotelInfo}</span>
                      </div>
                    )}
                    <div className="td2-gl">
                      <span className="td2-gl-k">Hướng dẫn viên</span>
                      <span className="td2-gl-v">Người Việt suốt tuyến</span>
                    </div>
                    {tour.visaInfo && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Visa</span>
                        <span className="td2-gl-v">{tour.visaInfo}</span>
                      </div>
                    )}
                    {tour.insuranceInfo && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Bảo hiểm</span>
                        <span className="td2-gl-v">{tour.insuranceInfo}</span>
                      </div>
                    )}
                    {tour.tourType && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Loại tour</span>
                        <span className="td2-gl-v">{tour.tourType}</span>
                      </div>
                    )}
                    {tour.depositNote && (
                      <div className="td2-gl">
                        <span className="td2-gl-k">Đặt cọc</span>
                        <span className="td2-gl-v">{tour.depositNote}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {tour.itinerary && tour.itinerary.length > 0 && (
                <div className="td2-sec" id="sec-itinerary">
                  <div className="td2-sec-hd">
                    <div className="td2-sec-dot" style={{ background: 'linear-gradient(135deg,#f97316,#dc2626)' }}>
                      📅
                    </div>
                    <h2>Lịch Trình Chi Tiết</h2>
                  </div>
                  <div className="td2-timeline">
                    {tour.itinerary.map((day, i) => {
                      const num = dayNumber(day.day)
                      const isLast = i === tour.itinerary!.length - 1
                      const special = day.featured
                      return (
                        <div key={i} className={`td2-day${special ? ' td2-day-special' : ''}`}>
                          <div className="td2-day-left">
                            <div className={`td2-dayn${special ? ' td2-dayn-sp' : ''}`}>{num}</div>
                            {!isLast && <div className="td2-dayline" />}
                          </div>
                          <div className="td2-day-right">
                            <div className="td2-day-hd">
                              <h4>
                                {day.day.includes('Ngày') ? day.title : `${day.day}: ${day.title}`}
                              </h4>
                              {day.chip && (
                                <span className={`td2-chip${special ? ' td2-chip-sp' : ''}`}>{day.chip}</span>
                              )}
                            </div>
                            {day.description && <p>{day.description}</p>}
                            {day.tags && day.tags.length > 0 && (
                              <div className="td2-day-tags">
                                {day.tags.map((tag, ti) =>
                                  tag.label ? <span key={ti}>{tag.label}</span> : null,
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {((tour.includes && tour.includes.length > 0) ||
                (tour.excludes && tour.excludes.length > 0)) && (
                <div className="td2-sec" id="sec-includes">
                  <div className="td2-sec-hd">
                    <div className="td2-sec-dot" style={{ background: 'linear-gradient(135deg,#22c55e,#15803d)' }}>
                      ✅
                    </div>
                    <h2>Dịch Vụ Bao Gồm</h2>
                  </div>
                  <div className="td2-inc-wrap">
                    {tour.includes && tour.includes.length > 0 && (
                      <div className="td2-inc-col td2-yes">
                        <div className="td2-inc-hd">
                          <Icon id="i-shield" /> Giá tour bao gồm
                        </div>
                        <ul>
                          {tour.includes.map((row, i) => (
                            <li key={i}>{row.item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tour.excludes && tour.excludes.length > 0 && (
                      <div className="td2-inc-col td2-no">
                        <div className="td2-inc-hd">
                          <Icon id="i-x" /> Không bao gồm
                        </div>
                        <ul>
                          {tour.excludes.map((row, i) => (
                            <li key={i}>{row.item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="td2-child">
                    <div className="td2-child-hd">
                      <Icon id="i-users" /> Giá vé trẻ em
                    </div>
                    <div className="td2-child-row">
                      <div className="td2-cp">
                        <div className="td2-cp-age">Dưới 2 tuổi</div>
                        <div className="td2-cp-pct">35%</div>
                        <div className="td2-cp-note">Ngủ chung bố mẹ</div>
                      </div>
                      <div className="td2-cp">
                        <div className="td2-cp-age">2 – dưới 11 tuổi</div>
                        <div className="td2-cp-pct">85%</div>
                        <div className="td2-cp-note">Ngủ chung bố mẹ</div>
                      </div>
                      <div className="td2-cp">
                        <div className="td2-cp-age">Từ 11 tuổi</div>
                        <div className="td2-cp-pct">100%</div>
                        <div className="td2-cp-note">Giá người lớn</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {termBlocks.length > 0 && (
                <div className="td2-sec" id="sec-terms">
                  <div className="td2-sec-hd">
                    <div className="td2-sec-dot" style={{ background: 'linear-gradient(135deg,#a855f7,#6366f1)' }}>
                      📋
                    </div>
                    <h2>Điều Khoản & Quy Trình Đăng Ký</h2>
                  </div>
                  <div className="td2-terms">
                    {termBlocks.map((term, i) => (
                      <div key={i} className="td2-term">
                        <div className="td2-term-n">{String(i + 1).padStart(2, '0')}</div>
                        <div className="td2-term-b">
                          <h4>{term.title}</h4>
                          <p>{term.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="td2-sec" id="sec-reviews">
                <div className="td2-sec-hd">
                  <div className="td2-sec-dot" style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>
                    ⭐
                  </div>
                  <h2>Đánh Giá Từ Khách Hàng</h2>
                </div>
                <div className="td2-rv-summary">
                  <div className="td2-rv-big">
                    <span className="td2-rv-score">4.9</span>
                    <span style={{ fontSize: 22 }}>⭐⭐⭐⭐⭐</span>
                    <span style={{ color: 'var(--mu)', fontSize: 13, marginTop: 4 }}>128 khách đã đánh giá</span>
                  </div>
                  <div className="td2-rv-bars">
                    {[
                      { stars: '5⭐', pct: 90 },
                      { stars: '4⭐', pct: 7 },
                      { stars: '3⭐', pct: 3 },
                      { stars: '2⭐', pct: 0 },
                      { stars: '1⭐', pct: 0 },
                    ].map((row) => (
                      <div key={row.stars} className="td2-rvb-row">
                        <span>{row.stars}</span>
                        <div className="td2-rvb-track">
                          <div className="td2-rvb-fill" style={{ width: `${row.pct}%` }} />
                        </div>
                        <span>{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {reviews.length > 0 && (
                  <div className="td2-reviews">
                    {reviews.map((rv, i) => (
                      <div key={rv.id ?? i} className="td2-rv">
                        <div className="td2-rv-hd">
                          <div
                            className="td2-rv-av"
                            style={{
                              background: `linear-gradient(135deg,${['#fbbf24,#f97316', '#22c55e,#0891b2', '#a855f7,#6366f1'][i % 3]})`,
                            }}
                          >
                            {initialsFromName(rv.authorName)}
                          </div>
                          <div>
                            <b>{rv.authorName}</b>
                            <span>
                              {rv.tourName || tour.region} · {rv.authorLocation || 'Việt Nam'}
                            </span>
                          </div>
                          <span className="td2-rv-star">⭐⭐⭐⭐⭐</span>
                        </div>
                        <p>{rv.quote}</p>
                        <span className="td2-rv-verified">✅ Đã xác nhận đi tour</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="td2-aside" id="td2-booking">
              <div className="td2-card">
                <div className="td2-card-price">
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,.65)',
                      fontWeight: 700,
                      letterSpacing: '.8px',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    Giá trọn gói / người
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 44,
                      color: 'var(--g)',
                      letterSpacing: 1,
                      lineHeight: 1,
                    }}
                  >
                    {priceDisplay}
                  </div>
                  {tour.airline && (
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 5 }}>
                      ✈️ Đã bao gồm vé bay {tour.airline}
                    </div>
                  )}
                </div>
                {tour.departureDate && (
                  <div className="td2-card-sec">
                    <div className="td2-card-sec-title">
                      <Icon id="i-cal" /> Chọn ngày khởi hành
                    </div>
                    <div className="td2-dates">
                      <label className="td2-date-lbl">
                        <input type="radio" name="td2dep" defaultChecked readOnly />
                        <div className="td2-date-card">
                          <div className="td2-dc-main">{tour.departureDate}</div>
                          <div className="td2-dc-sub">
                            {tour.duration} · <span style={{ color: '#ef4444', fontWeight: 700 }}>⚡ Còn chỗ</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
                <div className="td2-card-sec">
                  <div className="td2-card-sec-title">
                    <Icon id="i-users" /> Số lượng khách
                  </div>
                  {tour.price && (
                    <TourDetailBooking price={tour.price} hotline={hotline} zaloUrl={zaloUrl} />
                  )}
                </div>
                <div className="td2-trust">
                  <div className="td2-trust-row">
                    <Icon id="i-shield" />
                    <span>Hoàn tiền 100% nếu không khởi hành</span>
                  </div>
                  <div className="td2-trust-row">
                    <Icon id="i-award" />
                    <span>Được Tổng cục Du lịch VN cấp phép</span>
                  </div>
                  <div className="td2-trust-row">
                    <Icon id="i-users" />
                    <span>50.000+ khách đã tin tưởng</span>
                  </div>
                  <div className="td2-trust-row">
                    <Icon id="i-headset" />
                    <span>Hỗ trợ 24/7 trong suốt hành trình</span>
                  </div>
                </div>
              </div>
              {relatedTours.length > 0 && (
                <div className="td2-related">
                  <div className="td2-related-title">Tour tương tự</div>
                  {relatedTours.map((rel) => (
                    <Link key={rel.id} href={`/tour/${rel.slug}`} className="td2-rel-item">
                      <div
                        className="td2-rel-thumb"
                        style={{
                          background: 'linear-gradient(135deg,#1e3a8a,#7c3aed)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                        }}
                      >
                        {rel.fallbackEmoji || '🌍'}
                      </div>
                      <div className="td2-rel-info">
                        <b>{rel.title}</b>
                        <span>
                          {rel.duration}
                          {rel.price ? ` · ${rel.price.toLocaleString('vi-VN')}₫` : ` · ${formatVnd(null, rel.priceLabel)}`}
                        </span>
                      </div>
                      <Icon id="i-cr" />
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {tour.price && <TourDetailMobileBar price={tour.price} hotline={hotline} />}
    </div>
  )
}
