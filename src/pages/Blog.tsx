import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import BlogGrid from '@/components/sections/BlogGrid'
import BlogCta from '@/components/sections/BlogCta'
import ContactSection from '@/components/sections/ContactSection'
import InstagramFeedSection from '@/components/sections/InstagramFeedSection'
import { blogArticlesSorted, blogCategories } from '@/data/blogArticles'

export default function Blog() {
  // JSON-LD Blog + BlogPosting schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog — Maatilayla',
    description:
      'Articoli e approfondimenti dal mondo dei barboncini toy: consigli di allevamento, esperienze personali e cultura cinofila.',
    url: 'https://allevamentobarboncinimaatilayla.it/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Maatilayla',
      url: 'https://allevamentobarboncinimaatilayla.it',
    },
    blogPost: blogArticlesSorted.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      datePublished: article.date,
      description: article.excerpt,
      url: `https://allevamentobarboncinimaatilayla.it/blog/${article.slug}`,
      author: {
        '@type': 'Person',
        name: 'Layla Zarfati',
      },
      ...(article.image && {
        image: `https://allevamentobarboncinimaatilayla.it${article.image}`,
      }),
    })),
  }

  return (
    <>
      <Helmet>
        <title>Blog — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Articoli e approfondimenti dal mondo dei barboncini toy: consigli di allevamento, esperienze personali e cultura cinofila dal blog di Maatilayla."
        />
        <link rel="canonical" href="https://allevamentobarboncinimaatilayla.it/blog" />
        <meta property="og:title" content="Blog — Maatilayla" />
        <meta
          property="og:description"
          content="Articoli e approfondimenti dal mondo dei barboncini toy: consigli, esperienze e cultura cinofila."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/blog" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-blog.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HeroSection
        key="blog"
        image="/content/images/maatilayla-header-blog.webp"
        alt="Barboncini toy dell'allevamento Maatilayla nel prato"
        title="Blog"
        subtitle="Articoli e approfondimenti dal mondo cinofilo"
      />
      <BlogGrid articles={blogArticlesSorted} categories={blogCategories} />
      <BlogCta />
      <ContactSection />
      <InstagramFeedSection />
    </>
  )
}
