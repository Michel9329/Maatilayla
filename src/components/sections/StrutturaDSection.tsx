import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_ID = '_jQ2oFcZIhY'

export default function StrutturaDSection() {
  const [videoActive, setVideoActive] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver bidirezionale per l'animazione entrance
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      blockRef.current?.classList.add('st-entered')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            blockRef.current?.classList.add('st-entered')
          } else {
            blockRef.current?.classList.remove('st-entered')
          }
        })
      },
      { threshold: 0, rootMargin: '-12% 0px' },
    )
    if (blockRef.current) observer.observe(blockRef.current)
    return () => observer.disconnect()
  }, [])

  // GSAP parallax sull'immagine (scrub leggero)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const ctx = gsap.context(() => {
      const img = imgRef.current?.querySelector('img')
      if (img && blockRef.current) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            force3d: true,
            scrollTrigger: {
              trigger: blockRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="struttura"
      className="st-section"
      ref={sectionRef}
      aria-label="La struttura di Maatilayla"
    >
      <div className="st-block" ref={blockRef}>
        {/* Colonna sinistra: testo */}
        <div className="st-content">
          <span className="st-badge">La Struttura</span>
          <h2 className="st-title">
            Uno spazio pensato <em className="st-accent">per loro.</em>
          </h2>
          <p className="st-body">
            Una proprieta immersa nel verde, dove i nostri barboncini toy vivono in piena liberta.
            Ampi spazi aperti per correre, un area interna confortevole e una casetta dedicata dove
            mangiano, vengono curati e riposano con vista sui boschi circostanti.
          </p>
          <p className="st-body">
            Nel 2020 abbiamo completato il campo di agility — un area attrezzata con ostacoli,
            bascule, cerchi, slalom e tunnel. Non solo un campo sportivo: un modo per stimolare la
            mente dei nostri barboni e mantenerli felici ogni giorno.
          </p>
          <p className="st-body st-body--em">
            Tutto e stato costruito con un solo obiettivo: offrire ai nostri cani la vita che
            meritano — naturale, serena e ricca di stimoli.
          </p>
        </div>

        {/* Colonna destra: foto + video YouTube facade */}
        <div className="st-media">
          <div className="st-img" ref={imgRef}>
            <img
              src="/content/images/maatilayla-barboncino-toy-relax-sole.webp"
              alt="Barboncino toy dell'allevamento Maatilayla che si gode il sole nel campo"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* YouTube facade click-to-load: nessuna risorsa YouTube caricata fino al click */}
          {!videoActive ? (
            <button
              className="yt-facade"
              onClick={() => setVideoActive(true)}
              aria-label="Guarda il video del campo agility Maatilayla"
            >
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/sddefault.jpg`}
                alt="Anteprima video campo agility barboncini Maatilayla"
                loading="lazy"
                decoding="async"
              />
              <span className="yt-play-btn" aria-hidden="true">
                <svg viewBox="0 0 68 48" width="68" height="48">
                  <path
                    d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                    fill="#f00"
                  />
                  <path d="M45 24 27 14v20" fill="#fff" />
                </svg>
              </span>
            </button>
          ) : (
            <div className="yt-wrapper">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="Video campo agility allevamento Maatilayla barboncini toy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
