import { useEffect, useRef, useState, useCallback } from 'react'
import {
  FileText,
  GitBranch,
  Trophy,
  Award,
  ShieldCheck,
  BookOpen,
  UserCheck,
  ArrowRightLeft,
} from 'lucide-react'

const cards = [
  {
    icon: FileText,
    title: 'Dati anagrafici',
    text: 'Razza, nome, sesso, data di nascita, colore del mantello e numero di microchip.',
    bg: 'var(--ped-menta)',
  },
  {
    icon: GitBranch,
    title: 'Albero genealogico',
    text: 'La generazione dei cuccioli fino al quarto grado di ascendenza, a prova della purezza della razza.',
    bg: 'var(--ped-giallo)',
  },
  {
    icon: Trophy,
    title: 'Campioni in famiglia',
    text: 'Se fra gli antenati il cane ha avuto campioni di bellezza o di lavoro.',
    bg: 'var(--ped-pesca)',
  },
  {
    icon: Award,
    title: 'Premi in esposizione',
    text: 'Eventuali premi assegnati in esposizione cinofila riconosciuta.',
    bg: 'var(--ped-rosa)',
  },
  {
    icon: ShieldCheck,
    title: 'Salute genetica',
    text: "L'assenza o presenza di eventuali patologie testate geneticamente nei riproduttori.",
    bg: 'var(--ped-lilla)',
  },
  {
    icon: BookOpen,
    title: 'Libro delle Origini',
    text: "Il numero d'iscrizione al Libro delle Origini Italiano (LOI) gestito dall'ENCI.",
    bg: 'var(--ped-salvia)',
  },
  {
    icon: UserCheck,
    title: 'Dati del proprietario',
    text: "I dati anagrafici del proprietario e dell'allevatore del cane.",
    bg: 'var(--ped-azzurro)',
  },
  {
    icon: ArrowRightLeft,
    title: 'Passaggi di proprietà',
    text: 'I diversi passaggi di proprietà avuti dal cane, con tracciabilità completa.',
    bg: 'var(--ped-lavanda)',
  },
]

export default function PedigreeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // ── CSS entrance via IntersectionObserver ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('ped-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            section.classList.add('ped-entered')
          })
        } else {
          section.classList.remove('ped-entered')
        }
      },
      { threshold: 0.1, rootMargin: '-20% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // ── Mobile: track scroll per dot attivo ──
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const onScroll = () => {
      const scrollLeft = grid.scrollLeft
      const cardEl = grid.firstElementChild as HTMLElement | null
      if (!cardEl) return
      const cardWidth = cardEl.offsetWidth
      const gap = 12
      const index = Math.round(scrollLeft / (cardWidth + gap))
      setActiveIndex(Math.min(index, cards.length - 1))
    }

    grid.addEventListener('scroll', onScroll, { passive: true })
    return () => grid.removeEventListener('scroll', onScroll)
  }, [])

  // ── Tap su dot → scroll alla card ──
  const scrollToCard = useCallback((index: number) => {
    const grid = gridRef.current
    if (!grid) return
    const card = grid.children[index] as HTMLElement | undefined
    if (!card) return
    grid.scrollTo({ left: card.offsetLeft - grid.offsetLeft, behavior: 'smooth' })
  }, [])

  return (
    <section className="ped-section" ref={sectionRef} aria-label="Importanza del pedigree">
      <div className="ped-header">
        <span className="ped-badge">Il Pedigree</span>
        <h2 className="ped-title">
          La carta d&apos;identità del tuo <em className="ped-title-accent">barboncino.</em>
        </h2>
        <p className="ped-subtitle">
          Il pedigree ENCI non è un optional — è l&apos;unico documento ufficiale che certifica
          l&apos;identità, la salute e la storia del tuo cucciolo.
        </p>
      </div>

      <div className="ped-grid" ref={gridRef}>
        {cards.map((card) => (
          <div
            key={card.title}
            className="ped-card"
            style={{ '--ped-bg': card.bg } as React.CSSProperties}
          >
            <div className="ped-card-icon">
              <card.icon size={28} strokeWidth={1.6} />
            </div>
            <h3 className="ped-card-title">{card.title}</h3>
            <p className="ped-card-text">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Dots navigazione — visibili solo su mobile */}
      <div className="ped-dots" aria-hidden="true">
        {cards.map((card, i) => (
          <button
            key={card.title}
            className={`ped-dot${i === activeIndex ? ' ped-dot--active' : ''}`}
            onClick={() => scrollToCard(i)}
            tabIndex={-1}
          />
        ))}
      </div>

      <p className="ped-notice">
        Non sottovalutare l&apos;importanza del <span className="ped-pill">pedigree</span>. Produrlo
        ha un costo sostenibile che non giustifica le differenze di prezzo che spesso vengono
        motivate con la sua assenza.
      </p>
    </section>
  )
}
