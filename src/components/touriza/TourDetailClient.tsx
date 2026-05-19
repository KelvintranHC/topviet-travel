'use client'

import { useCallback, useState } from 'react'

import { Icon } from './Icon'

export function TourDetailTabs() {
  const [active, setActive] = useState<string>('sec-overview')

  const scrollTo = useCallback((secId: string) => {
    setActive(secId)
    const el = document.getElementById(secId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="td2-tabnav" id="td2-tabnav">
      <div className="container">
        <div className="td2-tabs">
          {[
            { id: 'sec-overview', label: 'Tổng quan', icon: 'i-globe' },
            { id: 'sec-itinerary', label: 'Lịch trình', icon: 'i-cal' },
            { id: 'sec-includes', label: 'Bao gồm', icon: 'i-shield' },
            { id: 'sec-terms', label: 'Điều khoản', icon: 'i-help' },
            { id: 'sec-reviews', label: 'Đánh giá', icon: 'i-star' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`td2-tab${active === tab.id ? ' active' : ''}`}
              onClick={() => scrollTo(tab.id)}
            >
              <Icon id={tab.icon} /> {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TourDetailBooking({
  price,
  childPriceRatio = 0.85,
  hotline,
  zaloUrl,
}: {
  price: number
  childPriceRatio?: number
  hotline: string
  zaloUrl?: string | null
}) {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const childPrice = Math.round(price * childPriceRatio)
  const total = adults * price + children * childPrice

  return (
    <>
      <div className="td2-pax">
        <div className="td2-pax-row">
          <div className="td2-pax-info">
            <span className="td2-pax-name">Người lớn</span>
            <span className="td2-pax-note">Từ 11 tuổi</span>
          </div>
          <div className="td2-pax-ctrl">
            <button type="button" onClick={() => setAdults((n) => Math.max(1, n - 1))}>
              −
            </button>
            <span>{adults}</span>
            <button type="button" onClick={() => setAdults((n) => n + 1)}>
              +
            </button>
          </div>
        </div>
        <div className="td2-pax-row">
          <div className="td2-pax-info">
            <span className="td2-pax-name">Trẻ em</span>
            <span className="td2-pax-note">2 – dưới 11 tuổi</span>
          </div>
          <div className="td2-pax-ctrl">
            <button type="button" onClick={() => setChildren((n) => Math.max(0, n - 1))}>
              −
            </button>
            <span>{children}</span>
            <button type="button" onClick={() => setChildren((n) => n + 1)}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="td2-total">
        <span>Tạm tính</span>
        <strong>{total.toLocaleString('vi-VN')}₫</strong>
      </div>
      <div className="td2-card-cta">
        <a href="/lien-he" className="td2-btn-primary">
          <Icon id="i-send" /> Đặt tour ngay
        </a>
        <a href={`tel:${hotline.replace(/\s/g, '')}`} className="td2-btn-secondary">
          <Icon id="i-phone" /> Gọi: {hotline}
        </a>
        {zaloUrl && (
          <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="td2-btn-zalo">
            <Icon id="i-zl" /> Chat Zalo tư vấn ngay
          </a>
        )}
      </div>
    </>
  )
}

export function TourDetailMobileBar({
  price,
  hotline,
}: {
  price: number
  hotline: string
}) {
  return (
    <div className="td2-mob-bar">
      <div className="td2-mob-price">
        <small>Giá từ</small>
        <strong>{price.toLocaleString('vi-VN')}₫</strong>
      </div>
      <a href="/lien-he" className="td2-btn-primary" style={{ padding: '12px 20px', fontSize: 14, flex: 1, justifyContent: 'center' }}>
        <Icon id="i-send" /> Đặt ngay
      </a>
      <a href={`tel:${hotline.replace(/\s/g, '')}`} className="td2-mob-call">
        <Icon id="i-phone" />
      </a>
    </div>
  )
}
