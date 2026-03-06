import { useEffect, useRef, Fragment } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REGULAR_WORDS = 'Una barbona fulva'.split(' ')

export default function StoriaLaylaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const body1Ref = useRef<HTMLParagraphElement>(null)
  const body2Ref = useRef<HTMLParagraphElement>(null)
  const body3Ref = useRef<HTMLParagraphElement>(null)
  const calloutRef = useRef<HTMLQuoteElement>(null)

  useEffect(() => {
    const block = blockRef.current
    const section = sectionRef.current
    if (!block || !section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      block.classList.add('ls-entered')
      return
    }

    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    if (!isDesktop) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestAnimationFrame(() => entry.target.classList.add('ls-entered'))
            } else {
              entry.target.classList.remove('ls-entered')
            }
          })
        },
        { threshold: 0, rootMargin: '-12% 0px' },
      )
      observer.observe(block)
      return () => observer.disconnect()
    }

    // Desktop: GSAP
    block.style.opacity = '1'
    block.style.translate = 'none'

    const wordEls = titleRef.current?.querySelectorAll<HTMLElement>('.ls-word') ?? []

    gsap.set(imgRef.current, { opacity: 0 })
    gsap.set(badgeRef.current, { opacity: 0, y: 20 })
    gsap.set(wordEls, { opacity: 0, y: 18 })
    gsap.set([body1Ref.current, body2Ref.current, body3Ref.current], { opacity: 0, y: 14 })
    gsap.set(calloutRef.current, { opacity: 0, y: 10 })

    const tl = gsap.timeline({ paused: true })
    tl.to(imgRef.current, { opacity: 1, duration: 0.9, ease: 'power2.out' })
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.6')
      .to(wordEls, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out' }, '-=0.3')
      .to(
        [body1Ref.current, body2Ref.current, body3Ref.current],
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
        '-=0.2',
      )
      .to(calloutRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.15')

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
      tl.kill()
      st.kill()
      block.style.opacity = ''
      block.style.translate = ''
    }
  }, [])

  return (
    <section className="ls-section" ref={sectionRef} aria-label="La storia di Maatilayla">
      <div className="ls-block" ref={blockRef}>
        <div className="ls-img" ref={imgRef}>
          <img
            src="/content/images/maatilayla-layla-zarfati-portrait.webp"
            alt="Layla Zarfati, fondatrice dell'allevamento Maatilayla barboncini toy"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>

        <div className="ls-content">
          <span className="ls-badge" ref={badgeRef}>
            Come tutto è iniziato
          </span>

          <h2 className="ls-title" ref={titleRef}>
            {REGULAR_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span className="ls-word">{word}</span>{' '}
              </Fragment>
            ))}
            <em className="ls-accent ls-word">ha cambiato tutto.</em>
          </h2>

          <p className="ls-body" ref={body1Ref}>
            Jolie — una barboncina fulva ancora cucciolona — ci fu affidata da cari amici per un
            paio di settimane. La mattina seguente me la ritrovai accanto al letto, raggomitolata
            sul pavimento freddo e duro, pur di non stare sola nella cuccetta morbida che le avevo
            sistemato in salone. E poi, rientrando dal lavoro, i miei cani che mi salutavano senza
            troppo entusiasmo — e lei invece che iniziava a saltare facendo piroette, come fossi io
            la sua padroncina.
          </p>

          <p className="ls-body" ref={body2Ref}>
            Un cane diverso. Difficile spiegarlo: non devi parlarle perché già sa quello che stai
            per dire. Ti guarda e <em>lo senti</em> — è lì con te, sempre. Il giorno che i nostri
            amici tornarono a riprendersi Jolie, la lasciai a casa con mio marito ad aspettarli. Io
            vagabondai sola in macchina fino a quando non se ne andarono, con la speranza — o forse
            la presunzione — che lei non fosse voluta tornare. Ovviamente non andò così: Jolie fu
            felicissima di rivederli e se ne andò via scodinzolando.
          </p>

          <p className="ls-body" ref={body3Ref}>
            Fu così che, stregata da quella barbona, mi misi alla ricerca di una simil-Jolie. Una
            ricerca durata oltre due anni, con il dubbio che forse non ne avrei trovata un'altra
            come lei. Invece non solo la trovai: ebbi la conferma che il barboncino toy è un
            concentrato di tutto il meglio, il bello e il buono che un cane possa offrire a chi gli
            apre il proprio cuore.
          </p>

          <blockquote className="ls-callout" ref={calloutRef}>
            Jolie non è tornata con me — ma in un certo senso non è mai andata via. È lei la ragione
            per cui Maatilayla esiste.
            <a
              href="#cani-vita"
              className="ls-callout-link"
              onClick={(e) => {
                e.preventDefault()
                import('../../lib/lenis').then(({ scrollToHash }) => scrollToHash('#cani-vita'))
              }}
            >
              Tutti i cani della mia vita <span aria-hidden="true">&#8594;</span>
            </a>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
