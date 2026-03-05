import { useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE_TEXT = 'Inizia la tua storia con noi.'
const ACCENT_WORDS = new Set(['storia'])

export default function ChiSiamoCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const words = useMemo(() => TITLE_TEXT.split(' '), [])

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Parallax foto
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    })
    parallaxTl.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none' })

    if (prefersReduced || !window.matchMedia('(min-width: 768px)').matches) {
      // Mobile: IntersectionObserver CSS
      const observer = new IntersectionObserver(
        ([entry]) => {
          requestAnimationFrame(() => {
            if (entry.isIntersecting) section.classList.add('cs-entered')
            else section.classList.remove('cs-entered')
          })
        },
        { threshold: 0, rootMargin: '-10% 0px' },
      )
      observer.observe(section)
      return () => {
        parallaxTl.kill()
        observer.disconnect()
      }
    }

    // Desktop: word-by-word GSAP (pattern FaqCtaSection)
    const wordEls = titleRef.current?.querySelectorAll<HTMLElement>('.cs-word') ?? []
    gsap.set(badgeRef.current, { opacity: 0, y: 24 })
    gsap.set(wordEls, { opacity: 0, y: 16 })
    gsap.set(bodyRef.current, { opacity: 0, y: 14 })
    gsap.set(ctaRef.current, { opacity: 0, y: 10, scale: 0.97 })

    const tl = gsap.timeline({ paused: true })
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .to(wordEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, '-=0.2')
      .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' },
        '-=0.2',
      )

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
      onLeave: () => tl.pause(0),
      onLeaveBack: () => tl.pause(0),
    })

    return () => {
      parallaxTl.kill()
      tl.kill()
      st.kill()
    }
  }, [])

  return (
    <section className="cs-section" ref={sectionRef} aria-label="Contattaci">
      <img
        ref={imgRef}
        src="/content/images/maatilayla-cuccioli-barboncino-toy-cta.webp"
        alt="Cuccioli di barboncino toy dell'allevamento Maatilayla pronti per la nuova famiglia"
        loading="lazy"
        decoding="async"
        className="cs-bg"
      />
      <div className="cs-content">
        <span className="cs-badge" ref={badgeRef}>
          Contattaci
        </span>
        <h2 className="cs-title" ref={titleRef}>
          {words.map((word, i) => (
            <span key={i} className={`cs-word${ACCENT_WORDS.has(word) ? ' cs-word--accent' : ''}`}>
              {ACCENT_WORDS.has(word) ? <em>{word}</em> : word}
            </span>
          ))}
        </h2>
        <p className="cs-body" ref={bodyRef}>
          Ogni cucciolo Maatilayla trova la famiglia giusta. Scrivici: ti raccontiamo chi siamo,
          come lavoriamo e come puoi prenotare il tuo barboncino toy.
        </p>
        <div className="cs-cta" ref={ctaRef}>
          <Link to="/contatti" className="cs-cta-btn">
            Scrivici
          </Link>
        </div>
      </div>
    </section>
  )
}
