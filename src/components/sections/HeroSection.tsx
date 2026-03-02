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
      { opacity: 0, x: 50, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.4 }
    )
    .fromTo(badgeRef.current,  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.6')
    .fromTo(titleRef.current,  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .fromTo(descRef.current,   { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
    .fromTo(btnsRef.current,   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        /* 20px margin da tutti i lati del viewport — navbar ci flotta dentro */
        margin: '20px',
        borderRadius: '30px',
        overflow: 'hidden',
        aspectRatio: '16 / 7',
        minHeight: '480px',
        maxHeight: '86vh',
        background: 'linear-gradient(135deg, #C4956A 0%, #E8845A 40%, #C8A882 100%)',
      }}
    >
      {/* Immagine di sfondo */}
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

      {/* Overlay scuro leggero destra */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(100deg, rgba(10,5,0,0.04) 0%, rgba(10,5,0,0.28) 100%)',
        }}
      />

      {/* ─── Liquid Glass Card ─── */}
      <div
        ref={cardRef}
        className="liquid-glass"
        style={{
          position: 'absolute',
          right: '4%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(400px, 41%)',
          padding: '2rem 2.2rem',
          borderRadius: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
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
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          <span style={{
            width: 7, height: 7,
            borderRadius: '50%',
            background: '#F2A882',
            display: 'inline-block',
            flexShrink: 0,
          }} />
          Allevamento Amatoriale ENCI · FCI
        </span>

        {/* Titolo */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.65rem, 2.6vw, 2.4rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            color: '#fff',
            textShadow: '0 2px 16px rgba(0,0,0,0.22)',
          }}
        >
          Nasce da noi,{' '}
          <em style={{ fontStyle: 'italic' }}>cresce con te.</em>
        </h1>

        {/* Testo */}
        <p
          ref={descRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.76rem, 1vw, 0.88rem)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          Ogni barboncino toy fulvo di Maatilayla viene allevato in casa,
          a contatto con la famiglia, con protocolli scientifici di
          stimolazione neurologica e test genetici sui riproduttori.
          Perché un cucciolo sano e equilibrato non è fortuna — è scelta.
        </p>

        {/* CTA */}
        <div ref={btnsRef} style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', paddingTop: '0.2rem' }}>
          <Link to="/chi-siamo" className="btn-hero-primary">Chi Siamo</Link>
          <Link to="/contatti" className="btn-hero-outline">Contatti</Link>
        </div>
      </div>
    </section>
  )
}
