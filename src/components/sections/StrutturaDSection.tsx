import { useEffect, useRef } from 'react'

export default function StrutturaDSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.15, rootMargin: '-20% 0px' },
    )
    if (blockRef.current) observer.observe(blockRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="struttura"
      className="st-section"
      ref={sectionRef}
      aria-label="La struttura di Maatilayla"
    >
      <div className="st-block" ref={blockRef}>
        {/* Colonna sx: testo + foto orizzontale */}
        <div className="st-left">
          <div className="st-content">
            <span className="st-badge">La Struttura</span>
            <h2 className="st-title">
              Uno spazio pensato <em className="st-accent">per loro.</em>
            </h2>
            <p className="st-body">
              Quando ho immaginato questo posto, avevo in testa una cosa sola: che i miei cani non
              dovessero mai sentirsi in gabbia. Una propriet&#224; immersa nel verde, ampi spazi
              aperti per correre, una casetta dedicata dove mangiano, vengono curati e riposano con
              vista sui boschi.
            </p>
            <p className="st-body">
              I cuccioli che nascono qui non conoscono la gabbia n&#233; il box. Crescono a contatto
              con gli altri animali della struttura, con i ritmi della famiglia, con gli spazi
              aperti. &#200; in questo contesto, non in un protocollo,
              <br />
              che si costruisce l&#8217;equilibrio che poi portano con s&#233;.
            </p>
            <p className="st-body st-body--em">
              Ogni angolo di questa struttura &#232; stato costruito con un solo obiettivo: offrire
              ai nostri cani la vita che meritano &#8212; naturale, serena e ricca di stimoli.
            </p>
          </div>
          <div className="st-secondary">
            <img
              src="/content/images/maatilayla-struttura-panoramica-alba.webp"
              alt="Vista panoramica dell'allevamento Maatilayla immerso nel verde della campagna"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Colonna dx: foto verticale */}
        <div className="st-panorama">
          <img
            src="/content/images/maatilayla-header-cucciolo-allevamento-03.webp"
            alt="Cuccioli di barboncino toy all'allevamento Maatilayla"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
