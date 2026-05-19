import Link from 'next/link'
import type { ReactNode } from 'react'

import type { TourizaHomeData } from '@/lib/getTourizaData'
import { resolveImageUrl } from '@/lib/imageUrl'
import type { GalleryItem, PromoBanner, Testimonial } from '@/payload-types'

import { Icon, initialsFromName } from './Icon'
import { ToursWithTabs } from './ToursWithTabs'

const OVERLAY_CLASS: Record<string, string> = {
  dark: 'overlay-dark',
  green: 'overlay-green',
  blue: 'overlay-blue',
}

const GAL_SIZE_CLASS: Record<string, string> = {
  normal: '',
  wide: 'gal-wide',
  tall: 'gal-tall',
}

function SectionHead({
  eyebrow,
  title,
  seeAllHref,
  seeAllLabel,
  centered,
}: {
  eyebrow: ReactNode
  title: string
  seeAllHref?: string
  seeAllLabel?: string
  centered?: boolean
}) {
  return (
    <div className="sec-head" style={centered ? { justifyContent: 'center' } : undefined}>
      <div className="sec-title-wrap" style={centered ? { textAlign: 'center' } : undefined}>
        <div className="eyebrow" style={centered ? { justifyContent: 'center' } : undefined}>
          {eyebrow}
        </div>
        <h2 className="sec-title">{title}</h2>
      </div>
      {seeAllHref && (
        <Link href={seeAllHref} className="see-all">
          {seeAllLabel || 'Xem tất cả'} <span className="bub"><Icon id="i-ar" /></span>
        </Link>
      )}
    </div>
  )
}

function PromoCard({ promo }: { promo: PromoBanner }) {
  const img = resolveImageUrl(promo.image, promo.imageUrl)
  const overlay = OVERLAY_CLASS[promo.overlayStyle || 'dark'] || 'overlay-dark'

  return (
    <div className={`promo ${overlay}`}>
      {img && <img className="promo-bg" src={img} alt={promo.title} loading="lazy" />}
      <div className="overlay" />
      {promo.tag && (
        <span className="tag">
          <Icon id="i-tag" /> {promo.tag}
        </span>
      )}
      <h3>{promo.title}</h3>
      {promo.ctaLabel && (
        <Link href={promo.ctaLink || '#'} className="promo-cta">
          {promo.ctaLabel} <Icon id="i-ar" />
        </Link>
      )}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const av = t.avatarVariant || 'av1'
  return (
    <div className="testi-card">
      <div className="testi-head">
        <div className={`testi-avatar ${av}`}>{initialsFromName(t.authorName)}</div>
        <div className="testi-info">
          <div className="tname">{t.authorName}</div>
          {t.authorLocation && <div className="tloc">{t.authorLocation}</div>}
        </div>
        <div className="testi-qmark">&ldquo;</div>
      </div>
      <div className="testi-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} id="i-star" />
        ))}
      </div>
      <p className="testi-text">{t.quote}</p>
      {t.tourName && (
        <div className="testi-tour">
          <Icon id="i-map" /> Tour: <b>{t.tourName}</b>
        </div>
      )}
    </div>
  )
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const img = resolveImageUrl(item.image, item.imageUrl)
  const sizeClass = GAL_SIZE_CLASS[item.size || 'normal'] || ''

  return (
    <div className={`gal-item ${sizeClass}`.trim()} data-loc={item.location} data-name={item.guestName || ''}>
      {img ? (
        <img src={img} alt={item.location} loading="lazy" />
      ) : (
        <div className="gal-fallback" style={{ display: 'flex' }}>
          🌍
        </div>
      )}
      <div className="gal-overlay">
        <div className="gal-info">
          <span className="gal-loc">
            <Icon id="i-map" /> {item.location}
          </span>
          {item.guestName && <span className="gal-name">{item.guestName}</span>}
        </div>
        {item.likeCount != null && item.likeCount > 0 && (
          <div className="gal-heart">
            <Icon id="i-heart" /> {item.likeCount}
          </div>
        )}
      </div>
    </div>
  )
}

