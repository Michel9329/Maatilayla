import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.4 }
    )
    .fromTo(badgeRef.current,  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.6')
    .fromTo(titleRef.current,  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .fromTo(descRef.current,   { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
    .fromTo(btnsRef.current,   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
  }, [])

  const descStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.82rem, 1vw, 0.88rem)',
    fontWeight: 400 as const,
    lineHeight: 1.75,
    color: 'var(--color-text)',
    margin: 0,
  }

  return (
    <section className="hero-section">
      {/* Background image */}
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: 'url(/content/images/maatilayla-header-cucciolo-allevamento.webp)' }}
      />

      {/* Dark overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Glass Card */}
      <div ref={cardRef} className="hero-card">
        {/* Badge */}
        <span
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            lineHeight: 1,
          }}
        >
          <span style={{
            width: 8, height: 8,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            flexShrink: 0,
            animation: 'pulse-dot 2.4s ease-in-out infinite',
          }} />
          Allevamento Amatoriale ENCI · FCI
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.65rem, 2.6vw, 2.4rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            color: 'var(--color-text)',
          }}
        >
          Nasce da noi, <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>cresce con te.</em>
        </h1>

        {/* Description — CSS toggles short/full */}
        <div ref={descRef}>
          <p className="hero-desc-short" style={descStyle}>
            Ogni barboncino toy fulvo di Maatilayla viene allevato in casa, con test genetici
            e stimolazione neurologica. Un cucciolo sano non è fortuna&nbsp;— è scelta.
          </p>
          <p className="hero-desc-full" style={descStyle}>
            Ogni barboncino toy fulvo di Maatilayla viene allevato in casa,
            a contatto con la famiglia, con protocolli scientifici di
            stimolazione neurologica e test genetici sui riproduttori.
            Perché un cucciolo sano e equilibrato non è fortuna&nbsp;— è scelta.
          </p>
        </div>

        {/* CTA */}
        <div ref={btnsRef} className="hero-cta">
          <Link to="/chi-siamo" className="btn-hero-primary">Chi Siamo</Link>
          <Link to="/contatti" className="btn-hero-outline">Contatti</Link>
        </div>
      </div>
    </section>
  )
}
