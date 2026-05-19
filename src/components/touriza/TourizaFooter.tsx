import Link from 'next/link'

import type { TourizaHomeData } from '@/lib/getTourizaData'
import { resolveImageUrl } from '@/lib/imageUrl'

import { Icon } from './Icon'

export function TourizaFooter({ settings }: { settings: TourizaHomeData['settings'] }) {
  const logo = resolveImageUrl(settings.logo, settings.logoUrl)
  const hotline = settings.topbar?.hotline || '0906 371 538'
  const email = settings.topbar?.email || 'info@topviettravel.com'
  const address = settings.topbar?.address || '37/4 Nguyễn Cảnh Chân, P. Cầu Ông Lãnh, TP.HCM'

  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            {logo && <img src={logo} alt={settings.siteName || 'Top Viet Travel'} />}
            <p>{settings.footerAbout}</p>
            <div className="foot-contacts">
              <a href={`tel:${hotline.replace(/\s/g, '')}`}>
                <Icon id="i-phone" /> {hotline}
              </a>
              <a href={`mailto:${email}`}>
                <Icon id="i-mail" /> {email}
              </a>
              <a href="/lien-he">
                <Icon id="i-map" /> {address}
              </a>
            </div>
            <div className="foot-socials">
              {settings.social?.facebook && (
                <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                  <Icon id="i-fb" />
                </a>
              )}
              {settings.social?.youtube && (
                <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
                  <Icon id="i-yt" />
                </a>
              )}
              {settings.social?.zalo && (
                <a href={settings.social.zalo} target="_blank" rel="noopener noreferrer" title="Zalo">
                  <Icon id="i-zl" />
                </a>
              )}
            </div>
          </div>
          <div className="foot-col">
            <h4>TOUR NƯỚC NGOÀI</h4>
            <ul>
              <li>
                <Link href="#tours">
                  <Icon id="i-cr" /> Châu Âu
                </Link>
              </li>
              <li>
                <Link href="#tours">
                  <Icon id="i-cr" /> Châu Á
                </Link>
              </li>
              <li>
                <Link href="#tours">
                  <Icon id="i-cr" /> Châu Mỹ
                </Link>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>ĐIỂM ĐẾN HOT</h4>
            <ul>
              <li>
                <Link href="/tour/bac-au">
                  <Icon id="i-cr" /> Bắc Âu
                </Link>
              </li>
              <li>
                <Link href="/tour/anh-quoc-2026">
                  <Icon id="i-cr" /> Anh Quốc
                </Link>
              </li>
              <li>
                <Link href="/tour/canada">
                  <Icon id="i-cr" /> Canada
                </Link>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>HỖ TRỢ</h4>
            <ul>
              <li>
                <Link href="/gioi-thieu">
                  <Icon id="i-cr" /> Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/lien-he">
                  <Icon id="i-cr" /> Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <Icon id="i-cr" /> Quản trị
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>{settings.copyright || '© Top Viet Travel'}</div>
          <div className="pays">
            <span className="pay">VISA</span>
            <span className="pay">MasterCard</span>
            <span className="pay">VNPay</span>
            <span className="pay">Momo</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
