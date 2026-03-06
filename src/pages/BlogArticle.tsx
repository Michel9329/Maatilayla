import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticleBySlug, blogArticlesSorted } from '@/data/blogArticles'
import ArticleRenderer from '@/components/sections/ArticleRenderer'
import ArticleSidebar from '@/components/sections/ArticleSidebar'
import ArticleCta from '@/components/sections/ArticleCta'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BASE_URL = 'https://allevamentobarboncinimaatilayla.it'

/** Estrae heading H2 dal markdown content per il TOC */
function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const lines = content.split('\n')
  for (const line of lines) {
    const match = line.match(/^(#{2})\s+(.+)$/)
    if (match) {
      const text = match[2].replace(/\*\*|__|\*|_/g, '').trim()
      const id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      headings.push({ id, text, level: 2 })
    }
  }
  return headings
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  // Prev/next: indice in lista ordinata per data decrescente
  const currentIndex = blogArticlesSorted.findIndex((a) => a.slug === article.slug)
  const prevArticle =
    currentIndex < blogArticlesSorted.length - 1 ? blogArticlesSorted[currentIndex + 1] : null
  const nextArticle = currentIndex > 0 ? blogArticlesSorted[currentIndex - 1] : null

  const formattedDate = new Date(article.date).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const canonicalUrl = `${BASE_URL}/blog/${article.slug}`
  const ogImage = article.image ? `${BASE_URL}${article.image}` : undefined

  // JSON-LD BlogPosting
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: 'Layla Zarfati',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maatilayla',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    ...(ogImage && { image: ogImage }),
  }

  // Heading per TOC sidebar
  const headings = extractHeadings(article.content)

  // Titolo troncato per breadcrumb
  const truncatedTitle =
    article.title.length > 40 ? article.title.slice(0, 40) + '...' : article.title

  return (
    <>
      <Helmet>
        <title>{article.title} — Blog Maatilayla</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${article.title} — Blog Maatilayla`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
        <meta property="article:published_time" content={article.date} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero compatto con foto articolo */}
      {article.image ? (
        <div className="ba-hero-custom">
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            className="ba-hero-bg"
            style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
            decoding="async"
            fetchPriority="high"
          />
          <div className="ba-hero-overlay" />
          <div className="ba-hero-content">
            <nav className="ba-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="ba-breadcrumb-sep" aria-hidden="true">
                &gt;
              </span>
              <Link to="/blog">Blog</Link>
              <span className="ba-breadcrumb-sep" aria-hidden="true">
                &gt;
              </span>
              <span>{truncatedTitle}</span>
            </nav>
            <h1 className="ba-hero-title">{article.title}</h1>
            <div className="ba-hero-meta">
              <span className="ba-hero-category">{article.category}</span>
              <span className="ba-hero-date">{formattedDate}</span>
              <span className="ba-hero-readtime">{article.readingTime} min di lettura</span>
            </div>
          </div>
        </div>
      ) : (
        <header className="ba-header-simple">
          <nav className="ba-breadcrumb ba-breadcrumb--light" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="ba-breadcrumb-sep" aria-hidden="true">
              &gt;
            </span>
            <Link to="/blog">Blog</Link>
            <span className="ba-breadcrumb-sep" aria-hidden="true">
              &gt;
            </span>
            <span>{truncatedTitle}</span>
          </nav>
          <h1 className="ba-title">{article.title}</h1>
          <div className="ba-hero-meta ba-hero-meta--light">
            <span className="ba-hero-category ba-hero-category--light">{article.category}</span>
            <span className="ba-hero-date ba-hero-date--light">{formattedDate}</span>
            <span className="ba-hero-readtime ba-hero-readtime--light">
              {article.readingTime} min di lettura
            </span>
          </div>
        </header>
      )}

      {/* Layout 2 colonne: articolo + sidebar */}
      <div className="ba-layout">
        <main className="ba-main">
          <article>
            <ArticleRenderer content={article.content} />
          </article>

          <ArticleCta />

          <nav className="ba-nav" aria-label="Navigazione articoli">
            {prevArticle ? (
              <Link to={`/blog/${prevArticle.slug}`} className="ba-nav-link ba-nav-prev">
                <span className="ba-nav-label">
                  <ChevronLeft size={14} />
                  Precedente
                </span>
                <span className="ba-nav-title">{prevArticle.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextArticle ? (
              <Link to={`/blog/${nextArticle.slug}`} className="ba-nav-link ba-nav-next">
                <span className="ba-nav-label">
                  Successivo
                  <ChevronRight size={14} />
                </span>
                <span className="ba-nav-title">{nextArticle.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>

        <aside className="ba-aside">
          <ArticleSidebar article={article} headings={headings} />
        </aside>
      </div>
    </>
  )
}
