import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GOOGLE_URL =
  'https://www.google.com/search?q=Allevamento+barboncini+toy+Maatilayla+Recensioni&tbm=lcl'

const MAX_CHARS = 150

const AVATAR_COLORS = [
  '#C8614A',
  '#6B8F71',
  '#5B7FA5',
  '#C4956A',
  '#8B6B9B',
  '#D4956A',
  '#5A8F8F',
  '#A0785A',
  '#7B8FB0',
  '#9B7B6B',
]

const reviews = [
  // ── Riga 1 ──
  {
    name: 'Valentina C.',
    text: "La mia esperienza con Layla e il suo allevamento è stata davvero incredibile! La professionalità, la serietà e la dedizione verso i loro cani sono gli elementi che caratterizzano l'intero allevamento. Ci hanno fornito fin da subito informazioni accurate e dettagliate su ogni cosa. Abbiamo acquistato una meravigliosa barboncina toy che ci sta regalando amore a non finire! Ha un carattere equilibrato, è educata e socievole, ricevamo complimenti da tutti!",
    row: 1,
  },
  {
    name: 'Alessia C.',
    text: 'Ho inviato una richiesta di informazioni e la signora Layla mi ha risposto subito e in maniera esaustiva. Non ha esitato a comunicarmi i costi senza buttare le mani avanti, senza ipocrisia e senza tutta la manfrina del pedigree e non pedigree. Mi ha piacevolmente colpita.',
    row: 1,
  },
  {
    name: 'Fiora V.',
    text: 'Se potessi dare più di 5 stelle lo farei. Sono stata 2 anni in lista di attesa ma ne è valsa la pena. Layla è una persona seria, onesta e sempre disponibile. I suoi cuccioli sono bellissimi. Infatti la mia cucciolotta è stupenda e dolcissima. Grazie Layla!',
    row: 1,
  },
  {
    name: 'Carmine B.',
    text: 'Cercando su internet un allevamento di barboncini toy, ho avuto la fortuna di trovare Maatilayla. Fin dal primo approccio a mezzo mail e dopo telefonicamente, ho avuto la sensazione di aver trovato il posto giusto per me. Layla è una persona seria, disponibile, paziente, competente e onesta. Il nostro cucciolo Simba è un vero splendore e si guadagna i complimenti ovunque lo portiamo. Non posso fare altro che consigliare Maatilayla!',
    row: 1,
  },
  {
    name: 'Lucrezia R.',
    text: "Mi sono rivolta all'allevamento Barboncini Maatilayla per adottare la mia piccola Ophelia. Ho trovato l'allevamento molto serio, professionale e accurato. Mi hanno accompagnata alla gestione del cane con molto amore e sensibilità. Layla è affettuosa, accogliente e pronta a dirimere qualsiasi dubbio o preoccupazione. Ophelia è splendida, affettuosa e già abituata a relazionarsi con altri animali. Lo consiglio vivamente!",
    row: 1,
  },
  // ── Riga 2 ──
  {
    name: 'Gaetano C.',
    text: 'Eccellente, super consigliato per preparazione, esperienza e amore nel fare questo lavoro. Per qualsiasi necessità o domanda pre e post affido troverete sempre disponibilità, gentilezza e competenza.',
    row: 2,
  },
  {
    name: 'Giuliano B.',
    text: 'Non la conosco ancora, ma sto leggendo le recensioni dopo aver visitato il vostro sito. Mi sembra che le opinioni siano più che ottime e questo mi fa molto piacere perché vuol dire che la professionalità e la serietà non passano inosservate.',
    row: 2,
  },
  {
    name: 'Virgilia V.',
    text: 'Tornassi indietro acquisterei altre 1000 volte da Layla. Una donna assolutamente disponibile. Appena la conosci, avverti subito il suo spessore dal punto di vista umano e professionale. Ama tutti gli animali e in particolare questa razza. Sky, ormai ha quasi 2 anni, è di una dolcezza infinita e anche un cane molto equilibrato. Se state cercando un barboncino, rivolgetevi a lei senza indugi!',
    row: 2,
  },
  {
    name: 'Liliana S.',
    text: "Ho acquistato un barboncino toy da Maatilayla e ho trovato una cortesia e disponibilità da parte di Layla che non ho mai ricevuto da nessuno. Fin dal primo giorno di vita del cucciolo, Layla mi ha aggiornato su tutto. Ho incontrato una professionalità incredibile e un'attenzione massima al livello sanitario nella cura e preparazione dei cuccioli. Consiglio vivamente a chiunque voglia acquistare un cucciolo di affidarsi a Layla!",
    row: 2,
  },
  {
    name: 'Giorgia G.',
    text: "Ho conosciuto Layla e il suo allevamento grazie a un'amica in comune. Tiene veramente ai suoi cuccioli e cani adulti che vivono in un ambiente sereno, amorevole e iperattento. Nel caso della razza del barboncino toy la trovi veramente una professionista che aggiunge anche il cuore in quello che fa. Grazie all'allevamento Maatilayla per averci dato una gioia immensa!",
    row: 2,
  },
]

