import { useEffect, useRef, useMemo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE_TEXT = 'Vuoi saperne di piu?'
const ACCENT_WORDS = new Set(['piu?'])

export default function ArticleCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const words = useMemo(() => TITLE_TEXT.split(' '), [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !window.matchMedia('(min-width: 768px)').matches) {
      // Mobile / reduced-motion: IntersectionObserver CSS fade
      const observer = new IntersectionObserver(
        ([entry]) => {
          requestAnimationFrame(() => {
            if (entry.isIntersecting) section.classList.add('ac-entered')
            else section.classList.remove('ac-entered')
          })
        },
        { threshold: 0, rootMargin: '-10% 0px' },
      )
      observer.observe(section)
      return () => observer.disconnect()
    }

    // Desktop: ScrollTrigger + GSAP word-by-word
    const wordEls = titleRef.current?.querySelectorAll<HTMLElement>('.ac-word') ?? []
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

    let leaveTimer: ReturnType<typeof setTimeout> | null = null

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom -10%',
      onEnter: () => {
        if (leaveTimer) {
          clearTimeout(leaveTimer)
          leaveTimer = null
        }
        section.classList.add('ac-entered')
        tl.restart()
      },
      onEnterBack: () => {
        if (leaveTimer) {
          clearTimeout(leaveTimer)
          leaveTimer = null
        }
        section.classList.add('ac-entered')
        tl.restart()
      },
      onLeave: () => {
        leaveTimer = setTimeout(() => {
          section.classList.remove('ac-entered')
          tl.pause(0)
        }, 200)
      },
      onLeaveBack: () => {
        leaveTimer = setTimeout(() => {
          section.classList.remove('ac-entered')
          tl.pause(0)
        }, 200)
      },
    })

    ScrollTrigger.refresh()
    if (st.isActive) {
      section.classList.add('ac-entered')
      tl.restart()
    }

    return () => {
      if (leaveTimer) clearTimeout(leaveTimer)
      tl.kill()
      st.kill()
    }
  }, [])

  return (
    <div className="ac-wrap">
      <section className="ac-section" ref={sectionRef} aria-label="Contattaci per informazioni">
        <div className="ac-content">
          <span className="ac-badge" ref={badgeRef}>
            Contatti
          </span>
          <h2 className="ac-title" ref={titleRef}>
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className={`ac-word${ACCENT_WORDS.has(word) ? ' ac-word--accent' : ''}`}>
                  {ACCENT_WORDS.has(word) ? <em>{word}</em> : word}
                </span>{' '}
              </Fragment>
            ))}
          </h2>
          <p className="ac-body" ref={bodyRef}>
            Siamo sempre disponibili per rispondere alle tue domande sui nostri barboncini toy.
          </p>
          <div className="ac-cta" ref={ctaRef}>
            <Link to="/contatti" className="ac-cta-btn">
              Contattaci
            </Link>
          </div>
        </div>
        <img
          src="/content/images/maatilayla-cuccioli-barboncino-toy-impegno.webp"
          alt="Cuccioli barboncino toy Maatilayla — contattaci"
          loading="lazy"
          decoding="async"
          className="ac-bg"
        />
        <div className="ac-overlay" />
      </section>
    </div>
  )
}
