'use client'

import { useMemo, useState } from 'react'

import { Icon } from './Icon'
import { TourCard } from './TourCard'

type Tour = {
  id: string | number
  title: string
  slug: string
  category: string
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

const TABS = [
  { id: 'all', label: 'Tất cả', icon: 'i-globe' },
  { id: 'europe', label: 'Châu Âu', emoji: '🇪🇺' },
  { id: 'africa', label: 'Châu Phi', emoji: '🌍' },
  { id: 'americas', label: 'Châu Mỹ', emoji: '🌎' },
  { id: 'oceania', label: 'Châu Úc', emoji: '🦘' },
  { id: 'asia', label: 'Châu Á', emoji: '🌏' },
  { id: 'middle-east', label: 'Trung Đông', emoji: '🌙' },
] as const

export function ToursWithTabs({ tours, tourCountLabel }: { tours: Tour[]; tourCountLabel?: string }) {
  const [active, setActive] = useState<string>('all')

  const filtered = useMemo(() => {
    if (active === 'all') return tours
    return tours.filter((t) => t.category === active)
  }, [active, tours])

  return (
    <>
      <div className="tabs-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab${active === tab.id ? ' on' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {'icon' in tab && tab.icon ? <Icon id={tab.icon} /> : null}
            {'emoji' in tab && tab.emoji ? <span>{tab.emoji}</span> : null}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tour-grid">
        {filtered.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <a
          href="#tours"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 32px',
            borderRadius: 10,
            border: '2px solid var(--g)',
            color: 'var(--gd)',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Xem thêm {tourCountLabel || `${tours.length} tour`} <Icon id="i-ar" />
        </a>
      </div>
    </>
  )
}
