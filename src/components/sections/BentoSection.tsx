import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const caratteristiche = [
  {
    titolo: 'Intelligenza',
    testo:
      "Tra le razze più intelligenti al mondo. Apprende con entusiasmo e si adatta facilmente a ogni attività, dal semplice gioco all'addestramento avanzato.",
  },
  {
    titolo: 'Devozione',
    testo:
      'Sviluppa legami profondi con la famiglia. La motivazione affiliativa si traduce in un affetto autentico, stabile e duraturo per tutta la vita.',
  },
  {
    titolo: 'Socialità',
    testo:
      'Si trova a suo agio con persone, bambini e altri cani. La motivazione sociale interspecifica lo rende ideale in qualsiasi contesto di vita.',
  },
  {
    titolo: 'Versatilità',
    testo:
      "Dall'appartamento in città alla natura aperta: si adatta con serenità a ogni stile di vita, sempre allegro e in perfetto equilibrio.",
  },
  {
    titolo: 'Equilibrio',
    testo:
      'Con la giusta socializzazione sviluppa un carattere sereno e mai ansioso. Un compagno stabile, affidabile e pieno di energia positiva.',
  },
  {
    titolo: 'Ipoallergenico',
    testo:
      'Privo di sottopelo, il mantello riccio del barboncino non fa cadere peli e produce pochissimi allergeni. Una scelta ideale per chi soffre di allergie o vuole una casa più pulita.',
  },
]

const fotoSlides = [
  {
    src: '/content/images/maatilayla-cucciolo-barboncino-toy-rosso-prato.webp',
    alt: 'Cucciolo di barboncino toy rosso riccio Maatilayla sul prato',
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-sdraiato-erba.webp',
    alt: "Barboncino toy fulvo Maatilayla sdraiato sull'erba con il manto riccio",
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-sorridente-sedia.webp',
    alt: 'Barboncino toy fulvo Maatilayla sorridente sulla sedia da giardino con la lingua di fuori',
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-gioca-erba.webp',
    alt: "Barboncino toy rosso Maatilayla che gioca sull'erba con la lingua di fuori",
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-rosso-dinamico.webp',
    alt: 'Barboncino toy rosso Maatilayla in movimento, espressione vivace',
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-relax-sole.webp',
    alt: 'Barboncino toy fulvo rosso Maatilayla disteso al sole su una sedia da giardino',
  },
]

// Accetta direttamente lo slide element — anima titolo e testo con clip-path
function revealCharsSlide(slideEl: Element) {
  const els = Array.from(slideEl.querySelectorAll('.bento-char-title, .bento-char-text'))
  if (!els.length) return
  gsap.fromTo(
    els,
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.65, stagger: 0.12, ease: 'power3.out' },
  )
}

// Nasconde il testo di uno slide immediatamente (prima della transizione Swiper)
function hideCharsSlide(slideEl: Element) {
  const els = slideEl.querySelectorAll('.bento-char-title, .bento-char-text')
  gsap.set(els, { clipPath: 'inset(0 100% 0 0)' })
}

