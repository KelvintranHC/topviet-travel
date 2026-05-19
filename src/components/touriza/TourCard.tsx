import Link from 'next/link'

import { formatVnd, resolveImageUrl } from '@/lib/imageUrl'

type Tour = {
  id: string | number
  title: string
  slug: string
  region?: string | null
  destination?: string | null
  duration?: string | null
  departureDate?: string | null
  price?: number | null
  priceLabel?: string | null
  badge?: string | null
  image?: unknown
  imageUrl?: string | null
  fallbackEmoji?: string | null
  externalUrl?: string | null
}

const BADGE_LABEL: Record<string, string> = {
  hot: '🔥 Hot',
  new: 'Mới',
  'spring-2026': 'Xuân 2026',
}

export function TourCard({ tour }: { tour: Tour }) {
  const img = resolveImageUrl(tour.image as never, tour.imageUrl)
  const href = tour.externalUrl || `/tour/${tour.slug}`
  const isExternal = Boolean(tour.externalUrl)

  return (
    <div className="tour-card">
      <div className="card-thumb">
        {img ? (
          <img src={img} alt={tour.title} loading="lazy" />
        ) : (
          <div className="img-fallback">{tour.fallbackEmoji || '✈️'}</div>
        )}
        {tour.badge && tour.badge !== 'none' && (
          <span className={`card-badge badge-${tour.badge === 'hot' ? 'hot' : 'new'}`}>
            {BADGE_LABEL[tour.badge] || tour.badge}
          </span>
        )}
        <span className="card-region">{tour.region}</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          {tour.duration && <span className="icon-meta">🌙 {tour.duration}</span>}
          {tour.departureDate && <span className="icon-meta">📅 {tour.departureDate}</span>}
        </div>
        <h3 className="card-title">{tour.title}</h3>
        {tour.destination && <div className="card-dest">📍 {tour.destination}</div>}
        <div className="card-price-row">
          <div className="card-price">
            <div className="from">Giá từ</div>
            <div>
              <span className="amount">{formatVnd(tour.price, tour.priceLabel)}</span>
              {tour.price ? <span className="currency">₫</span> : null}
            </div>
          </div>
          {isExternal ? (
            <a className="btn-card" href={href} target="_blank" rel="noopener noreferrer">
              Đặt tour →
            </a>
          ) : (
            <Link className="btn-card" href={href}>
              Xem chi tiết →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
