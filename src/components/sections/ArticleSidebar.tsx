import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram } from 'lucide-react'
import type { BlogArticle } from '@/data/blogArticles'
import { blogArticlesSorted, blogCategories } from '@/data/blogArticles'

interface ArticleSidebarProps {
  article: BlogArticle
  headings: Array<{ id: string; text: string; level: number }>
}

/** Trova articoli correlati: stessa categoria, escluso corrente, max 3 */
function getRelatedArticles(article: BlogArticle): BlogArticle[] {
  const sameCategory = blogArticlesSorted.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  )
  if (sameCategory.length >= 2) return sameCategory.slice(0, 3)

  // Se meno di 2 nella stessa categoria, aggiungi recenti di altre categorie
  const others = blogArticlesSorted.filter(
    (a) => a.slug !== article.slug && a.category !== article.category,
  )
  return [...sameCategory, ...others].slice(0, 3)
}

export default function ArticleSidebar({ article, headings }: ArticleSidebarProps) {
  const [activeId, setActiveId] = useState<string>('')
  const sidebarRef = useRef<HTMLDivElement>(null)
  const related = getRelatedArticles(article)

  // IntersectionObserver per evidenziare heading corrente nel TOC
  useEffect(() => {
    if (headings.length === 0) return

    const headingEls = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headingEls.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Trova il primo heading visibile
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )

    headingEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  // Entrata CSS
  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) sidebar.classList.add('as-entered')
      },
      { threshold: 0, rootMargin: '-5% 0px' },
    )
    observer.observe(sidebar)
    return () => observer.disconnect()
  }, [])

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  return (
    <div className="as-sidebar" ref={sidebarRef}>
      {/* TOC — Sommario */}
      {headings.length > 0 && (
        <div className="as-toc">
          <h3 className="as-section-title">Sommario</h3>
          <nav aria-label="Indice dei contenuti">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`as-toc-link${activeId === h.id ? ' active' : ''}`}
                onClick={(e) => handleTocClick(e, h.id)}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Articoli correlati */}
      {related.length > 0 && (
        <div className="as-related">
          <h3 className="as-section-title">Articoli correlati</h3>
          {related.map((r) => (
            <Link key={r.slug} to={`/blog/${r.slug}`} className="as-related-card">
              {r.image && (
                <img
                  src={r.image}
                  alt={r.imageAlt || r.title}
                  className="as-related-thumb"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="as-related-info">
                <span className="as-related-title">{r.title}</span>
                <span className="as-related-date">
                  {new Date(r.date).toLocaleDateString('it-IT', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Categorie */}
      <div className="as-tags">
        <h3 className="as-section-title">Categorie</h3>
        <div className="as-tags-list">
          {blogCategories.map((cat) => (
            <Link
              key={cat}
              to={`/blog?category=${encodeURIComponent(cat)}`}
              className={`as-tag-pill${cat === article.category ? ' active' : ''}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/maatilayla"
        target="_blank"
        rel="noopener noreferrer"
        className="as-instagram"
        aria-label="Seguici su Instagram"
      >
        <img
          src="/content/images/maatilayla-barboncino-toy-coppia-prato.webp"
          alt="Barboncini toy Maatilayla su Instagram"
          loading="lazy"
          decoding="async"
        />
        <div className="as-instagram-overlay">
          <span className="as-instagram-label">
            <Instagram size={18} />
            Seguici su Instagram
          </span>
        </div>
      </a>

      {/* Tags articolo */}
      {article.tags && article.tags.length > 0 && (
        <div className="as-tags">
          <h3 className="as-section-title">Tag</h3>
          <div className="as-tags-list">
            {article.tags.map((tag) => (
              <span key={tag} className="as-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA Contatti */}
      <div className="as-cta-card">
        <h3 className="as-cta-title">Hai domande?</h3>
        <p className="as-cta-body">Contattaci per saperne di piu sui nostri barboncini.</p>
        <Link to="/contatti" className="as-cta-btn">
          Scrivici
        </Link>
      </div>
    </div>
  )
}
