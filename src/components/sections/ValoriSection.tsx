import { useEffect, useRef } from 'react'
import { ShieldCheck, Sparkles, Heart, Leaf, Sun, HandHeart } from 'lucide-react'

const groups = [
  {
    label: 'I Tre Obiettivi',
    pillars: [
      {
        icon: ShieldCheck,
        title: 'Cuccioli sani.',
        text: 'Scrupolosi controlli sanitari su riproduttori e cuccioli, per scongiurare patologie cardiologiche e le principali malattie ereditarie.',
      },
      {
        icon: Sparkles,
        title: 'Cuccioli belli.',
        text: 'Selezione attenta dei riproduttori per ottenere cuccioli sempre più meritevoli, nel rispetto dello standard di razza.',
      },
      {
        icon: Heart,
        title: 'Cuccioli equilibrati.',
        text: 'Tecnica Biosensor e permanenza in allevamento fino a 3 mesi: gli strumenti giusti per un percorso di vita sereno.',
      },
    ],
  },
  {
    label: 'I Tre Valori',
    pillars: [
      {
        icon: Leaf,
        title: 'Rispetto della natura.',
        text: "Accoppiamenti naturali e intervallo di almeno un anno tra una gravidanza e l'altra, per il benessere della fattrice.",
      },
      {
        icon: Sun,
        title: 'Ambiente sereno.',
        text: 'I cuccioli crescono a contatto con gatti, conigli e tartarughe — sviluppando rispetto per le altre specie e sicurezza emotiva.',
      },
      {
        icon: HandHeart,
        title: 'Punto di riferimento.',
        text: 'Anche dopo la cessione siamo sempre disponibili: consigli, supporto e tutta la nostra esperienza per chi ne avesse bisogno.',
      },
    ],
  },
]

export default function ValoriSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      container.classList.add('vl-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            container.classList.add('vl-entered')
          })
        } else {
          container.classList.remove('vl-entered')
        }
      },
      { threshold: 0, rootMargin: '-10% 0px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="vl-section" ref={sectionRef} aria-label="I nostri valori">
      <div className="vl-container" ref={containerRef}>
        <div className="vl-header">
          <span className="vl-badge">Filosofia e Valori</span>
          <h2 className="vl-title">
            Tre obiettivi. Tre valori. <em className="vl-accent">Una sola missione.</em>
          </h2>
          <p className="vl-intro">
            Ogni barboncino toy nato a Maatilayla è il risultato di scelte precise, guidate dai
            principi che ci appartengono da sempre.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.label} className="vl-group">
            <span className="vl-group-label">{group.label}</span>
            <div className="vl-grid">
              {group.pillars.map((pillar) => (
                <div key={pillar.title} className="vl-card">
                  <div className="vl-icon-wrap">
                    <pillar.icon size={26} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="vl-card-title">{pillar.title}</h3>
                  <p className="vl-card-text">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
