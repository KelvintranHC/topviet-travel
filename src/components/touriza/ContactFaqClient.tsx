'use client'

import { useState } from 'react'

import { Icon } from './Icon'

type FaqItem = { question: string; answer: string }

export function ContactFaqClient({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="faq-grid">
      {faqs.map((faq, i) => (
        <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
          <button type="button" className="faq-q" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
            <span>{faq.question}</span>
            <div className="faq-icon">
              <Icon id="i-plus" />
            </div>
          </button>
          <div className="faq-a">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
