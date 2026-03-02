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
    <section className="relative w-full overflow-hidden" style={{ borderRadius: '2rem', margin: '0 auto' }}>
      {/* Background image */}
      <div className="relative w-full" style={{ aspectRatio: '16/7', minHeight: '520px' }}>
        <img
          src="/content/images/hero-bg.jpg"
          alt="Cucciolo barboncino toy fulvo Maatilayla"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ borderRadius: '2rem' }}
        />

        {/* Subtle gradient overlay — solo sulla destra per leggibilità */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: '2rem',
            background: 'linear-gradient(105deg, transparent 35%, rgba(30, 15, 5, 0.18) 100%)',
          }}
        />

        {/* Liquid Glass Card — stile Apple Vision Pro */}
        <div
          ref={cardRef}
          className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-5"
          style={{
            width: 'min(420px, 42%)',
            padding: '2rem 2.2rem',
            borderRadius: '1.6rem',
            /* Apple liquid glass */
            background: 'rgba(255, 255, 255, 0.13)',
            backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: [
              '0 0 0 0.5px rgba(255,255,255,0.25) inset',
              '0 1px 0 rgba(255,255,255,0.55) inset',
              '0 20px 60px rgba(20, 10, 0, 0.22)',
              '0 4px 16px rgba(20, 10, 0, 0.10)',
            ].join(', '),
          }}
        >
          {/* Badge ENCI·FCI */}
          <span
            ref={badgeRef}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-body)', letterSpacing: '0.12em' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--color-primary-light)',
                flexShrink: 0,
              }}
            />
            Allevamento Amatoriale ENCI · FCI
          </span>

          {/* Titolo */}
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#fff',
            }}
          >
            Nasce da noi,{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.92)' }}>
              cresce con te.
            </em>
          </h1>

          {/* Descrizione */}
          <p
            ref={descRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            Ogni barboncino toy fulvo di Maatilayla viene allevato in casa,
            a contatto con la famiglia, con protocolli scientifici di
            stimolazione neurologica e test genetici sui riproduttori.
            Perché un cucciolo sano e equilibrato non è fortuna — è scelta.
          </p>

          {/* CTA Buttons */}
          <div ref={btnsRef} className="flex items-center gap-3 flex-wrap">
            <Link
              to="/chi-siamo"
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.8rem',
                borderRadius: '3rem',
                background: 'var(--color-primary)',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(200,97,74,0.35)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-primary-light)'
                ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-primary)'
                ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
              }}
            >
              Chi Siamo
            </Link>

            <Link
              to="/contatti"
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.8rem',
                borderRadius: '3rem',
                background: 'transparent',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1.5px solid rgba(255,255,255,0.6)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.9)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.6)'
              }}
            >
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
