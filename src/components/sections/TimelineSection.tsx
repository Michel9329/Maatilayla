import { useEffect, useRef, useState, useCallback } from 'react'

const milestones = [
  {
    year: 'Prima del 2018',
    milestone: 'La Fondazione.',
    description:
      "Tutto nasce da Jolie — una barboncina fulva che ha stregato Layla per sempre. Da quel momento, l'idea di creare un allevamento serio e appassionato prende forma.",
  },
  {
    year: 'Ottobre 2018',
    milestone: 'Il Trasferimento.',
    description:
      'La passione per i barboncini toy spinge a lasciare la casa di città. Un nuovo spazio, più grande e naturale, aspetta i nostri cani.',
  },
  {
    year: 'Novembre 2018',
    milestone: 'I Lavori Iniziano.',
    description:
      'Inizia la ristrutturazione, ma i cani sono già felici: spazi sconfinati da esplorare, insetti da inseguire, natura vera. Fanno i cani, finalmente.',
  },
  {
    year: 'Ottobre 2019',
    milestone: 'La Casetta dei Barboni.',
    description:
      'I lavori sono finiti. La nuova casetta dedicata ai barboncini viene inaugurata: è il loro angolo, dove mangiano, vengono curati e riposano.',
  },
  {
    year: 'Maggio 2020',
    milestone: 'Il Campo di Agility.',
    description:
      "Un'ampia area attrezzata con ostacoli, bascule, cerchi, slalom e tunnel. I nostri cani sono davvero felici. Il sogno è completo.",
  },
]

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // IntersectionObserver entrance (bidirezionale)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      containerRef.current?.classList.add('tl-entered')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            containerRef.current?.classList.add('tl-entered')
          } else {
            containerRef.current?.classList.remove('tl-entered')
          }
        })
      },
      { threshold: 0, rootMargin: '-10% 0px' },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Dot indicatori: sincronizzati con scroll
  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const itemWidth = track.scrollWidth / milestones.length
    const index = Math.round(track.scrollLeft / itemWidth)
    setActiveIndex(Math.min(index, milestones.length - 1))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <section className="tl-section" ref={sectionRef} aria-label="La storia di Maatilayla">
      <div className="tl-container" ref={containerRef}>
        <div className="tl-header">
          <span className="tl-badge">La Timeline</span>
          <h2 className="tl-title">
            Da un sogno a <em className="tl-accent">una realtà compiuta.</em>
          </h2>
        </div>

        <div className="tl-track" ref={trackRef} role="list">
          {milestones.map((m) => (
            <div key={m.year} className="tl-item" role="listitem">
              <div className="tl-dot" aria-hidden="true" />
              <span className="tl-year">{m.year}</span>
              <h3 className="tl-milestone">{m.milestone}</h3>
              <p className="tl-desc">{m.description}</p>
            </div>
          ))}
        </div>

        {/* Dot indicatori — visibili solo su mobile */}
        <div className="tl-dots" aria-hidden="true">
          {milestones.map((_, i) => (
            <span
              key={i}
              className={`tl-dot-indicator${i === activeIndex ? ' tl-dot-indicator--active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
