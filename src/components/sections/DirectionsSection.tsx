import { useEffect, useRef } from 'react'
import { Plane, Car, TrainFront } from 'lucide-react'

const directions = [
  {
    icon: Plane,
    mode: 'Da Fiumicino Aeroporto',
    time: "L'aeroporto più vicino",
    steps: [
      "L'aeroporto di Roma Fiumicino (FCO) è il più vicino, a circa 80 km.",
      'Da Fiumicino puoi proseguire in auto o in treno verso Bassano Romano.',
      'In auto: prendi il GRA direzione Firenze, poi Cassia Bis (vedi scheda auto).',
      'In treno: raggiungi Roma Ostiense e prendi la linea FL3 (vedi scheda treno).',
    ],
  },
  {
    icon: Car,
    mode: 'In auto da Roma',
    time: 'Circa 1 ora',
    steps: [
      "Dal Grande Raccordo Anulare (GRA) prendi l'uscita 5 — Cassia Bis Veientana direzione Viterbo.",
      'Prosegui sulla Cassia Bis fino a superare Monterosi, poi segui per Sutri.',
      '1 km prima di Sutri, al bivio per Bassano Romano svolta a sinistra.',
      'Prosegui fino a Bassano Romano centro.',
      "Segui le indicazioni del navigatore per l'indirizzo esatto.",
    ],
  },
  {
    icon: TrainFront,
    mode: 'In treno da Roma',
    time: 'Linea FL3 Roma — Viterbo',
    steps: [
      'Da Roma Ostiense o Roma San Pietro, prendi la linea FL3 direzione Viterbo.',
      'Scendi alla stazione di Capranica-Sutri (circa 1h 15min da Roma).',
      'Dalla stazione, Bassano Romano dista circa 4 km.',
      'Chiamaci e ti veniamo incontro noi in auto.',
    ],
  },
]

export default function DirectionsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('cd-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => section.classList.add('cd-entered'))
        }
      },
      { threshold: 0.1, rootMargin: '-10% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cd-section" ref={sectionRef} aria-label="Come arrivare">
      <div className="cd-header">
        <span className="ct-badge">Come arrivare</span>
        <h2 className="cd-title">
          Indicazioni per <em className="cd-title-accent">raggiungerci.</em>
        </h2>
      </div>

      <div className="cd-grid">
        {directions.map((d) => (
          <div key={d.mode} className="cd-card">
            <div className="cd-card-head">
              <div className="cd-icon-wrap">
                <d.icon size={22} strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="cd-mode">{d.mode}</h3>
                <span className="cd-time">{d.time}</span>
              </div>
            </div>
            <ol className="cd-steps">
              {d.steps.map((step, i) => (
                <li key={i} className="cd-step">
                  <span className="cd-step-num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}
