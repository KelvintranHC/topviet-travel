'use client'

import { useEffect } from 'react'

type Props = {
  statTargets: number[]
}

export function ClientUI({ statTargets }: Props) {
  useEffect(() => {
    const menuToggle = document.querySelector('.menu-toggle')
    const mobileNav = document.querySelector('.mobile-nav')

    const onMenuClick = () => {
      mobileNav?.classList.toggle('open')
      menuToggle?.setAttribute(
        'aria-expanded',
        mobileNav?.classList.contains('open') ? 'true' : 'false',
      )
    }

    menuToggle?.addEventListener('click', onMenuClick)
    mobileNav?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'))
    })

    const statNums = document.querySelectorAll('.stat-num')
    const animateCounter = (el: Element, target: number) => {
      const duration = 2000
      const start = performance.now()
      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target).toLocaleString()
        if (progress < 1) requestAnimationFrame(update)
        else el.textContent = target.toLocaleString()
      }
      requestAnimationFrame(update)
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = [...statNums].indexOf(entry.target)
          if (idx >= 0 && !(entry.target as HTMLElement).dataset.animated) {
            ;(entry.target as HTMLElement).dataset.animated = 'true'
            animateCounter(entry.target, statTargets[idx] ?? 0)
          }
        })
      },
      { threshold: 0.5 },
    )
    statNums.forEach((el) => statsObserver.observe(el))

    const agendaTabs = document.querySelectorAll('.agenda-tab')
    const agendaPanels = document.querySelectorAll('.agenda-panel')
    agendaTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const day = tab.getAttribute('data-day')
        agendaTabs.forEach((t) => t.classList.remove('active'))
        agendaPanels.forEach((p) => p.classList.remove('active'))
        tab.classList.add('active')
        document.getElementById(`agenda-day-${day}`)?.classList.add('active')
      })
    })

    const track = document.querySelector('.testimonial-track') as HTMLElement | null
    const slides = document.querySelectorAll('.testimonial-slide')
    let currentSlide = 0
    const goToSlide = (index: number) => {
      if (!track) return
      currentSlide = (index + slides.length) % slides.length
      track.style.transform = `translateX(-${currentSlide * 100}%)`
    }
    document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
      goToSlide(currentSlide - 1)
    })
    document.querySelector('.testimonial-next')?.addEventListener('click', () => {
      goToSlide(currentSlide + 1)
    })

    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item')
        if (!item) return
        const wasOpen = item.classList.contains('open')
        document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'))
        if (!wasOpen) item.classList.add('open')
      })
    })

    return () => {
      menuToggle?.removeEventListener('click', onMenuClick)
      statsObserver.disconnect()
    }
  }, [statTargets])

  return null
}
