import { useState, useMemo, useEffect, useRef } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'
import { galleryPhotos, galleryCategories, type GalleryCategory } from '@/data/galleryData'

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'tutti'>('tutti')
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)

  const filteredPhotos = useMemo(
    () =>
      activeCategory === 'tutti'
        ? galleryPhotos
        : galleryPhotos.filter((p) => p.category === activeCategory),
    [activeCategory],
  )

  const slides = useMemo(
    () =>
      filteredPhotos.map((p) => ({
        src: p.src,
        alt: p.alt,
        width: p.width,
        height: p.height,
      })),
    [filteredPhotos],
  )

  // IntersectionObserver entrance (pattern progetto)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      sectionRef.current?.classList.add('gl-entered')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => entry.target.classList.add('gl-entered'))
          }
        })
      },
      { threshold: 0, rootMargin: '-8% 0px' },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="gl-section">
      {/* Header */}
      <div className="gl-header">
        <span className="gl-badge">
          <span className="gl-dot" />
          Galleria
        </span>
        <h2 className="gl-title">
          I nostri <span className="gl-accent">barboncini.</span>
        </h2>
        <p className="gl-subtitle">Scatti e momenti dall'allevamento Maatilayla.</p>
      </div>

      {/* Filtri pill */}
      <div className="gl-filters" role="group" aria-label="Filtra per categoria">
        {galleryCategories.map((cat) => (
          <button
            key={cat.key}
            className={`gl-filter-btn ${activeCategory === cat.key ? 'gl-filter-active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
            aria-pressed={activeCategory === cat.key}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Contatore foto */}
      <p className="gl-count">
        {filteredPhotos.length} {filteredPhotos.length === 1 ? 'foto' : 'foto'}
      </p>

      {/* Griglia masonry */}
      <div className="gl-grid" key={activeCategory}>
        {filteredPhotos.map((photo, i) => (
          <div
            key={photo.id}
            className="gl-item"
            onClick={() => setLightboxIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`Apri ${photo.alt}`}
            onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              style={{ aspectRatio: `${photo.width}/${photo.height}` }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox YARL */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Thumbnails, Zoom, Counter]}
        carousel={{ preload: 2 }}
        animation={{ fade: 250 }}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.92)' } }}
      />
    </section>
  )
}
