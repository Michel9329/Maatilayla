import { Fragment, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE_TEXT = 'Ogni cucciolo merita la famiglia giusta.'
const ACCENT_WORDS = new Set(['famiglia', 'giusta.'])

export default function ParallaxCtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const authorRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const words = useMemo(() => TITLE_TEXT.split(' '), [])

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    const badge = badgeRef.current
    const title = titleRef.current
    const body = bodyRef.current
    const author = authorRef.current
    const cta = ctaRef.current
    if (!section || !img || !badge || !title || !body || !author || !cta) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    // ── Parallax foto ──
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    })
    parallaxTl.fromTo(
      img,
      { yPercent: isDesktop ? -4 : -2 },
      { yPercent: isDesktop ? 4 : 2, ease: 'none' },
    )

    if (!isDesktop) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => section.classList.add('cine-entered'))
          } else {
            section.classList.remove('cine-entered')
          }
        },
        { threshold: 0, rootMargin: '-10% 0px' },
      )
      observer.observe(section)

      return () => {
        parallaxTl.kill()
        observer.disconnect()
      }
    }

    // ── Desktop: word-by-word entrance ──
    const wordEls = title.querySelectorAll<HTMLElement>('.cine-word')

    gsap.set(badge, { opacity: 0, y: 24 })
    gsap.set(wordEls, { opacity: 0, y: 16 })
    gsap.set(body, { opacity: 0, y: 14 })
    gsap.set(author, { opacity: 0, y: 10 })
    gsap.set(cta, { opacity: 0, y: 10, scale: 0.97 })

    const tl = gsap.timeline({ paused: true })

    tl.to(badge, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .to(wordEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, '-=0.2')
      .to(body, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
      .to(author, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.25')
      .to(cta, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        section.classList.add('cine-entered')
        tl.restart()
      },
      onEnterBack: () => {
        section.classList.add('cine-entered')
        tl.restart()
      },
      onLeave: () => {
        tl.pause(0)
        section.classList.remove('cine-entered')
      },
      onLeaveBack: () => {
        tl.pause(0)
        section.classList.remove('cine-entered')
      },
    })

    return () => {
      parallaxTl.kill()
      tl.kill()
      st.kill()
    }
  }, [])

  return (
    <div className="cine-wrap">
      <section
        className="cine-section"
        ref={sectionRef}
        aria-label="Il nostro impegno verso ogni cucciolo"
      >
        <div className="cine-img-wrap">
          <img
            ref={imgRef}
            src="/content/images/maatilayla-cuccioli-barboncino-toy-impegno.webp"
            alt="Cuccioli di barboncino toy dell'allevamento Maatilayla insieme"
            loading="lazy"
            decoding="async"
            className="cine-img"
          />
        </div>
        <div className="cine-content">
          <span className="cine-badge" ref={badgeRef}>
            Il nostro impegno
          </span>
          <h2 className="cine-title" ref={titleRef}>
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className={`cine-word${ACCENT_WORDS.has(word) ? ' cine-word--accent' : ''}`}>
                  {ACCENT_WORDS.has(word) ? <em>{word}</em> : word}
                </span>{' '}
              </Fragment>
            ))}
          </h2>
          <p className="cine-body" ref={bodyRef}>
            Non cerchiamo chi vuole un barboncino. Cerchiamo chi vuole <em>questo</em> barboncino —
            quello giusto per la tua vita, il tuo ritmo, la tua famiglia.
          </p>
          <span className="cine-author" ref={authorRef}>
            — Layla Zarfati, Addestratrice ENCI
          </span>
          <div className="cine-cta" ref={ctaRef}>
            <Link to="/contatti" className="cine-cta-btn">
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
