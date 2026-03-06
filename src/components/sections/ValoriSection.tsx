import { useEffect, useRef, useMemo, Fragment } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE_TEXT = 'Tre obiettivi. Tre valori. Una sola missione.'
const ACCENT_WORDS = new Set(['Una', 'sola', 'missione.'])

let _idx = 0
const groups = [
  {
    label: 'I Tre Obiettivi',
    pillars: [
      {
        image: '/content/images/maatilayla-cucciolo-barboncino-toy-visita-veterinaria.webp',
        imageAlt: 'Cucciolo di barboncino toy Maatilayla durante visita veterinaria',
        num: '01.',
        title: 'Cuccioli sani.',
        text: 'Prima di ogni accoppiamento, ogni riproduttore è sottoposto a controlli cardiologici e test per le principali patologie ereditarie. La salute non si può rimediare dopo — va garantita prima della nascita.',
        index: _idx++,
      },
      {
        image: '/content/images/maatilayla-barboncino-toy-prato-manto-lungo.webp',
        imageAlt: 'Barboncino toy fulvo con manto lungo nel prato — selezione Maatilayla',
        num: '02.',
        title: 'Cuccioli belli.',
        text: "Struttura corretta, tipologia di razza, pigmentazione coerente: nel barboncino, bello non è un'impressione soggettiva. Lo standard ENCI non è un limite — è la bussola che distingue una selezione consapevole dall'improvvisazione.",
        index: _idx++,
      },
      {
        image: '/content/images/maatilayla-cucciolo-barboncino-toy-socializzazione-famiglia.webp',
        imageAlt: 'Cucciolo di barboncino toy che cresce in famiglia — socializzazione Maatilayla',
        num: '03.',
        title: 'Cuccioli equilibrati.',
        text: 'La Tecnica Biosensor prevede stimolazioni sensoriali delicate nei primi giorni di vita, quando il sistema neurovegetativo è ancora in formazione. I cuccioli restano in famiglia fino a tre mesi: quel periodo è decisivo per lo sviluppo del carattere.',
        index: _idx++,
      },
    ],
  },
  {
    label: 'I Tre Valori',
    pillars: [
      {
        image: '/content/images/maatilayla-barboncino-toy-natura-riposo.webp',
        imageAlt: 'Barboncino toy Maatilayla a riposo nella natura',
        objectPosition: 'center 70%',
        num: '01.',
        title: 'Rispetto della natura.',
        text: "Tra una gravidanza e l'altra, almeno un anno di recupero completo per la fattrice. Forzare i ritmi biologici compromette la salute della madre e incide direttamente sulla qualità dei cuccioli nati.",
        index: _idx++,
      },
      {
        image: '/content/images/maatilayla-barboncino-toy-relax-sole.webp',
        imageAlt: 'Barboncino toy Maatilayla rilassato al sole in un ambiente sereno',
        num: '02.',
        title: 'Ambiente sereno.',
        text: 'Crescere a contatto con altri animali espone i cuccioli a stimoli variati in un contesto sicuro e familiare. Il risultato si legge nel carattere: meno reattività, maggiore apertura verso situazioni e ambienti nuovi.',
        index: _idx++,
      },
      {
        image: '/content/images/maatilayla-cuccioli-barboncino-toy-impegno.webp',
        imageAlt: 'Cuccioli di barboncino toy Maatilayla — punto di riferimento per le famiglie',
        num: '03.',
        title: 'Punto di riferimento.',
        text: "L'accompagnamento non si esaurisce con la consegna del cucciolo. Dubbi sul comportamento, domande veterinarie, aggiornamenti nel tempo: c'è sempre un punto di riferimento disponibile, anche dopo.",
        index: _idx++,
      },
    ],
  },
]

