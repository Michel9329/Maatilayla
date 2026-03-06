import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticleBySlug, blogArticlesSorted } from '@/data/blogArticles'
import ArticleRenderer from '@/components/sections/ArticleRenderer'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

const BASE_URL = 'https://allevamentobarboncinimaatilayla.it'

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

      <article className="ba-article">
        <header className="ba-header">
          <Link to="/blog" className="ba-back">
            <ArrowLeft size={16} />
            Tutti gli articoli
          </Link>

          <div className="ba-meta">
            <span className="ba-category">{article.category}</span>
            <span className="ba-date">{formattedDate}</span>
            <span className="ba-readtime">{article.readingTime} min di lettura</span>
          </div>

          <h1 className="ba-title">{article.title}</h1>
        </header>

        {article.image && (
          <figure className="ba-cover">
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        )}

        <ArticleRenderer content={article.content} />

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
      </article>
    </>
  )
}
