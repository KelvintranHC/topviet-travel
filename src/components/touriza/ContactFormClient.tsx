'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

import { Icon } from './Icon'

const CONTINENT_CHIPS = [
  '🇪🇺 Châu Âu',
  '🌏 Châu Á',
  '🌎 Châu Mỹ',
  '🌍 Châu Phi',
  '🦘 Châu Úc',
  '🌙 Trung Đông',
] as const

const BUDGET_OPTIONS = [
  '-- Chọn ngân sách --',
  'Dưới 20 triệu',
  '20 – 50 triệu',
  '50 – 100 triệu',
  'Trên 100 triệu',
  'Linh hoạt theo chương trình',
] as const

type TourOption = { id: string; label: string }

export function ContactFormClient({
  tours,
  hotline,
}: {
  tours: TourOption[]
  hotline: string
}) {
  const [submitted, setSubmitted] = useState(false)
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set())
  const telHref = `tel:${hotline.replace(/\s/g, '')}`

  function toggleChip(label: string) {
    setSelectedChips((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success" style={{ display: 'block' }}>
        <div className="check-circle">✓</div>
        <h3>GỬI THÀNH CÔNG!</h3>
        <p>
          Cảm ơn bạn đã liên hệ với chúng tôi.
          <br />
          Tư vấn viên sẽ gọi lại cho bạn trong vòng <strong>30 phút</strong>.
          <br />
          <br />
          Trong khi chờ đợi, hãy khám phá thêm các tour hấp dẫn của chúng tôi!
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={telHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: 'var(--g)',
              color: '#fff',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            <Icon id="i-phone" /> Gọi ngay
          </a>
          <Link
            href="/#tours"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: '#fff',
              border: '2px solid var(--g)',
              color: 'var(--gd)',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            <Icon id="i-search" /> Xem tour
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <h2>GỬI YÊU CẦU TƯ VẤN</h2>
      <p className="form-sub">
        Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong vòng <strong>30 phút</strong> trong giờ
        làm việc.
      </p>

      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>
              Họ và tên <span className="req">*</span>
            </label>
            <div className="input-wrap">
              <Icon id="i-user" className="in-ic" />
              <input type="text" name="name" placeholder="Nguyễn Văn A" required />
            </div>
          </div>
          <div className="form-group">
            <label>
              Số điện thoại <span className="req">*</span>
            </label>
            <div className="input-wrap">
              <Icon id="i-phone" className="in-ic" />
              <input type="tel" name="phone" placeholder="0901 234 567" required />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrap">
              <Icon id="i-mail" className="in-ic" />
              <input type="email" name="email" placeholder="email@gmail.com" />
            </div>
          </div>
          <div className="form-group">
            <label>Số lượng khách</label>
            <div className="input-wrap">
              <Icon id="i-users" className="in-ic" />
              <input type="number" name="guests" placeholder="2 người" min={1} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Tour quan tâm</label>
          <select name="tour" defaultValue="">
            <option value="">-- Chọn tour --</option>
            {tours.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
            <option value="other">Tour khác (ghi rõ bên dưới)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Châu lục yêu thích</label>
          <div className="chip-group" id="chip-group">
            {CONTINENT_CHIPS.map((label) => (
              <button
                key={label}
                type="button"
                className={`chip${selectedChips.has(label) ? ' sel' : ''}`}
                onClick={() => toggleChip(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ngày khởi hành dự kiến</label>
            <div className="input-wrap">
              <Icon id="i-cal" className="in-ic" />
              <input type="date" name="departureDate" />
            </div>
          </div>
          <div className="form-group">
            <label>Ngân sách (triệu/người)</label>
            <select name="budget" defaultValue="">
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt.startsWith('--') ? '' : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Yêu cầu đặc biệt / Ghi chú</label>
          <textarea
            name="notes"
            placeholder="Ví dụ: Cần phòng twin, có trẻ em, yêu cầu ăn chay, cần hỗ trợ visa..."
          />
        </div>

        <button type="submit" className="btn-submit">
          <Icon id="i-send" />
          Gửi yêu cầu tư vấn ngay
        </button>
      </form>
    </>
  )
}