export default function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const heroChildRefs = useRef<(HTMLElement | null)[]>([])
  const charCardRef = useRef<HTMLDivElement>(null)
  const charSwiperRef = useRef<SwiperType | null>(null)

  // ── Hover tilt 3D — React handlers, gsap.to con overwrite ──
  // perspective: 900px è sul parent .bento-grid (CSS)
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const card = e.currentTarget
    const { left, top, width, height } = card.getBoundingClientRect()
    const dx = (e.clientX - (left + width / 2)) / (width / 2)
    const dy = (e.clientY - (top + height / 2)) / (height / 2)
    gsap.to(card, {
      rotateX: -dy * 4,
      rotateY: dx * 4,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.2,
      ease: 'expo.out',
      overwrite: 'auto',
    })
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Nascondi subito tutto il testo chars — verrà rivelato da ScrollTrigger
    if (charCardRef.current) {
      const allTexts = charCardRef.current.querySelectorAll('.bento-char-title, .bento-char-text')
      gsap.set(allTexts, { clipPath: 'inset(0 100% 0 0)' })
    }

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[]

      // Top cards (hero + photos): entrata quando la sezione entra
      const topCards = cards.slice(0, 2)
      gsap.fromTo(
        topCards,
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )

      // Bottom cards (caratteristiche + CTA): entrata individuale quando ciascuna card entra nel viewport
      const bottomCards = cards.slice(2)
      bottomCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          },
        )
      })

      // Children stagger nella hero card: badge → h2 → p1 → p2
      const heroChildren = heroChildRefs.current.filter(Boolean) as HTMLElement[]
      gsap.fromTo(
        heroChildren,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.13,
          ease: 'power3.out',
          delay: 0.44,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )

      // Reveal testo chars slide quando la card caratteristiche entra nel viewport
      if (charCardRef.current) {
        const charCard = charCardRef.current
        ScrollTrigger.create({
          trigger: charCard,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            const activeSlide = charCard.querySelector('.swiper-slide-active')
            if (activeSlide) revealCharsSlide(activeSlide)
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section className="bento-section" ref={sectionRef} aria-label="Il Barboncino Toy">
      <div className="bento-grid">
        {/* ── Top left: Hero card testo ── */}
        <div
          className="bento-card bento-card--hero"
          ref={(el) => {
            cardRefs.current[0] = el
          }}
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
        >
          <span
            className="bento-badge"
            ref={(el) => {
              heroChildRefs.current[0] = el
            }}
          >
            Il Barbone Toy
          </span>
          <h2
            className="bento-hero-title"
            ref={(el) => {
              heroChildRefs.current[1] = el
            }}
          >
            Una razza <em className="bento-hero-accent">fuori dall'ordinario.</em>
          </h2>
          <p
            className="bento-hero-text"
            ref={(el) => {
              heroChildRefs.current[2] = el
            }}
          >
            Il Barbone Toy porta con sé secoli di storia. Discendente del Barbet — cane da caccia e
            recupero in acqua — ha attraversato circhi, corti nobiliari e rivoluzioni senza perdere
            un grammo del suo carattere.
          </p>
          <p
            className="bento-hero-text bento-hero-text--muted"
            ref={(el) => {
              heroChildRefs.current[3] = el
            }}
          >
            Tra le razze più intelligenti secondo l'ENCI e la FCI, il barboncino toy si distingue
            per la motivazione collaborativa: non impara per dovere, impara perché stare con te è,
            semplicemente, quello che vuole.
          </p>
        </div>

        {/* ── Top right: Photo slider ── */}
        <div
          className="bento-card bento-card--photos"
          ref={(el) => {
            cardRefs.current[1] = el
          }}
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={900}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            className="bento-swiper-photos"
          >
            {fotoSlides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="bento-photo-slide">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="bento-photo-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Bottom left: Slider caratteristiche ── */}
        <div
          className="bento-card bento-card--caratteristiche"
          ref={(el) => {
            cardRefs.current[2] = el
            charCardRef.current = el
          }}
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
        >
          {/* Header: badge + frecce navigazione */}
          <div className="bento-chars-header">
            <span className="bento-badge">Caratteristiche</span>
            <div className="bento-chars-nav">
              <button
                className="bento-chars-arrow"
                onClick={() => charSwiperRef.current?.slidePrev()}
                aria-label="Caratteristica precedente"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="bento-chars-arrow"
                onClick={() => charSwiperRef.current?.slideNext()}
                aria-label="Caratteristica successiva"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            className="bento-swiper-chars"
            onSwiper={(swiper) => {
              charSwiperRef.current = swiper
            }}
            onSlideChangeTransitionStart={(swiper) => {
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
              // Nasconde immediatamente il testo della slide entrante prima della transizione
              const incomingSlide = swiper.slides[swiper.activeIndex]
              if (incomingSlide) hideCharsSlide(incomingSlide)
            }}
            onSlideChangeTransitionEnd={(swiper) => {
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
              const activeSlide = swiper.slides[swiper.activeIndex]
              if (activeSlide) revealCharsSlide(activeSlide)
            }}
          >
            {caratteristiche.map((car) => (
              <SwiperSlide key={car.titolo}>
                <div className="bento-char-slide">
                  <h3 className="bento-char-title">{car.titolo}</h3>
                  <p className="bento-char-text">{car.testo}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Bottom right: CTA ── */}
        <div
          className="bento-card bento-card--cta"
          ref={(el) => {
            cardRefs.current[3] = el
          }}
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
        >
          <div className="bento-cta-inner">
            <h3 className="bento-cta-title">
              C'è un motivo se <em className="bento-cta-highlight">ti ha scelto.</em>
            </h3>
            <p className="bento-cta-text">
              Non la solita scheda razza. Il barbone che ti segue ovunque, che sa già cosa stai per
              dire — e che, una volta entrato nella tua vita, non vorresti più lasciar andare.
              Scopri cosa lo rende unico tra tutte le razze da compagnia.
            </p>
            <Link to="/il-barbone" className="btn-bento-cta-ghost">
              Leggi di più <ArrowRight size={13} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