export function TourizaHome({ data }: { data: TourizaHomeData }) {
  const { settings, tours, destinations, whyChoose, promoBanners, testimonials, galleryItems } = {
    ...data,
    whyChoose: data.settings.whyChoose,
  }
  const hero = settings.hero
  const hotline = settings.topbar?.hotline?.replace(/\s/g, '') || '0906371538'
  const titleLines = (hero?.title || 'TOUR NƯỚC NGOÀI\nKHÁM PHÁ THẾ GIỚI').split('\n')

  return (
    <div id="home-page" className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-content">
            {hero?.badge && (
              <div className="hero-badge">
                <Icon id="i-globe" /> {hero.badge}
              </div>
            )}
            <h1>
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p>{hero?.description}</p>
            <div className="hero-actions">
              <a href="#tours" className="btn-hero-primary">
                <Icon id="i-search" /> {hero?.primaryCta || 'Xem tất cả tour'}
              </a>
              <a href={`tel:${hotline}`} className="btn-hero-outline">
                <Icon id="i-phone" /> {hero?.secondaryCta || 'Tư vấn ngay'}
              </a>
            </div>
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="inner">
              {hero?.stats?.map((s, i) => (
                <div key={i} className="stat">
                  <span className="num">{s.value}</span>
                  <span className="lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="search-section">
        <div className="container">
          <div className="search-bar">
            <div className="sf">
              <div className="sf-icon">
                <Icon id="i-map" />
              </div>
              <div className="sf-inner">
                <span className="sf-label">Điểm đến</span>
                <select className="sfv" defaultValue="">
                  <option>Tất cả điểm đến</option>
                  <option>Châu Âu</option>
                  <option>Châu Á</option>
                  <option>Châu Mỹ</option>
                  <option>Châu Phi</option>
                  <option>Châu Úc</option>
                </select>
              </div>
            </div>
            <div className="sf">
              <div className="sf-icon">
                <Icon id="i-cal" />
              </div>
              <div className="sf-inner">
                <span className="sf-label">Ngày khởi hành</span>
                <select className="sfv" defaultValue="">
                  <option>Chọn tháng</option>
                  <option>Tháng 5/2026</option>
                  <option>Tháng 6/2026</option>
                  <option>Tháng 7/2026</option>
                </select>
              </div>
            </div>
            <div className="sf">
              <div className="sf-icon">
                <Icon id="i-clock" />
              </div>
              <div className="sf-inner">
                <span className="sf-label">Thời gian</span>
                <select className="sfv" defaultValue="">
                  <option>Tất cả</option>
                  <option>4–7 ngày</option>
                  <option>8–10 ngày</option>
                  <option>11–13 ngày</option>
                  <option>14+ ngày</option>
                </select>
              </div>
            </div>
            <div className="sf">
              <div className="sf-icon" style={{ fontSize: 12, fontWeight: 800 }}>
                ₫
              </div>
              <div className="sf-inner">
                <span className="sf-label">Ngân sách</span>
                <select className="sfv" defaultValue="">
                  <option>Tất cả mức giá</option>
                  <option>Dưới 20 triệu</option>
                  <option>20–50 triệu</option>
                  <option>50–100 triệu</option>
                  <option>Trên 100 triệu</option>
                </select>
              </div>
            </div>
            <a href="#tours" className="btn-search">
              <Icon id="i-search" /> Tìm tour
            </a>
          </div>
        </div>
      </div>

      {/* Destinations */}
      <section className="section reveal">
        <div className="container">
          <SectionHead
            eyebrow={
              <>
                <Icon id="i-map" /> Điểm đến phổ biến
              </>
            }
            title="KHÁM PHÁ THEO CHÂU LỤC"
            seeAllHref="#tours"
            seeAllLabel="Xem tất cả"
          />
          <div className="dest-row">
            {destinations.map((d) => {
              const img = resolveImageUrl(d.image, d.imageUrl)
              return (
                <Link key={d.id} href={`#tours`} className="dest-item">
                  <div className="dest-circle">
                    {img ? (
                      <img src={img} alt={d.name} loading="lazy" />
                    ) : (
                      <div className="dest-flag" style={{ display: 'flex' }}>
                        {d.fallbackEmoji}
                      </div>
                    )}
                  </div>
                  <div className="dest-name">{d.name}</div>
                  <div className="dest-count">{d.tourCount} tour</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Promo banners */}
      {promoBanners.length > 0 && (
        <section className="section alt reveal" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="promo-grid">
              {promoBanners.map((p) => (
                <PromoCard key={p.id} promo={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tours */}
      <section className="section reveal" id="tours">
        <div className="container">
          <SectionHead
            eyebrow={
              <>
                <Icon id="i-fire" /> {tours.length} tour quốc tế
              </>
            }
            title="TOUR NƯỚC NGOÀI NỔI BẬT"
            seeAllHref="#tours"
            seeAllLabel={`Xem tất cả ${tours.length} tour`}
          />
          <ToursWithTabs tours={tours} tourCountLabel={`${tours.length} tour quốc tế`} />
        </div>
      </section>

      {/* Why choose */}
      {whyChoose && whyChoose.length > 0 && (
        <section className="section alt reveal">
          <div className="container">
            <SectionHead
              eyebrow="Tại sao chọn chúng tôi"
              title="ƯU ĐIỂM CỦA TOP VIET TRAVEL"
              centered
            />
            <div className="why-grid">
              {whyChoose.map((item, i) => {
                const defaultIcons = ['i-award', 'i-globe', 'i-shield', 'i-headset']
                const iconId =
                  item.icon && !/[\u{1F300}-\u{1FAFF}]/u.test(item.icon)
                    ? item.icon.startsWith('i-')
                      ? item.icon
                      : `i-${item.icon}`
                    : defaultIcons[i]
                return (
                  <div key={i} className="why-item">
                    <div className="why-icon">
                      <Icon id={iconId || 'i-award'} />
                    </div>
                    <div className="why-title">{item.title}</div>
                    <p className="why-desc">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="testi-section reveal">
          <div className="container">
            <div className="sec-head" style={{ justifyContent: 'center', marginBottom: 32 }}>
              <div className="sec-title-wrap" style={{ textAlign: 'center' }}>
                <div className="eyebrow" style={{ justifyContent: 'center' }}>
                  <Icon id="i-quote" /> Testimonials
                </div>
                <h2 className="sec-title">KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI</h2>
                <p
                  style={{
                    color: 'var(--mu)',
                    fontSize: 14.5,
                    marginTop: 8,
                    maxWidth: 520,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: 1.65,
                  }}
                >
                  Hơn 50.000 khách hàng đã tin tưởng và trải nghiệm cùng Top Viet Travel trên khắp thế giới
                </p>
              </div>
            </div>

            <div className="rating-summary">
              <div className="rating-big">
                <div className="num">4.9</div>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon key={i} id="i-star" />
                  ))}
                </div>
                <div className="lbl">Đánh giá trung bình</div>
              </div>
              <div className="rating-bars">
                {[
                  { label: 5, pct: 88 },
                  { label: 4, pct: 8 },
                  { label: 3, pct: 3 },
                  { label: 2, pct: 1 },
                  { label: 1, pct: 0 },
                ].map((row) => (
                  <div key={row.label} className="rbar-row">
                    <span className="rlbl">
                      {row.label} <Icon id="i-star" />
                    </span>
                    <div className="rbar-track">
                      <div className="rbar-fill" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="rpct">{row.pct}%</span>
                  </div>
                ))}
              </div>
              <div className="rating-total">
                <div className="tnum">50K+</div>
                <div className="tlbl">Khách đã đánh giá</div>
              </div>
            </div>

            <div className="testi-grid">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="nl-section reveal">
        <div className="container">
          <div className="nl-inner">
            <div className="nl-text">
              <h2>NHẬN TIN TỨC TOUR VÀ ƯU ĐÃI ĐỘC QUYỀN</h2>
              <p>Đăng ký để nhận thông tin tour mới nhất, chương trình khuyến mãi và các ưu đãi đặc biệt từ Top Viet Travel.</p>
            </div>
            <div className="nl-form-wrap">
              <form className="nl-form" action="#">
                <input type="email" placeholder="Nhập địa chỉ email của bạn..." />
                <button type="submit">
                  <Icon id="i-send" /> Đăng ký
                </button>
              </form>
              <div className="nl-note">
                <Icon id="i-shield" /> Chúng tôi cam kết bảo mật thông tin của bạn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryItems.length > 0 && (
        <section className="gallery-section reveal">
          <div className="container">
            <div className="gallery-head">
              <div>
                <div className="eyebrow" style={{ justifyContent: 'flex-start' }}>
                  <Icon id="i-camera" /> Khoảnh khắc thực tế
                </div>
                <h2 className="sec-title" style={{ textAlign: 'left' }}>
                  HÀNH TRÌNH CỦA KHÁCH HÀNG
                  <br />
                  <span style={{ color: 'var(--g)' }}>CÙNG TOP VIET TRAVEL</span>
                </h2>
              </div>
              <div className="gallery-head-right">
                <p>
                  Những khoảnh khắc đáng nhớ được ghi lại bởi chính khách hàng trong các chuyến hành trình cùng chúng
                  tôi — chân thực, đầy cảm xúc và truyền cảm hứng.
                </p>
                <div className="gallery-social">
                  <Icon id="i-ig" />
                  <span>
                    Tag <strong>#TopVietTravel</strong> để được xuất hiện tại đây!
                  </span>
                </div>
              </div>
            </div>

            <div className="gallery-masonry">
              {galleryItems.map((g) => (
                <GalleryCard key={g.id} item={g} />
              ))}
            </div>

            <div className="gallery-cta">
              <div className="gallery-cta-text">
                <span className="gal-counter">
                  🌍 <strong>50,000+</strong> khách hàng đã chia sẻ khoảnh khắc cùng Top Viet Travel
                </span>
              </div>
              <Link href="#tours" className="btn-gallery">
                Tạo hành trình của bạn <Icon id="i-ar" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
