import { Fragment, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE_TEXT = 'Le risposte che cercavi.'
const ACCENT_WORDS = new Set(['cercavi.'])

export default function FaqCtaSection() {
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
    const badge = badgeRef.current
    const title = titleRef.current
    const body = bodyRef.current
    const cta = ctaRef.current
    if (!section || !img || !badge || !title || !body || !cta) return

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
      { yPercent: isDesktop ? -6 : -3 },
      { yPercent: isDesktop ? 6 : 3, ease: 'none' },
    )

    if (!isDesktop) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => section.classList.add('fq-entered'))
          } else {
            section.classList.remove('fq-entered')
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
    const wordEls = title.querySelectorAll<HTMLElement>('.fq-word')

    gsap.set(badge, { opacity: 0, y: 24 })
    gsap.set(wordEls, { opacity: 0, y: 16 })
    gsap.set(body, { opacity: 0, y: 14 })
    gsap.set(cta, { opacity: 0, y: 10, scale: 0.97 })

    const tl = gsap.timeline({ paused: true })

    tl.to(badge, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .to(wordEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, '-=0.2')
      .to(body, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
      .to(cta, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        section.classList.add('fq-entered')
        tl.restart()
      },
      onEnterBack: () => {
        section.classList.add('fq-entered')
        tl.restart()
      },
      onLeave: () => {
        tl.pause(0)
        section.classList.remove('fq-entered')
      },
      onLeaveBack: () => {
        tl.pause(0)
        section.classList.remove('fq-entered')
      },
    })

    return () => {
      parallaxTl.kill()
      tl.kill()
      st.kill()
    }
  }, [])

  return (
    <div className="fq-wrap">
      <section className="fq-section" ref={sectionRef} aria-label="Domande frequenti">
        <img
          ref={imgRef}
          src="/content/images/maatilayla-ginny-barboncino-toy-faq-cta.webp"
          alt="Ginny, barboncino toy fulvo nel giardino dell'allevamento Maatilayla"
          loading="lazy"
          decoding="async"
          className="fq-bg"
        />
        <div className="fq-content">
          <span className="fq-badge" ref={badgeRef}>
            F.A.Q.
          </span>
          <h2 className="fq-title" ref={titleRef}>
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className={`fq-word${ACCENT_WORDS.has(word) ? ' fq-word--accent' : ''}`}>
                  {ACCENT_WORDS.has(word) ? <em>{word}</em> : word}
                </span>{' '}
              </Fragment>
            ))}
          </h2>
          <p className="fq-body" ref={bodyRef}>
            Abbiamo raccolto le domande che ci vengono poste più spesso su cuccioli, pedigree,
            salute e adozione.
          </p>
          <div className="fq-cta" ref={ctaRef}>
            <Link to="/faq" className="fq-cta-btn">
              Leggi le F.A.Q.
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