export default function ValoriSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const groupRefs = useRef<(HTMLDivElement | null)[]>([])

  const words = useMemo(() => TITLE_TEXT.split(' '), [])

  useEffect(() => {
    const container = containerRef.current
    const section = sectionRef.current
    if (!container || !section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      container.classList.add('vl-entered')
      groupRefs.current.filter(Boolean).forEach((el) => el!.classList.add('vl-group-entered'))
      return
    }

    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    if (!isDesktop) {
      // Mobile: CSS IntersectionObserver
      const observer = new IntersectionObserver(
        ([entry]) => {
          requestAnimationFrame(() => {
            if (entry.isIntersecting) {
              container.classList.add('vl-entered')
            } else {
              container.classList.remove('vl-entered')
            }
          })
        },
        { threshold: 0, rootMargin: '-10% 0px' },
      )
      observer.observe(container)

      const groupObserverMobile = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            requestAnimationFrame(() => {
              if (entry.isIntersecting) {
                ;(entry.target as HTMLElement).classList.add('vl-group-entered')
              } else {
                ;(entry.target as HTMLElement).classList.remove('vl-group-entered')
              }
            })
          })
        },
        { threshold: 0.15, rootMargin: '-8% 0px' },
      )
      groupRefs.current.filter(Boolean).forEach((el) => groupObserverMobile.observe(el!))

      return () => {
        observer.disconnect()
        groupObserverMobile.disconnect()
      }
    }

    // Desktop: word-by-word GSAP
    // Override CSS initial state (opacity:0, translate:0 24px)
    container.style.opacity = '1'
    container.style.translate = 'none'

    const wordEls = titleRef.current?.querySelectorAll<HTMLElement>('.vl-word') ?? []
    gsap.set(badgeRef.current, { opacity: 0, y: 24 })
    gsap.set(wordEls, { opacity: 0, y: 16 })
    gsap.set(introRef.current, { opacity: 0, y: 14 })

    const tl = gsap.timeline({ paused: true })
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .to(wordEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, '-=0.2')
      .to(introRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
      .call(() => container.classList.add('vl-entered'))

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
      onLeave: () => {
        tl.pause(0)
        container.classList.remove('vl-entered')
      },
      onLeaveBack: () => {
        tl.pause(0)
        container.classList.remove('vl-entered')
      },
    })

    // Observer indipendente per ogni gruppo card
    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          requestAnimationFrame(() => {
            if (entry.isIntersecting) {
              ;(entry.target as HTMLElement).classList.add('vl-group-entered')
            } else {
              ;(entry.target as HTMLElement).classList.remove('vl-group-entered')
            }
          })
        })
      },
      { threshold: 0.15, rootMargin: '-8% 0px' },
    )
    groupRefs.current.filter(Boolean).forEach((el) => groupObserver.observe(el!))

    return () => {
      tl.kill()
      st.kill()
      groupObserver.disconnect()
      container.style.opacity = ''
      container.style.translate = ''
    }
  }, [])

  return (
    <section id="filosofia" className="vl-section" ref={sectionRef} aria-label="I nostri valori">
      <div className="vl-container" ref={containerRef}>
        <div className="vl-header">
          <span className="vl-badge" ref={badgeRef}>
            Come allevo
          </span>
          <h2 className="vl-title" ref={titleRef}>
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className={`vl-word${ACCENT_WORDS.has(word) ? ' vl-word--accent' : ''}`}>
                  {ACCENT_WORDS.has(word) ? <em>{word}</em> : word}
                </span>{' '}
              </Fragment>
            ))}
          </h2>
          <p className="vl-intro" ref={introRef}>
            Dietro ogni cucciolo ci sono scelte precise — sulla salute, sulla selezione,
            sull'educazione. Niente è lasciato al caso, e ogni decisione ha una ragione che vale la
            pena conoscere.
          </p>
        </div>

        {groups.map((group, gi) => (
          <div
            key={group.label}
            className="vl-group"
            ref={(el) => {
              groupRefs.current[gi] = el
            }}
          >
            <span className="vl-group-label">{group.label}</span>
            <div className="vl-grid">
              {group.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="vl-card"
                  style={{ '--vl-i': pillar.index } as React.CSSProperties}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    className="vl-card-img"
                    loading="lazy"
                    decoding="async"
                    style={
                      pillar.objectPosition ? { objectPosition: pillar.objectPosition } : undefined
                    }
                  />
                  <div className="vl-card-body">
                    <span className="vl-card-num">{pillar.num}</span>
                    <h3 className="vl-card-title">{pillar.title}</h3>
                    <p className="vl-card-text">{pillar.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
