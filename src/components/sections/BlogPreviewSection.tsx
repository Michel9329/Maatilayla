import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router'
import { blogPreviewArticles } from '@/data/blogArticles'

export default function BlogPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

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
        } else {
          section.classList.remove('bp-entered')
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

    // Thumb = proporzione visibile del contenuto
    const thumbRatio = track.clientWidth / track.scrollWidth
    const thumbPct = Math.max(thumbRatio * 100, 20) // min 20%
    fill.style.width = `${thumbPct}%`

    const updateProgress = () => {
      const max = track.scrollWidth - track.clientWidth
      const ratio = max > 0 ? track.scrollLeft / max : 0
      const travel = 100 - thumbPct
      fill.style.transform = `translateX(${ratio * (travel / thumbPct) * 100}%)`
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

    // ── Drag sulla scrollbar ──
    const bar = progressBarRef.current
    let isBarDragging = false
    let barStartX = 0
    let barScrollStart = 0

    const onBarDown = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      isBarDragging = true
      barStartX = e.clientX
      barScrollStart = track.scrollLeft
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    const onBarMove = (e: MouseEvent) => {
      if (!isBarDragging || !bar) return
      const barWidth = bar.clientWidth
      const dx = e.clientX - barStartX
      const max = track.scrollWidth - track.clientWidth
      track.scrollLeft = barScrollStart + (dx / barWidth) * max
    }

    const stopBarDrag = () => {
      if (!isBarDragging) return
      isBarDragging = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    // Click sulla barra (non sul thumb) → salta a quel punto
    const onBarClick = (e: MouseEvent) => {
      if (!bar || e.target === fill) return
      const rect = bar.getBoundingClientRect()
      const ratio = (e.clientX - rect.left) / rect.width
      const max = track.scrollWidth - track.clientWidth
      track.scrollTo({ left: ratio * max, behavior: 'smooth' })
    }

    track.addEventListener('scroll', updateProgress, { passive: true })
    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    track.addEventListener('mouseleave', stopDrag)

    if (bar) {
      bar.addEventListener('mousedown', onBarClick)
      fill.addEventListener('mousedown', onBarDown)
      window.addEventListener('mousemove', onBarMove)
      window.addEventListener('mouseup', stopBarDrag)
    }

    updateProgress()

    return () => {
      track.removeEventListener('scroll', updateProgress)
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      track.removeEventListener('mouseleave', stopDrag)
      if (bar) {
        bar.removeEventListener('mousedown', onBarClick)
        fill.removeEventListener('mousedown', onBarDown)
        window.removeEventListener('mousemove', onBarMove)
        window.removeEventListener('mouseup', stopBarDrag)
      }
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
          id="bp-track"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Articoli del blog, scorri orizzontalmente"
          onKeyDown={onKeyDown}
        >
          {blogPreviewArticles.map((article) => (
            <article key={article.slug} className="bp-card">
              {article.image && (
                <div className="bp-card-img">
                  <img
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    loading="lazy"
                    decoding="async"
                    style={
                      article.imagePosition ? { objectPosition: article.imagePosition } : undefined
                    }
                  />
                </div>
              )}
              <div className="bp-card-body">
                <div className="bp-card-meta">
                  <span className="bp-card-category">{article.category}</span>
                  <span className="bp-card-date">
                    {new Date(article.date).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="bp-card-title">{article.title}</h3>
                <p className="bp-card-excerpt">{article.excerpt}</p>
                <Link
                  to={`/blog/${article.slug}`}
                  className="bp-card-link"
                  aria-label={`Leggi articolo: ${article.title}`}
                >
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

      <div
        className="bp-progress"
        ref={progressBarRef}
        role="scrollbar"
        aria-controls="bp-track"
        aria-label="Scorri articoli"
        aria-valuenow={0}
      >
        <div className="bp-progress-fill" ref={progressRef} />
      </div>
    </section>
  )
}
