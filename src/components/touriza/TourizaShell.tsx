import type { TourizaHomeData } from '@/lib/getTourizaData'
import { resolveImageUrl } from '@/lib/imageUrl'

import { Icon } from './Icon'
import { TourizaFooter } from './TourizaFooter'
import { TourizaNav } from './TourizaNav'
import { TourizaRevealInit } from './TourizaRevealInit'

type Props = {
  data: TourizaHomeData
  children: React.ReactNode
}

export function TourizaShell({ data, children }: Props) {
  const { settings } = data
  const logo = resolveImageUrl(settings.logo, settings.logoUrl)
  const hotline = settings.topbar?.hotline || '0906 371 538'

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="inner">
            <div className="contacts">
              <span>
                <Icon id="i-phone" />
                <a href={`tel:${hotline.replace(/\s/g, '')}`}>Hotline: {hotline}</a>
              </span>
              {settings.topbar?.email && (
                <span>
                  <Icon id="i-mail" />
                  <a href={`mailto:${settings.topbar.email}`}>{settings.topbar.email}</a>
                </span>
              )}
            </div>
            <div className="contacts">
              {settings.topbar?.address && (
                <span>
                  <Icon id="i-map" /> {settings.topbar.address}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <TourizaNav settings={settings} logoSrc={logo} />

      {children}

      <TourizaFooter settings={settings} />

      <div className="floats">
        <button className="float-btn up" type="button" aria-label="Lên đầu trang">
          <Icon id="i-cu" />
        </button>
        {settings.social?.zalo && (
          <a
            className="float-btn chat"
            href={settings.social.zalo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zalo"
          >
            <Icon id="i-zl" />
          </a>
        )}
        <a className="float-btn phone" href={`tel:${hotline.replace(/\s/g, '')}`} aria-label="Gọi hotline">
          <Icon id="i-phone" />
        </a>
      </div>

      <TourizaRevealInit />
      <script src="/js/touriza.js" defer />
    </>
  )
}
