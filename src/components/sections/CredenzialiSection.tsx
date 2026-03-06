import { useEffect, useRef } from 'react'
import { GraduationCap, Award, BadgeCheck } from 'lucide-react'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Addestratrice ENCI',
    description:
      "Un riconoscimento che nasce dall'ascolto: ogni cane comunica, bisogna imparare a leggerlo.",
  },
  {
    icon: Award,
    title: 'Educatrice Cinofila',
    description:
      'Lavorare sul comportamento significa lavorare sulla relazione — tra il cane e la famiglia che lo accoglie.',
  },
  {
    icon: BadgeCheck,
    title: 'Master Allevatore ENCI',
    description:
      "Il percorso più avanzato proposto dall'ENCI. Una scelta fatta per i cuccioli, non per il titolo.",
  },
]

export default function CredenzialiSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      container.classList.add('cr-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            container.classList.add('cr-entered')
          } else {
            container.classList.remove('cr-entered')
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cr-section" ref={sectionRef} aria-label="Credenziali di Layla Zarfati">
      <div className="cr-container" ref={containerRef}>
        <div className="cr-header">
          <span className="cr-badge">Formazione</span>
          <h2 className="cr-title">
            Un percorso fatto di <em className="cr-title-em">studio e osservazione.</em>
          </h2>
          <p className="cr-intro">
            Studiare è stato un modo per stare più vicina ai cani — capirli, non solo amarli.
          </p>
        </div>

        <div className="cr-grid">
          {credentials.map((cred) => (
            <div key={cred.title} className="cr-card">
              <div className="cr-icon-wrap">
                <cred.icon size={28} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="cr-card-title">{cred.title}</h3>
              <p className="cr-card-text">{cred.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
