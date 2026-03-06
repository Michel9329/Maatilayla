import { useEffect, useRef, Fragment } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINE1_WORDS = ['La', 'risposta', 'migliore']
const LINE2_WORDS = ['è', 'parlarne.']
const ACCENT_WORDS = new Set(['è', 'parlarne.'])

export default function FaqPageCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const badge = badgeRef.current
    const title = titleRef.current
    const body = bodyRef.current
    const cta = ctaRef.current
    if (!section || !badge || !title || !body || !cta) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    if (!isDesktop) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => section.classList.add('fpc-entered'))
          } else {
            section.classList.remove('fpc-entered')
          }
        },
        { threshold: 0, rootMargin: '-10% 0px' },
      )
      observer.observe(section)
      return () => observer.disconnect()
    }

    // Desktop: word-by-word entrance
    const wordEls = title.querySelectorAll<HTMLElement>('.fpc-word')

    gsap.set(badge, { opacity: 0, y: 24 })
    gsap.set(wordEls, { opacity: 0, y: 16 })
    gsap.set(body, { opacity: 0, y: 14 })
    gsap.set(cta, { opacity: 0, y: 10, scale: 0.97 })

    const tl = gsap.timeline({ paused: true })

    tl.to(badge, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .to(wordEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, '-=0.2')
      .to(body, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
      .to(cta, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')

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
        section.classList.add('fpc-entered')
        tl.restart()
      },
      onEnterBack: () => {
        if (leaveTimer) {
          clearTimeout(leaveTimer)
          leaveTimer = null
        }
        section.classList.add('fpc-entered')
        tl.restart()
      },
      onLeave: () => {
        leaveTimer = setTimeout(() => {
          section.classList.remove('fpc-entered')
          tl.pause(0)
        }, 200)
      },
      onLeaveBack: () => {
        leaveTimer = setTimeout(() => {
          section.classList.remove('fpc-entered')
          tl.pause(0)
        }, 200)
      },
    })

    ScrollTrigger.refresh()
    if (st.isActive) {
      section.classList.add('fpc-entered')
      tl.restart()
    }

    return () => {
      if (leaveTimer) clearTimeout(leaveTimer)
      tl.kill()
      st.kill()
    }
  }, [])

  return (
    <div className="fpc-wrap">
      <section
        className="fpc-section"
        ref={sectionRef}
        aria-label="Contattaci per qualsiasi dubbio"
      >
        <img
          src="/content/images/maatilayla-cta-faq-background.webp"
          alt="Barboncino toy fulvo sdraiato nell'erba — allevamento Maatilayla"
          loading="lazy"
          decoding="async"
          className="fpc-bg"
        />
        <div className="fpc-overlay" />
        <div className="fpc-content">
          <span className="fpc-badge" ref={badgeRef}>
            Contatti
          </span>
          <h2 className="fpc-title" ref={titleRef}>
            <span className="fpc-title-line">
              {LINE1_WORDS.map((word, i) => (
                <Fragment key={i}>
                  <span className="fpc-word">{word}</span>{' '}
                </Fragment>
              ))}
            </span>
            <span className="fpc-title-line">
              {LINE2_WORDS.map((word, i) => (
                <Fragment key={`l2-${i}`}>
                  <span className={`fpc-word${ACCENT_WORDS.has(word) ? ' fpc-word--accent' : ''}`}>
                    {ACCENT_WORDS.has(word) ? <em>{word}</em> : word}
                  </span>{' '}
                </Fragment>
              ))}
            </span>
          </h2>
          <p className="fpc-body" ref={bodyRef}>
            Se non hai trovato quello che cercavi, scrivici. Rispondiamo sempre con piacere, senza
            impegno.
          </p>
          <div className="fpc-cta" ref={ctaRef}>
            <Link to="/contatti" className="fpc-cta-btn">
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
