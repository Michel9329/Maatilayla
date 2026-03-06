import { useEffect, useRef } from 'react'
import { CalendarCheck, WifiOff } from 'lucide-react'

export default function ContactCallout() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      wrap.classList.add('cc-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => wrap.classList.add('cc-entered'))
        }
      },
      { threshold: 0.15, rootMargin: '-10% 0px' },
    )

    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="cc-wrap" ref={wrapRef}>
      <div className="cc-grid">
        <div className="cc-callout cc-callout--warm" role="note">
          <div className="cc-icon-wrap cc-icon-wrap--warm">
            <CalendarCheck size={18} strokeWidth={2} aria-hidden="true" />
          </div>
          <div>
            <p className="cc-label">Visite solo su appuntamento</p>
            <p className="cc-text">
              L'allevamento è anche casa nostra: riceviamo con piacere, ma solo dopo aver preso
              appuntamento.
            </p>
          </div>
        </div>
        <div className="cc-callout cc-callout--cool" role="note">
          <div className="cc-icon-wrap cc-icon-wrap--cool">
            <WifiOff size={18} strokeWidth={2} aria-hidden="true" />
          </div>
          <div>
            <p className="cc-label">Zona con poco segnale</p>
            <p className="cc-text">
              Siamo in campagna e il segnale è debole: se non rispondiamo al telefono, scriveteci su
              WhatsApp o via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
