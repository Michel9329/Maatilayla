import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: 'Prima del 2018',
    milestone: 'La Fondazione.',
    description:
      "Tutto nasce da Jolie — una barboncina fulva che mi ha stregata per sempre. Da quel momento, l'idea di creare un allevamento serio e appassionato prende forma.",
  },
  {
    year: 'Ottobre 2018',
    milestone: 'Il Trasferimento.',
    description:
      "Lasciare la città non è stato un sacrificio — è stato il passo più naturale del mondo. Un nuovo spazio, aperto, con l'erba vera sotto le zampe. Esattamente quello che meritavano.",
  },
  {
    year: 'Novembre 2018',
    milestone: 'I Lavori Iniziano.',
    description:
      'Il cantiere era ancora aperto, ma i cani erano già a casa. Giravano tra le macerie come se fosse il posto più bello del mondo — e in un certo senso lo era già.',
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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      container.classList.add('tl-entered')
      return
    }

    // Header entrance
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          container.classList.toggle('tl-entered', entry.isIntersecting)
        })
      },
      { threshold: 0, rootMargin: '-8% 0px' },
    )
    headerObserver.observe(container)

    // Dot items: GSAP ScrollTrigger scrub
    // Ogni item appare progressivamente con lo scroll della pagina
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    gsap.set(items, { opacity: 0, y: 8 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        end: 'bottom 55%',
        scrub: 0.6,
      },
    })

    items.forEach((el) => {
      tl.to(el, { opacity: 1, y: 0, duration: 0.4 }, '<0.25')
    })

    return () => {
      headerObserver.disconnect()
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === section)
        .forEach((st) => st.kill())
      gsap.set(items, { clearProps: 'all' })
    }
  }, [])

  return (
    <section className="tl-section" ref={sectionRef} aria-label="La storia di Maatilayla">
      <div className="tl-container" ref={containerRef}>
        <div className="tl-header">
          <span className="tl-badge">La Timeline</span>
          <h2 className="tl-title">
            Da un sogno a <em className="tl-accent">una realtà compiuta.</em>
          </h2>
        </div>

        <div className="tl-track" role="list">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`tl-item tl-item--${i % 2 === 0 ? 'above' : 'below'}`}
              role="listitem"
              ref={(el) => {
                itemRefs.current[i] = el
              }}
            >
              <div className="tl-card">
                <span className="tl-year">{m.year}</span>
                <h3 className="tl-milestone">{m.milestone}</h3>
                <p className="tl-desc">{m.description}</p>
              </div>
              <div className="tl-dot" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