const row1 = reviews.filter((r) => r.row === 1)
const row2 = reviews.filter((r) => r.row === 2)

function ReviewCard({ name, text, index }: { name: string; text: string; index: number }) {
  const truncated = text.length > MAX_CHARS
  const display = truncated ? text.slice(0, MAX_CHARS).trimEnd() + '…' : text
  const initial = name[0].toUpperCase()
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]

  return (
    <div className="tm-card">
      <div className="tm-card-top">
        <div className="tm-avatar" style={{ backgroundColor: color }} aria-hidden="true">
          {initial}
        </div>
        <span className="tm-name">{name}</span>
        <div className="tm-stars" aria-label="5 stelle su 5">
          {'★★★★★'.split('').map((s, i) => (
            <span key={i} className="tm-star">
              {s}
            </span>
          ))}
        </div>
      </div>
      <p className="tm-text">
        {display}
        {truncated && (
          <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className="tm-more">
            {' '}
            leggi di più
          </a>
        )}
      </p>
    </div>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  indexOffset = 0,
}: {
  items: typeof row1
  reverse?: boolean
  indexOffset?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Misura la distanza del primo duplicato e imposta CSS var
    const rafId = requestAnimationFrame(() => {
      const firstDupe = track.children[items.length] as HTMLElement
      if (!firstDupe) return
      const scrollDist = firstDupe.getBoundingClientRect().left - track.getBoundingClientRect().left
      if (scrollDist <= 0) return

      track.style.setProperty('--scroll-dist', `${-scrollDist}px`)
      if (reverse) {
        track.classList.add('tm-track--reverse')
        // Pre-posiziona il track all'offset del keyframe reverse (--scroll-dist)
        // Con 3 copie c'è contenuto sufficiente per coprire qualsiasi viewport
        track.style.transform = `translateX(${-scrollDist}px)`
      }

      // Se reduced motion, avvia subito senza entrata
      if (prefersReduced) track.classList.add('tm-track--active')
    })

    return () => {
      cancelAnimationFrame(rafId)
      if (track) {
        track.classList.remove('tm-track--active', 'tm-track--reverse')
        track.style.removeProperty('--scroll-dist')
        track.style.removeProperty('transform')
      }
    }
  }, [reverse, items.length])

  // Reverse: 3 copie per coprire il viewport anche con pre-offset
  const repeated = reverse ? [...items, ...items, ...items] : [...items, ...items]

  return (
    <div className="tm-row-wrapper">
      <div className="tm-track" ref={trackRef}>
        {repeated.map((r, i) => (
          <ReviewCard
            key={i}
            name={r.name}
            text={r.text}
            index={indexOffset + (i % items.length)}
          />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Entrata header: badge → titolo
      gsap.fromTo(
        [badgeRef.current, titleRef.current].filter(Boolean),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )

      // Entrata righe: direzione coerente con lo scroll del marquee
      // Riga 1 scorre verso SINISTRA → entra da DESTRA (xPercent positivo)
      // Riga 2 scorre verso DESTRA → entra da SINISTRA (xPercent negativo)
      const rows = rowRefs.current.filter(Boolean) as HTMLElement[]
      rows.forEach((row, i) => {
        const isReverse = i === 1
        const cards = row.querySelectorAll('.tm-card')

        // Card iniziano invisibili
        gsap.set(cards, { opacity: 0 })

        // Riga scorre dentro dalla direzione giusta — smooth con expo ease
        // Il marquee CSS parte a ~65% del tempo (quando expo.out ha già completato ~96% del movimento)
        // così la transizione entrata → scroll continuo è impercettibile
        let marqueeStarted = false
        gsap.fromTo(
          row,
          { xPercent: isReverse ? -30 : 30 },
          {
            xPercent: 0,
            duration: isReverse ? 2.0 : 1.8,
            ease: 'expo.out',
            delay: i * 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            onUpdate() {
              if (!marqueeStarted && this.progress() > 0.45) {
                marqueeStarted = true
                const track = row.querySelector('.tm-track')
                if (track) track.classList.add('tm-track--active')
              }
            },
          },
        )

        // Card appaiono con stagger dal lato d'ingresso — più graduale
        gsap.to(cards, {
          opacity: 1,
          duration: 0.7,
          stagger: { amount: 1, from: isReverse ? 'start' : 'end' },
          ease: 'power2.out',
          delay: i * 0.18,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="tm-section" ref={sectionRef} aria-label="Recensioni clienti">
      <div className="tm-header">
        <span className="tm-badge" ref={badgeRef}>
          Recensioni
        </span>
        <h2 className="tm-title" ref={titleRef}>
          Cosa dicono <em className="tm-title-accent">le famiglie</em>
        </h2>
      </div>

      <div className="tm-rows">
        <div
          ref={(el) => {
            rowRefs.current[0] = el
          }}
        >
          <MarqueeRow items={row1} />
        </div>
        <div
          ref={(el) => {
            rowRefs.current[1] = el
          }}
        >
          <MarqueeRow items={row2} reverse indexOffset={5} />
        </div>
      </div>
    </section>
  )
}
