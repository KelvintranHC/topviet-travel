'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Icon } from './Icon'

type MegaCol = {
  title: string
  icon?: string | null
  iconBg?: string | null
  links?: { label: string; href?: string | null; id?: string | null }[] | null
}

type NavSettings = {
  siteName?: string | null
  topbar?: {
    hotline?: string | null
    email?: string | null
    address?: string | null
  } | null
  social?: {
    facebook?: string | null
    zalo?: string | null
    youtube?: string | null
  } | null
  megaMenuDomestic?: MegaCol[] | null
  megaMenuInternational?: MegaCol[] | null
}

const DOMESTIC_TAGS = [
  { label: '🔥 Tour hot tháng 5', href: '/#tours' },
  { label: '🎫 Tour giá rẻ', href: '/#tours' },
  { label: '👨‍👩‍👧 Tour gia đình', href: '/lien-he' },
]

const INTL_TAGS = [
  { label: '🔥 Tour Xuân 2026', href: '/#tours' },
  { label: '✈️ Bao gồm vé máy bay', href: '/#tours' },
  { label: '🎫 Đã bao gồm visa', href: '/lien-he' },
]

function resolveHref(href?: string | null, fallback = '/lien-he') {
  if (!href || href === '#') return fallback
  return href
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

type MegaKind = 'domestic' | 'intl'

function MegaFeatured({
  variant,
  hotline,
  tel,
}: {
  variant: MegaKind
  hotline: string
  tel: string
}) {
  if (variant === 'domestic') {
    return (
      <div className="mega-featured">
        <div className="mega-feat-card" style={{ background: 'linear-gradient(160deg,#0c4a6e,#166534)' }}>
          <div className="mf-tag">✨ Nổi bật</div>
          <div className="mf-title">Khám phá Việt Nam trọn vẹn</div>
          <div className="mf-desc">
            Hành trình xuyên Việt — trải nghiệm đa dạng văn hoá 3 miền cùng Top Viet Travel.
          </div>
          <div className="mf-meta">
            <span>🕐 7–14 ngày</span>
            <span>👥 Ghép đoàn</span>
          </div>
          <Link href="/#tours" className="mf-btn">
            Xem ngay <Icon id="i-ar" />
          </Link>
        </div>
        <MegaHotline hotline={hotline} tel={tel} />
      </div>
    )
  }

  return (
    <div className="mega-featured">
      <div className="mega-feat-card" style={{ background: 'linear-gradient(160deg,#1e3a8a,#0c4a6e)' }}>
        <div className="mf-tag">⭐ Bestseller</div>
        <div className="mf-title">Bắc Âu 4 Quốc Gia</div>
        <div className="mf-desc">
          Đan Mạch – Na Uy – Thuỵ Điển – Phần Lan. Bay Qatar Airways 5 sao, khách sạn 4 sao xuyên tuyến.
        </div>
        <div className="mf-meta">
          <span>🕐 12N/11Đ</span>
          <span>✈️ Qatar Airways</span>
        </div>
        <Link href="/tour/bac-au" className="mf-btn">
          Xem ngay <Icon id="i-ar" />
        </Link>
      </div>
      <MegaHotline hotline={hotline} tel={tel} />
    </div>
  )
}

function MegaHotline({ hotline, tel }: { hotline: string; tel: string }) {
  return (
    <div className="mega-hotline">
      <Icon id="i-phone" />
      <div>
        <div style={{ fontSize: 11, color: 'var(--mu)', fontWeight: 700 }}>Tư vấn ngay</div>
        <a href={`tel:${tel}`} style={{ fontWeight: 800, color: 'var(--ink)', fontSize: 15 }}>
          {hotline}
        </a>
      </div>
    </div>
  )
}

function DesktopMegaMenu({
  id,
  label,
  kind,
  columns,
  openMega,
  setOpenMega,
  hotline,
  tel,
}: {
  id: string
  label: string
  kind: MegaKind
  columns?: MegaCol[] | null
  openMega: MegaKind | null
  setOpenMega: (v: MegaKind | null) => void
  hotline: string
  tel: string
}) {
  const isOpen = openMega === kind
  const tags = kind === 'domestic' ? DOMESTIC_TAGS : INTL_TAGS

  return (
    <li className={`has-mega${isOpen ? ' open' : ''}`} id={id}>
      <button
        type="button"
        className="mega-trigger"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setOpenMega(isOpen ? null : kind)}
      >
        {label} <Icon id="i-cd" />
      </button>
      <div className="mega-menu" role="region" aria-label={label}>
        <div className="container">
          <div className="mega-inner">
            {columns?.map((col, i) => (
              <div key={i} className="mega-col">
                <div className="mega-col-head">
                  <span className="mega-col-icon" style={{ background: col.iconBg || undefined }}>
                    {col.icon}
                  </span>
                  <span className="mega-col-title">{col.title}</span>
                </div>
                <ul className="mega-links">
                  {col.links?.map((link, j) => (
                    <li key={j}>
                      <Link href={resolveHref(link.href, '/#tours')} onClick={() => setOpenMega(null)}>
                        <Icon id="i-cr" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <MegaFeatured variant={kind} hotline={hotline} tel={tel} />
          </div>
          <div className="mega-tags">
            <span className="mega-tag-label">Tìm nhanh:</span>
            {tags.map((tag) => (
              <Link key={tag.label} href={tag.href} className="mega-tag" onClick={() => setOpenMega(null)}>
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

function MobileAccordion({
  id,
  label,
  icon,
  iconStyle,
  columns,
  onNavigate,
}: {
  id: string
  label: string
  icon: string
  iconStyle: React.CSSProperties
  columns?: MegaCol[] | null
  onNavigate: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const subId = `mob-sub-${id.replace('mob-', '')}`

  return (
    <div className={`mob-nav-item${expanded ? ' expanded' : ''}`} id={id}>
      <button
        type="button"
        className="mob-nav-link"
        aria-expanded={expanded}
        onClick={() => setExpanded((e) => !e)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="mob-icon" style={iconStyle}>
            {icon}
          </span>
          {label}
        </span>
        <Icon id="i-cr" className="mob-arrow" />
      </button>
      <div className={`mob-submenu${expanded ? ' open' : ''}`} id={subId}>
        {columns?.map((col, ci) => (
          <div key={ci}>
            <div className="mob-sub-section" style={ci > 0 ? { marginTop: 6 } : undefined}>
              <span
                className="mob-sub-section-dot"
                style={{ background: col.iconBg || 'var(--mint)', color: 'var(--gd)' }}
              >
                {col.icon}
              </span>
              {col.title}
            </div>
            {col.links?.map((link, li) => (
              <Link
                key={li}
                href={resolveHref(link.href, '/#tours')}
                className="mob-sub-link"
                onClick={onNavigate}
              >
                <Icon id="i-cr" />
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function TourizaNav({
  settings,
  logoSrc,
}: {
  settings: NavSettings
  logoSrc: string
}) {
  const pathname = usePathname()
  const hotline = settings.topbar?.hotline || '0906 371 538'
  const tel = hotline.replace(/\s/g, '')
  const [openMega, setOpenMega] = useState<MegaKind | null>(null)
  const [mobOpen, setMobOpen] = useState(false)

  const closeMega = useCallback(() => setOpenMega(null), [])
  const closeMob = useCallback(() => setMobOpen(false), [])

  const setNavBottom = useCallback(() => {
    const h = document.querySelector('header')
    if (h) {
      document.documentElement.style.setProperty('--nav-bottom', `${h.getBoundingClientRect().bottom}px`)
    }
  }, [])

  useEffect(() => {
    setNavBottom()
    window.addEventListener('resize', setNavBottom)
    window.addEventListener('scroll', setNavBottom, { passive: true })
    return () => {
      window.removeEventListener('resize', setNavBottom)
      window.removeEventListener('scroll', setNavBottom)
    }
  }, [setNavBottom])

  useEffect(() => {
    document.body.style.overflow = mobOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMega()
        closeMob()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeMega, closeMob])

  useEffect(() => {
    closeMega()
    closeMob()
  }, [pathname, closeMega, closeMob])

  const navLinkClass = (href: string) => (isActive(pathname, href) ? 'on' : undefined)

  return (
    <>
      <header data-nav-react>
        <div className="container">
          <div className="nav-wrap">
            <Link href="/" className="logo">
              {logoSrc ? (
                <img src={logoSrc} alt={settings.siteName || 'Top Viet Travel'} />
              ) : (
                <div className="logo-fallback">
                  <div className="logo-mark">
                    <Icon id="i-plane" />
                  </div>
                  {settings.siteName}
                </div>
              )}
            </Link>

            <nav className="main" aria-label="Menu chính">
              <ul>
                <li>
                  <Link href="/" className={navLinkClass('/')}>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/gioi-thieu" className={navLinkClass('/gioi-thieu')}>
                    Giới thiệu
                  </Link>
                </li>
                <DesktopMegaMenu
                  id="menu-domestic"
                  label="Tour trong nước"
                  kind="domestic"
                  columns={settings.megaMenuDomestic}
                  openMega={openMega}
                  setOpenMega={setOpenMega}
                  hotline={hotline}
                  tel={tel}
                />
                <DesktopMegaMenu
                  id="menu-intl"
                  label="Tour nước ngoài"
                  kind="intl"
                  columns={settings.megaMenuInternational}
                  openMega={openMega}
                  setOpenMega={setOpenMega}
                  hotline={hotline}
                  tel={tel}
                />
                <li>
                  <Link href="/lien-he" className={navLinkClass('/lien-he')}>
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </nav>

            <a href={`tel:${tel}`} className="btn-book">
              <Icon id="i-phone" /> {hotline}
            </a>

            <button
              type="button"
              className={`hamburger${mobOpen ? ' active' : ''}`}
              id="hamburger"
              aria-label={mobOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobOpen}
              onClick={() => setMobOpen((o) => !o)}
            >
              <span className="hb-bar" />
              <span className="hb-bar" />
              <span className="hb-bar" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mega-backdrop${openMega ? ' show' : ''}`}
        id="mega-backdrop"
        aria-hidden={!openMega}
        onClick={closeMega}
      />

      <div
        className={`mob-overlay${mobOpen ? ' show' : ''}`}
        id="mob-overlay"
        aria-hidden={!mobOpen}
        onClick={closeMob}
      />

      <div className={`mob-drawer${mobOpen ? ' open' : ''}`} id="mob-drawer" role="dialog" aria-modal="true">
        <div className="mob-drawer-head">
          <div className="mob-logo">
            <div className="mob-logo-mark">
              <Icon id="i-plane" />
            </div>
            {settings.siteName || 'Top Viet Travel'}
          </div>
          <button type="button" className="mob-close" aria-label="Đóng menu" onClick={closeMob}>
            <Icon id="i-x" />
          </button>
        </div>

        <nav className="mob-nav" aria-label="Menu di động">
          <div className="mob-nav-item">
            <Link href="/" className={`mob-nav-link${pathname === '/' ? ' active' : ''}`} onClick={closeMob}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mob-icon" style={{ background: '#ecfdf3', color: '#16a34a' }}>
                  🏠
                </span>
                Trang chủ
              </span>
            </Link>
          </div>

          <div className="mob-nav-item">
            <Link
              href="/gioi-thieu"
              className={`mob-nav-link${isActive(pathname, '/gioi-thieu') ? ' active' : ''}`}
              onClick={closeMob}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mob-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                  ℹ️
                </span>
                Giới thiệu
              </span>
            </Link>
          </div>

          <MobileAccordion
            id="mob-domestic"
            label="Tour trong nước"
            icon="🇻🇳"
            iconStyle={{ background: '#fff7ed', color: '#f97316' }}
            columns={settings.megaMenuDomestic}
            onNavigate={closeMob}
          />

          <MobileAccordion
            id="mob-intl"
            label="Tour nước ngoài"
            icon="✈️"
            iconStyle={{ background: '#f3e8ff', color: '#a855f7' }}
            columns={settings.megaMenuInternational}
            onNavigate={closeMob}
          />

          <div className="mob-nav-item">
            <Link
              href="/lien-he"
              className={`mob-nav-link${isActive(pathname, '/lien-he') ? ' active' : ''}`}
              onClick={closeMob}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mob-icon" style={{ background: '#ecfdf3', color: '#16a34a' }}>
                  📞
                </span>
                Liên hệ
              </span>
            </Link>
          </div>
        </nav>

        <div className="mob-drawer-foot">
          <div className="mob-hotline-card">
            <div className="mob-hotline-icon">
              <Icon id="i-phone" />
            </div>
            <div className="mob-hotline-info">
              <div className="mob-hotline-label">Hotline tư vấn miễn phí</div>
              <a href={`tel:${tel}`} className="mob-hotline-num">
                {hotline}
              </a>
            </div>
            <a href={`tel:${tel}`} className="mob-hotline-call" aria-label="Gọi ngay">
              <Icon id="i-phone" />
            </a>
          </div>

          <div className="mob-foot-socials">
            {settings.social?.facebook && (
              <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="mob-social-btn sl-fb">
                <Icon id="i-fb" />
                <span>Facebook</span>
              </a>
            )}
            {settings.social?.zalo && (
              <a href={settings.social.zalo} target="_blank" rel="noopener noreferrer" className="mob-social-btn sl-zl">
                <Icon id="i-zl" />
                <span>Zalo</span>
              </a>
            )}
            {settings.social?.youtube && settings.social.youtube !== '#' && (
              <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" className="mob-social-btn sl-yt">
                <Icon id="i-yt" />
                <span>YouTube</span>
              </a>
            )}
          </div>

          <div className="mob-foot-copy">© 2025 {settings.siteName || 'Top Viet Travel'}. All rights reserved.</div>
        </div>
      </div>
    </>
  )
}
