import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router'

const articles = [
  {
    title: 'Controlli? Sì, grazie!',
    date: '24 Maggio 2023',
    category: 'Allevamento',
    excerpt:
      'Perché sottoporsi ai controlli sanitari e genetici è un atto di responsabilità verso i cuccioli e le famiglie che li accoglieranno.',
    image: '/content/images/maatilayla-barboncino-toy-prato-manto-lungo.webp',
    alt: "Barboncino toy fulvo con manto lungo nel prato dell'allevamento Maatilayla",
  },
  {
    title: 'Quando a volte tornano',
    date: '9 Novembre 2022',
    category: 'Storie',
    excerpt:
      'Capita che un cucciolo torni in allevamento. Non è un fallimento, è un atto di amore — e noi siamo sempre pronti ad accoglierli.',
    image: '/content/images/maatilayla-barboncino-toy-coppia-prato.webp',
    alt: "Coppia di barboncini toy nel prato dell'allevamento Maatilayla",
  },
  {
    title: 'Chi alleva, alleva tutto',
    date: '23 Novembre 2021',
    category: 'Riflessioni',
    excerpt:
      'Allevare non significa solo far nascere cuccioli. Significa prendersi cura di ogni aspetto: salute, socializzazione, benessere emotivo.',
    image: '/content/images/maatilayla-barboncino-toy-rilassato-sedia.webp',
    alt: 'Barboncino toy di Maatilayla rilassato su una sedia',
  },
  {
    title: 'Facciamo fare il cane al cane',
    date: '27 Agosto 2021',
    category: 'Educazione',
    excerpt:
      "Lasciamo che i nostri barboncini vivano come cani: correre, annusare, sporcarsi. La libertà di essere se stessi è il primo passo verso l'equilibrio.",
    image: '/content/images/maatilayla-barboncino-toy-sdraiato-erba.webp',
    alt: "Barboncino toy di Maatilayla sdraiato sull'erba",
  },
  {
    title: 'Per una zampata di fango',
    date: '23 Aprile 2021',
    category: 'Vita quotidiana',
    excerpt:
      "Un barboncino che gioca nel fango è un barboncino felice. Dietro ogni zampa sporca c'è un momento di pura gioia.",
    image: '/content/images/maatilayla-barboncino-toy-sorridente-sedia.webp',
    alt: 'Barboncino toy di Maatilayla sorridente su una sedia',
  },
  {
    title: 'Pandemia sei tutta mia',
    date: '22 Gennaio 2021',
    category: 'Riflessioni',
    excerpt:
      'La pandemia ha cambiato il rapporto con i nostri animali. Più tempo insieme, più consapevolezza — ma anche nuove sfide da affrontare.',
    image: '/content/images/maatilayla-barboncino-toy-gioca-erba.webp',
    alt: "Barboncino toy di Maatilayla che gioca nell'erba",
  },
]

export default function BlogPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // ── Keyboard navigation ──
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const track = trackRef.current
    if (!track) return
    const step = 320
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      track.scrollBy({ left: step, behavior: 'smooth' })
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      track.scrollBy({ left: -step, behavior: 'smooth' })
    }
  }, [])

  // ── CSS entrance via IntersectionObserver (compositor thread) ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('bp-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('bp-entered')
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-20% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // ── Drag-to-scroll + progress + fade (native listeners) ──
  useEffect(() => {
    const track = trackRef.current
    const fill = progressRef.current
    const fade = fadeRef.current
    if (!track || !fill) return

    let isDragging = false
    let startX = 0
    let scrollStart = 0

    const updateProgress = () => {
      const max = track.scrollWidth - track.clientWidth
      const ratio = max > 0 ? track.scrollLeft / max : 0
      const scale = 0.12 + ratio * 0.88
      fill.style.transform = `scaleX(${scale})`
      if (fade) fade.style.opacity = ratio > 0.92 ? '0' : '1'
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.pageX
      scrollStart = track.scrollLeft
      track.style.cursor = 'grabbing'
      track.style.scrollSnapType = 'none'
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      track.scrollLeft = scrollStart - (e.pageX - startX)
    }

    const stopDrag = () => {
      if (!isDragging) return
      isDragging = false
      track.style.cursor = ''
      setTimeout(() => {
        track.style.scrollSnapType = ''
      }, 100)
    }

    track.addEventListener('scroll', updateProgress, { passive: true })
    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    track.addEventListener('mouseleave', stopDrag)

    updateProgress()

    return () => {
      track.removeEventListener('scroll', updateProgress)
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      track.removeEventListener('mouseleave', stopDrag)
    }
  }, [])

  return (
    <section className="bp-section" ref={sectionRef} aria-label="Anteprima blog">
      <div className="bp-header">
        <span className="bp-badge">Dal Blog</span>
        <h2 className="bp-title">
          Storie dall&rsquo;allevamento,{' '}
          <em className="bp-title-accent">tra cuore e competenza.</em>
        </h2>
        <div className="bp-subtitle-row">
          <p className="bp-subtitle">
            Riflessioni, esperienze e consigli pratici dal nostro quotidiano con i barboncini toy
            dell'allevamento.
          </p>
          <Link to="/blog" className="bp-header-link">
            Tutti gli articoli{' '}
            <span className="bp-header-link-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      <div className="bp-track-wrapper">
        <div
          className="bp-track"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Articoli del blog, scorri orizzontalmente"
          onKeyDown={onKeyDown}
        >
          {articles.map((article) => (
            <article key={article.title} className="bp-card">
              <div className="bp-card-img">
                <img src={article.image} alt={article.alt} loading="lazy" decoding="async" />
              </div>
              <div className="bp-card-body">
                <div className="bp-card-meta">
                  <span className="bp-card-category">{article.category}</span>
                  <span className="bp-card-date">{article.date}</span>
                </div>
                <h3 className="bp-card-title">{article.title}</h3>
                <p className="bp-card-excerpt">{article.excerpt}</p>
                <Link to="/blog" className="bp-card-link">
                  Leggi articolo{' '}
                  <span className="bp-card-link-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="bp-fade" ref={fadeRef} aria-hidden="true" />
      </div>

      <div className="bp-progress">
        <div className="bp-progress-fill" ref={progressRef} />
      </div>
    </section>
  )
}
