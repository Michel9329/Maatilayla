import { useEffect, useRef } from 'react'
import { GraduationCap, Award, BadgeCheck } from 'lucide-react'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Addestratrice ENCI',
    description:
      "Titolo ufficiale riconosciuto dall'Ente Nazionale della Cinofilia Italiana per l'addestramento professionale dei cani.",
  },
  {
    icon: Award,
    title: 'Educatrice Cinofila',
    description:
      "Specializzazione nella gestione comportamentale e nell'educazione del cane nelle fasi di crescita.",
  },
  {
    icon: BadgeCheck,
    title: 'Master Allevatore ENCI',
    description:
      "Il percorso formativo più avanzato dell'ENCI per allevatori che operano con i più alti standard etici e sanitari.",
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
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            container.classList.add('cr-entered')
          })
        } else {
          container.classList.remove('cr-entered')
        }
      },
      { threshold: 0, rootMargin: '-10% 0px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cr-section" ref={sectionRef} aria-label="Credenziali di Layla Zarfati">
      <div className="cr-container" ref={containerRef}>
        <div className="cr-header">
          <span className="cr-badge">Le Credenziali</span>
          <h2 className="cr-title">
            <span className="cr-name">Layla Zarfati</span>
            <br />
            <em className="cr-subtitle-em">La professionista dietro la passione.</em>
          </h2>
          <p className="cr-intro">
            Anni di studio e formazione continua presso l&apos;ENCI — l&apos;Ente Nazionale della
            Cinofilia Italiana — a garanzia di un allevamento che rispetta i più alti standard etici
            e sanitari.
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
