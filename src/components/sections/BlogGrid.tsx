import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { BlogArticle } from '@/data/blogArticles'

interface BlogGridProps {
  articles: BlogArticle[]
  categories: string[]
}

/** Formatta data in italiano: "24 maggio 2023" */
function formatDateIT(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogGrid({ articles, categories }: BlogGridProps) {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<string | null>(searchParams.get('category'))
  const sectionRef = useRef<HTMLElement>(null)

  const filtered = activeCategory ? articles.filter((a) => a.category === activeCategory) : articles

  // IntersectionObserver entrance animation
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('bg-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('bg-entered')
          observer.disconnect()
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="articoli" className="bg-section" aria-label="Articoli del blog">
      <div className="bg-container">
        {/* Filtri categoria */}
        <div className="bg-filters" role="group" aria-label="Filtra per categoria">
          <button
            className={`bg-filter-pill${activeCategory === null ? ' active' : ''}`}
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
          >
            Tutti
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`bg-filter-pill${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Griglia articoli */}
        <div className="bg-grid">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="bg-card"
              aria-label={`Leggi: ${article.title}`}
            >
              <div className={`bg-card-img${!article.image ? ' bg-no-image' : ''}`}>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    loading="lazy"
                    decoding="async"
                    style={
                      article.imagePosition ? { objectPosition: article.imagePosition } : undefined
                    }
                  />
                )}
              </div>
              <div className="bg-card-body">
                <div className="bg-card-meta">
                  <span className="bg-card-category">{article.category}</span>
                  <span className="bg-card-date">{formatDateIT(article.date)}</span>
                </div>
                <h3 className="bg-card-title">{article.title}</h3>
                <p className="bg-card-excerpt">{article.excerpt}</p>
                <div className="bg-card-footer">
                  <span className="bg-card-readtime">{article.readingTime} min di lettura</span>
                  <span className="bg-card-link">
                    Leggi <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Messaggio nessun risultato */}
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
            Nessun articolo in questa categoria.
          </p>
        )}
      </div>
    </section>
  )
}
