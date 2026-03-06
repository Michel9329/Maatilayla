import { useEffect, useRef } from 'react'

const dogs = [
  {
    name: 'Yupie',
    breed: 'Yorkshire Terrier',
    story:
      'Regalatomi da papà al mio primo compleanno, furbo come un furetto. Quando i miei si separarono, litigarono credo più per la sua custodia che per la mia.',
  },
  {
    name: 'Giacobbe',
    breed: 'San Bernardo',
    story:
      'Settanta chili di cane che si divertiva a dissotterrare i bagnanti che facevano le sabbiature in spiaggia. In assenza di neve, ci si adatta.',
  },
  {
    name: 'Dersie',
    breed: 'Collie',
    story:
      'Iperprotettivo. Tollerava poco le mie amiche di gioco, e ogni tanto ne faceva scappare qualcuna in lacrime. Pensava di fare la cosa giusta.',
  },
  {
    name: 'Togo',
    breed: 'Bobtail',
    story:
      'Metteva in pratica le sue innate abilità di cane pastore radunando i bambini che giocavano a pallone al parchetto sotto casa. Necessità fa virtù.',
  },
  {
    name: 'Lilli',
    breed: 'Cocker Americana',
    story:
      "Una dolcissima. L'ho acquistata in negozio solo per toglierla da quella gabbia-vetrina. Certi sguardi non si ignorano.",
  },
  {
    name: 'Oscar',
    breed: 'Misto Schnauzer',
    story:
      'Dopo due giorni davanti alla porta del mio ufficio è entrato nella nostra casa e nelle nostre vite. Ci è rimasto per oltre dieci anni.',
  },
]

export default function CaniVitaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      sectionRef.current?.classList.add('cv-header-entered', 'cv-entered')
      return
    }

    // Observer 1: header — parte presto, quando l'header entra nel viewport
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            sectionRef.current?.classList.add('cv-header-entered')
          } else {
            sectionRef.current?.classList.remove('cv-header-entered')
          }
        })
      },
      { threshold: 0, rootMargin: '-10% 0px' },
    )

    // Observer 2: grid — parte tardi, quando metà griglia è visibile
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            sectionRef.current?.classList.add('cv-entered')
          } else {
            sectionRef.current?.classList.remove('cv-entered')
          }
        })
      },
      { threshold: 0.5, rootMargin: '0px' },
    )

    if (headerRef.current) headerObserver.observe(headerRef.current)
    if (gridRef.current) gridObserver.observe(gridRef.current)

    return () => {
      headerObserver.disconnect()
      gridObserver.disconnect()
    }
  }, [])

  return (
    <section
      id="cani-vita"
      className="cv-section"
      ref={sectionRef}
      aria-label="Tutti i cani della vita di Layla"
    >
      <div className="cv-container">
        <div className="cv-header" ref={headerRef}>
          <span className="cv-badge">Una vita con i cani</span>
          <h2 className="cv-title">
            Tutti i cani <em className="cv-accent">della mia vita.</em>
          </h2>
          <p className="cv-intro">
            Tutti diversi, e anche piuttosto numerosi, sono stati i cani che mi hanno accompagnata
            sin dalla più tenera età. Tutti loro, in un modo o nell'altro, hanno lasciato un segno.
          </p>
        </div>

        <div className="cv-grid" ref={gridRef}>
          {dogs.map((dog, i) => (
            <div className="cv-card" key={dog.name} style={{ '--cv-i': i } as React.CSSProperties}>
              <div className="cv-card-top">
                <span className="cv-name">{dog.name}</span>
                <span className="cv-breed">{dog.breed}</span>
              </div>
              <p className="cv-story">{dog.story}</p>
            </div>
          ))}
        </div>

        <p className="cv-footer">
          Ognuno di loro mi ha insegnato qualcosa — ma i modi di amarli cambiano con gli anni. Da
          giovani si vive il cane solo come compagno di giochi, senza vedere le sue vere necessità.
          Nel tempo quella consapevolezza è cresciuta, ed è diventata il fondamento di tutto quello
          che faccio oggi.
        </p>
      </div>
    </section>
  )
}
