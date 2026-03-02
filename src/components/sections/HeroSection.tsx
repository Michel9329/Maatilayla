import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(cardRef.current,
      { opacity: 0, x: 60, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.3 }
    )
    .fromTo(badgeRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 }, '-=0.6'
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }, '-=0.3'
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 }, '-=0.3'
    )
    .fromTo(btnsRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5 }, '-=0.2'
    )
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '2rem',
        overflow: 'hidden',
        /* Fallback gradient caldo (visibile finché non c'è l'immagine) */
        background: 'linear-gradient(135deg, #C4956A 0%, #E8845A 35%, #D4A574 60%, #C8A882 100%)',
        aspectRatio: '16 / 7',
        minHeight: '520px',
      }}
    >
      {/* Background image via CSS — nessun broken icon se mancante */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/content/images/maatilayla-header-cucciolo-allevamento.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay gradiente — migliora leggibilità a destra */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(20,10,5,0.08) 0%, rgba(20,10,5,0.28) 100%)',
        }}
      />

      {/* ─── Liquid Glass Card ─── */}
      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(420px, 42%)',
          padding: '2rem 2.2rem',
          borderRadius: '1.6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1rem',
          /* Apple Vision Pro liquid glass */
          background: 'rgba(255, 252, 248, 0.14)',
          backdropFilter: 'blur(48px) saturate(200%) brightness(1.08)',
          WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.08)',
          border: '1px solid rgba(255, 255, 255, 0.38)',
          boxShadow: [
            '0 0 0 0.5px rgba(255,255,255,0.28) inset',
            '0 1px 0 rgba(255,255,255,0.55) inset',
            '0 -1px 0 rgba(0,0,0,0.04) inset',
            '0 24px 64px rgba(20, 10, 0, 0.24)',
            '0 4px 16px rgba(20, 10, 0, 0.10)',
          ].join(', '),
        }}
      >
        {/* Badge */}
        <span
          ref={badgeRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#F2A882',
            flexShrink: 0,
          }} />
          Allevamento Amatoriale ENCI · FCI
        </span>

        {/* Titolo */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.55rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            color: '#ffffff',
            textShadow: '0 1px 8px rgba(0,0,0,0.15)',
          }}
        >
          Nasce da noi,{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(255,245,235,0.95)' }}>
            cresce con te.
          </em>
        </h1>

        {/* Testo */}
        <p
          ref={descRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.78rem, 1.05vw, 0.9rem)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.84)',
          }}
        >
          Ogni barboncino toy fulvo di Maatilayla viene allevato in casa,
          a contatto con la famiglia, con protocolli scientifici di
          stimolazione neurologica e test genetici sui riproduttori.
          Perché un cucciolo sano e equilibrato non è fortuna — è scelta.
        </p>

        {/* CTA */}
        <div ref={btnsRef} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
          <Link
            to="/chi-siamo"
            style={{
              display: 'inline-block',
              padding: '0.65rem 1.7rem',
              borderRadius: '3rem',
              background: 'var(--color-primary)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(200,97,74,0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 8px 24px rgba(200,97,74,0.5)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 4px 18px rgba(200,97,74,0.4)'
            }}
          >
            Chi Siamo
          </Link>

          <Link
            to="/contatti"
            style={{
              display: 'inline-block',
              padding: '0.65rem 1.7rem',
              borderRadius: '3rem',
              background: 'transparent',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1.5px solid rgba(255,255,255,0.65)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,0.18)'
              el.style.borderColor = 'rgba(255,255,255,0.95)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.borderColor = 'rgba(255,255,255,0.65)'
              el.style.transform = 'translateY(0)'
            }}
          >
            Contatti
          </Link>
        </div>
      </div>

      {/* Mobile: card in basso centrata */}
      <style>{`
        @media (max-width: 768px) {
          .hero-glass-card {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            width: 90% !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
