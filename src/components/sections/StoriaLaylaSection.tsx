import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StoriaLaylaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  // ── Entrata CSS via IntersectionObserver bidirezionale ──
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      blockRef.current?.classList.add('ls-entered')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('ls-entered')
            })
          } else {
            entry.target.classList.remove('ls-entered')
          }
        })
      },
      { threshold: 0, rootMargin: '-12% 0px' },
    )

    if (blockRef.current) observer.observe(blockRef.current)

    return () => observer.disconnect()
  }, [])

  // ── Parallax foto (GSAP scrub — solo sull'immagine) ──
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
      id="storia"
      className="ls-section"
      ref={sectionRef}
      aria-label="La storia di Maatilayla"
    >
      <div className="ls-block" ref={blockRef}>
        {/* Foto Layla — se non esiste, il div mostra background cream (fallback graceful) */}
        <div className="ls-img" ref={imgRef}>
          <img
            src="/content/images/maatilayla-layla-zarfati-portrait.webp"
            alt="Layla Zarfati, fondatrice dell'allevamento Maatilayla barboncini toy"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>

        {/* Testo narrativo */}
        <div className="ls-content">
          <span className="ls-badge">La Nostra Storia</span>

          <h2 className="ls-title">
            Tutto è iniziato con <em className="ls-accent">una barbona fulva.</em>
          </h2>

          <p className="ls-body">
            Tutto è cominciato con Jolie — una barboncina fulva ancora cucciolona, affidata da cari
            amici per un paio di settimane. Quella mattina me la ritrovai accanto al letto,
            raggomitolata sul pavimento freddo, pur di non stare sola nella cuccetta morbida in
            salone. Un cane diverso. Difficile da spiegare: un cane che non devi parlare, perché già
            sa quello che stai per dire.
          </p>

          <p className="ls-body">
            Quando i nostri amici tornarono a riprendersi Jolie, capii che quella barboncina aveva
            lasciato un segno impossibile da ignorare. Iniziai una ricerca durata oltre due anni,
            con il dubbio che forse non ne avrei mai trovata un'altra come lei. Invece non solo la
            trovai, ma ebbi la conferma che il barboncino toy è un concentrato di tutto il meglio,
            il bello e il buono che un cane possa offrire.
          </p>

          <p className="ls-body">
            Nel tempo ho conservato quella passione, approfondendo la cultura cinofila e investendo
            in una formazione professionale seria: ho conseguito il titolo di Addestratrice ENCI,
            quello di Educatrice cinofila, e sto completando il Master Allevatore ENCI — il percorso
            più avanzato riconosciuto in Italia per chi alleva con coscienza.
          </p>

          <blockquote className="ls-callout">
            Allevare barboncini toy non è solo una passione: è una missione. Ogni cucciolo che nasce
            a Maatilayla porta con sé anni di studio, selezione attenta e un impegno etico che va
            ben oltre il semplice affetto.
          </blockquote>
        </div>
      </div>
    </section>
  )
}
