import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router'
import {
  HandHeart,
  ShieldAlert,
  Eye,
  MessageCircleHeart,
  PawPrint,
  Dna,
  HeartHandshake,
  CalendarClock,
} from 'lucide-react'

const cards = [
  {
    icon: HandHeart,
    title: 'Ti incontriamo di persona',
    text: 'Siamo contrari alla spedizione dei cuccioli. La consegna avviene esclusivamente di persona — ti invitiamo a venire a scegliere il cucciolo più affine a te.',
  },
  {
    icon: ShieldAlert,
    title: 'Scelta consapevole',
    text: 'Diffida dei prezzi stracciati online. Allevare con coscienza e serietà è un grande impegno fisico ed economico — rivolgiti a chi conosce e preserva lo standard di razza.',
  },
  {
    icon: Eye,
    title: 'Crescita sotto i nostri occhi',
    text: 'Non deleghiamo a nessuno la crescita dei nostri barboncini. Nascono, vengono svezzati e affrontano le fasi della crescita sotto la nostra attenta supervisione, con la madre e i fratelli.',
  },
  {
    icon: PawPrint,
    title: 'Un cucciolo pronto per la vita',
    text: 'Vogliamo consegnarti un cucciolo che sappia relazionarsi con altri cani e bambini, e che sia in grado di affrontare i piccoli fattori di stress che incontrerà nella sua vita.',
  },
  {
    icon: Dna,
    title: 'Test genetici sui riproduttori',
    text: 'Tutti i nostri riproduttori sono testati geneticamente per le principali patologie della razza: prcd-PRA e patella lux. La prevenzione parte dalla selezione.',
  },
  {
    icon: HeartHandshake,
    title: 'Accoppiamenti naturali',
    text: 'Favoriamo sempre la monta naturale per il benessere fisico ed emotivo dei nostri riproduttori. Ogni accoppiamento è una scelta ragionata, mai forzata.',
  },
  {
    icon: CalendarClock,
    title: 'Rispetto dei tempi',
    text: 'Tra una gravidanza e la successiva rispettiamo un intervallo minimo di un anno. Le nostre fattrici non sono macchine — sono parte della famiglia.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Sempre al tuo fianco',
    text: 'Anche dopo la cessione siamo sempre disponibili — consigli, supporto, esperienza. Il nostro rapporto con te non finisce con la consegna del cucciolo.',
  },
]

export default function FuturiPadroniSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // ── CSS entrance via IntersectionObserver ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('fp-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            section.classList.add('fp-entered')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-20% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // ── Mobile: track scroll per aggiornare dot attivo ──
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const onScroll = () => {
      const scrollLeft = grid.scrollLeft
      const cardWidth = grid.firstElementChild
        ? (grid.firstElementChild as HTMLElement).offsetWidth
        : 1
      const gap = 16 // 1rem
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
    <section className="fp-section" ref={sectionRef} aria-label="Ai futuri padroni">
      <div className="fp-header">
        <span className="fp-badge">Ai futuri padroni</span>
        <h2 className="fp-title">
          Scegliere con il cuore, <em className="fp-title-accent">decidere con coscienza.</em>
        </h2>
        <p className="fp-subtitle">
          Siamo attenti alla scelta delle famiglie quanto alla cura dei nostri barboncini. Ecco cosa
          ci sta a cuore.
        </p>
      </div>

      <div className="fp-grid" ref={gridRef}>
        {cards.map((card) => (
          <div key={card.title} className="fp-card">
            <div className="fp-card-icon">
              <card.icon size={20} strokeWidth={1.8} />
            </div>
            <h3 className="fp-card-title">{card.title}</h3>
            <p className="fp-card-text">{card.text}</p>
          </div>
        ))}
        <Link to="/contatti" className="fp-card fp-card--cta">
          <span className="fp-cta-label">Stai cercando il tuo cucciolo?</span>
          <span className="fp-cta-text">
            Raccontaci di te, della tua famiglia e del tuo stile di vita. Ci aiuterà a capire se uno
            dei nostri barboncini è quello giusto per te — e a guidarti nel percorso.
          </span>
          <span className="fp-cta-arrow-wrap">
            Scrivici{' '}
            <span className="fp-cta-arrow" aria-hidden="true">
              &rarr;
            </span>
          </span>
        </Link>
      </div>

      {/* Dots navigazione — visibili solo su mobile */}
      <div className="fp-dots" aria-hidden="true">
        {cards.map((card, i) => (
          <button
            key={card.title}
            className={`fp-dot${i === activeIndex ? ' fp-dot--active' : ''}`}
            onClick={() => scrollToCard(i)}
            tabIndex={-1}
          />
        ))}
      </div>
    </section>
  )
}
