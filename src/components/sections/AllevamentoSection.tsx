import { useEffect, useRef } from 'react'
import { Heart, Shield, Stethoscope, FileCheck, Package, Dna } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Heart, label: '3 vaccinazioni e sverminazione' },
  { icon: Stethoscope, label: 'Ecocardiogramma certificato' },
  { icon: Dna, label: 'Test genetico prcd-PRA' },
  { icon: Dna, label: 'Test genetico patella lux' },
  { icon: Shield, label: 'Microchip + anagrafe canina' },
  { icon: FileCheck, label: 'Pedigree ENCI' },
  { icon: Package, label: 'Puppy Starter Kit' },
]

export default function AllevamentoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const block1Ref = useRef<HTMLDivElement>(null)
  const block2Ref = useRef<HTMLDivElement>(null)
  const b1Texts = useRef<(HTMLElement | null)[]>([])
  const b2Texts = useRef<(HTMLElement | null)[]>([])
  const img1Ref = useRef<HTMLDivElement>(null)
  const img2Ref = useRef<HTMLDivElement>(null)
  const calloutRef = useRef<HTMLDivElement>(null)
  const featRefs = useRef<(HTMLDivElement | null)[]>([])

  // ── CSS entrance via IntersectionObserver (compositor thread) ──
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Mostra tutto subito senza animazione
      block1Ref.current?.classList.add('allev-entered')
      block2Ref.current?.classList.add('allev-entered')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // rAF: da un frame al browser per preparare la transition
            requestAnimationFrame(() => {
              entry.target.classList.add('allev-entered')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '-12% 0px' },
    )

    if (block1Ref.current) observer.observe(block1Ref.current)
    if (block2Ref.current) observer.observe(block2Ref.current)

    return () => observer.disconnect()
  }, [])

  // ── Parallax foto (solo GSAP — scrub leggero, nessun conflitto) ──
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const img1 = img1Ref.current?.querySelector('img')
      if (img1 && block1Ref.current) {
        gsap.fromTo(
          img1,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            force3d: true,
            scrollTrigger: {
              trigger: block1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }
      const img2 = img2Ref.current?.querySelector('img')
      if (img2 && block2Ref.current) {
        gsap.fromTo(
          img2,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            force3d: true,
            scrollTrigger: {
              trigger: block2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="allev-section" ref={sectionRef} aria-label="Il nostro allevamento">
      {/* ── Blocco 1: Allevamento ── */}
      <div className="allev-block" ref={block1Ref}>
        <div className="allev-img" ref={img1Ref}>
          <img
            src="/content/images/maatilayla-cucciolo-barboncino-toy-rosso-prato.webp"
            alt="Cucciolo di barboncino toy rosso nel prato dell'allevamento Maatilayla"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="allev-content">
          <span
            className="allev-badge"
            ref={(el) => {
              b1Texts.current[0] = el
            }}
          >
            Il nostro approccio
          </span>
          <h2
            className="allev-title"
            ref={(el) => {
              b1Texts.current[1] = el
            }}
          >
            Cresciuti in famiglia, con <em className="allev-accent">dedizione e competenza.</em>
          </h2>
          <p
            className="allev-body"
            ref={(el) => {
              b1Texts.current[2] = el
            }}
          >
            Ogni barboncino toy nasce e cresce dentro casa nostra, a stretto contatto con tutta la
            famiglia. Fin dai primi giorni li esponiamo a stimoli mirati — tattili, sonori, sociali
            — perché sviluppino un carattere equilibrato e una socializzazione solida.
          </p>
          <p
            className="allev-body"
            ref={(el) => {
              b1Texts.current[3] = el
            }}
          >
            Le coccole e le cure quotidiane li abituano alla manipolazione: toelettatura e visite
            veterinarie non saranno mai fonte di stress. Li esponiamo ai rumori domestici —
            aspirapolvere, temporali, fuochi d'artificio — così da prevenire qualsiasi disagio
            comportamentale.
          </p>
          <p
            className="allev-body"
            ref={(el) => {
              b1Texts.current[4] = el
            }}
          >
            Appena possibile, attraverso una presentazione graduale, i cuccioli imparano a
            relazionarsi con animali di altre specie: il gatto di casa, la tartaruga, il coniglietto
            in giardino. Un percorso completo che forma barboncini sicuri e sereni.
          </p>
          <div
            className="allev-callout"
            ref={(el) => {
              b1Texts.current[5] = el
              calloutRef.current = el
            }}
          >
            <span className="allev-callout-label">Programma Biosensor</span>
            <p className="allev-callout-text">
              Sin dai primi giorni di vita applichiamo il protocollo americano di stimolazione
              neurologica precoce. Esercizi specifici di stimolazione tattile e sensoriale che
              producono cuccioli con un sistema immunitario più resistente, maggiore predisposizione
              alla socializzazione e una migliore capacità di apprendimento durante la crescita.
            </p>
          </div>
        </div>
      </div>

      {/* ── Blocco 2: Cuccioli ── */}
      <div className="allev-block allev-block--flip" ref={block2Ref}>
        <div className="allev-img" ref={img2Ref}>
          <img
            src="/content/images/maatilayla-cucciolo-barboncino-toy-corre-prato.webp"
            alt="Cucciolo di barboncino toy che corre nel prato dell'allevamento Maatilayla"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="allev-content">
          <span
            className="allev-badge"
            ref={(el) => {
              b2Texts.current[0] = el
            }}
          >
            Il grande passo
          </span>
          <h2
            className="allev-title"
            ref={(el) => {
              b2Texts.current[1] = el
            }}
          >
            Da Maatilayla a casa tua,
            <br />
            <em className="allev-accent">un cucciolo pronto per te.</em>
          </h2>
          <p
            className="allev-body"
            ref={(el) => {
              b2Texts.current[2] = el
            }}
          >
            I nostri barboncini restano in allevamento fino al compimento del terzo mese di vita.
            Questo tempo con la mamma e i fratelli è essenziale: imprinting corretto verso simili e
            umani, inibizione al morso, rispetto degli spazi. Insegnamenti che solo la madre può
            dare.
          </p>
          <p
            className="allev-body"
            ref={(el) => {
              b2Texts.current[3] = el
            }}
          >
            Prima della cessione, ogni cucciolo viene vaccinato, sverminato e trattato con
            antiparassitari. Un cardiologo veterinario esegue visita cardiologica completa con
            ecocardiogramma, e il medico veterinario rilascia il certificato di buona salute.
          </p>
          <p
            className="allev-body"
            ref={(el) => {
              b2Texts.current[4] = el
            }}
          >
            Con l'applicazione del microchip completiamo l'iscrizione all'anagrafe canina e le
            pratiche per il pedigree ENCI. A corredo, il Puppy Starter Kit con tutto il necessario
            per accogliere il cucciolo nella sua nuova casa.
          </p>
          <p
            className="allev-body allev-body--em"
            ref={(el) => {
              b2Texts.current[5] = el
            }}
          >
            Crescerli in famiglia ci permette di conoscere l'indole di ognuno — il fattore decisivo
            per consigliare il cucciolo giusto alla persona giusta.
          </p>
          <div className="allev-features">
            {features.map((feat, i) => (
              <div
                key={feat.label}
                className="allev-feat"
                ref={(el) => {
                  featRefs.current[i] = el
                }}
              >
                <div className="allev-feat-icon">
                  <feat.icon size={16} strokeWidth={2} />
                </div>
                <span className="allev-feat-label">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
