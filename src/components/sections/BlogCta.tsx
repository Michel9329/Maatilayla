import { useEffect, useRef, useMemo, Fragment } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE_TEXT = 'Dietro ogni articolo ci siamo noi.'
const ACCENT_WORDS = new Set(['ci', 'siamo', 'noi.'])

export default function BlogCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
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
            if (entry.isIntersecting) section.classList.add('bc-entered')
            else section.classList.remove('bc-entered')
          })
        },
        { threshold: 0, rootMargin: '-10% 0px' },
      )
      observer.observe(section)
      return () => observer.disconnect()
    }

    // Desktop: ScrollTrigger + GSAP word-by-word
    const wordEls = titleRef.current?.querySelectorAll<HTMLElement>('.bc-word') ?? []
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
        section.classList.add('bc-entered')
        tl.restart()
      },
      onEnterBack: () => {
        if (leaveTimer) {
          clearTimeout(leaveTimer)
          leaveTimer = null
        }
        section.classList.add('bc-entered')
        tl.restart()
      },
      onLeave: () => {
        leaveTimer = setTimeout(() => {
          section.classList.remove('bc-entered')
          tl.pause(0)
        }, 200)
      },
      onLeaveBack: () => {
        leaveTimer = setTimeout(() => {
          section.classList.remove('bc-entered')
          tl.pause(0)
        }, 200)
      },
    })

    ScrollTrigger.refresh()
    if (st.isActive) {
      section.classList.add('bc-entered')
      tl.restart()
    }

    return () => {
      if (leaveTimer) clearTimeout(leaveTimer)
      tl.kill()
      st.kill()
    }
  }, [])

  return (
    <div className="bc-wrap">
      <section className="bc-section" ref={sectionRef} aria-label="Scopri chi siamo">
        <div className="bc-content">
          <span className="bc-badge" ref={badgeRef}>
            Chi Siamo
          </span>
          <h2 className="bc-title" ref={titleRef}>
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className={`bc-word${ACCENT_WORDS.has(word) ? ' bc-word--accent' : ''}`}>
                  {ACCENT_WORDS.has(word) ? <em>{word}</em> : word}
                </span>{' '}
              </Fragment>
            ))}
          </h2>
          <p className="bc-body" ref={bodyRef}>
            Una famiglia, una filosofia e anni di dedizione. Scopri come alleviamo i nostri
            barboncini e perché
            <br />
            facciamo le cose in un certo modo.
          </p>
          <div className="bc-cta" ref={ctaRef}>
            <Link to="/chi-siamo" className="bc-cta-btn">
              Scopri chi siamo
            </Link>
          </div>
        </div>
        <img
          ref={imgRef}
          src="/content/images/maatilayla-cta-blog-barboncino-relax.webp"
          alt="Barboncino toy Maatilayla rilassato — vieni a conoscerci"
          loading="lazy"
          decoding="async"
          className="bc-bg"
        />
        <div className="bc-overlay" />
      </section>
    </div>
  )
}
