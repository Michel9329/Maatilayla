# Phase 4 (Blog): Pagina Blog — Research

**Researched:** 2026-03-06
**Domain:** Static blog with Markdown articles, grid listing, single article pages
**Confidence:** HIGH

## Summary

Il blog di Maatilayla ha 15 articoli scritti in markdown puro (senza frontmatter), con titolo come `# heading` e data come `*YYYY-MM-DD*` nella prima riga. 6 articoli hanno immagini di copertina gia processate in webp, 9 no. Gli articoli sono contenuti personali/riflessivi di media lunghezza (16-68 righe), senza codice, tabelle o sintassi avanzata — solo testo con grassetti, corsivi e heading occasionali.

L'approccio raccomandato e il piu semplice e robusto per questo progetto: creare un data layer centralizzato in `src/data/blogArticles.ts` che contiene i metadati di tutti gli articoli (titolo, slug, data, categoria, excerpt, immagine) e importa i file .md come stringhe raw tramite Vite `?raw`. La pagina griglia `/blog` legge l'array di metadati, la pagina singola `/blog/:slug` fa il lookup per slug e renderizza il markdown con `react-markdown`.

**Primary recommendation:** Data layer TypeScript statico + Vite `?raw` import + `react-markdown` per il rendering. Zero plugin aggiuntivi Vite, zero build pipeline custom.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-markdown | ^10.1.0 | Rendering markdown in React | Standard de facto, supporto TypeScript nativo, 12M+ download/settimana, custom components |
| Vite `?raw` suffix | built-in | Import file .md come stringa | Zero config, zero plugin, built-in in Vite — importa come string literal nel bundle |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| remark-gfm | ^4.0 | GitHub Flavored Markdown (tabelle, strikethrough) | Opzionale — gli articoli attuali non usano tabelle, ma utile per futuri articoli |
| rehype-raw | ^7.0 | Permette HTML inline nel markdown | Solo se servira inserire HTML custom negli articoli (es. iframe video) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `?raw` import | vite-plugin-markdown | Plugin non necessario — gli articoli non hanno frontmatter YAML, il ?raw basta |
| react-markdown | @mdx-js/rollup (MDX) | Overengineering per articoli di solo testo — MDX serve per componenti React nel markdown |
| gray-matter | Metadati hardcoded in TS | gray-matter non necessario — i .md non hanno frontmatter, i metadati vanno nel data layer |
| CMS headless | File statici | Previsto in Phase 10 — per ora file statici sono sufficienti |

**Installation:**
```bash
npm install react-markdown
```

Opzionale (solo se servono tabelle GFM o HTML inline):
```bash
npm install remark-gfm rehype-raw
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  data/
    blogArticles.ts       # Array metadati + import ?raw di tutti i 15 .md
  pages/
    Blog.tsx              # Pagina griglia /blog (gia esistente, da espandere)
    BlogArticle.tsx       # Pagina singola /blog/:slug (nuova)
  components/
    sections/
      BlogPreviewSection.tsx  # Homepage preview (gia esiste — collegare a blogArticles)
      BlogGrid.tsx            # Griglia card per /blog
      ArticleRenderer.tsx     # Wrapper react-markdown con stili tipografici
```

### Pattern 1: Data Layer Centralizzato
**What:** Un singolo file TypeScript che esporta i metadati di tutti gli articoli e il contenuto raw
**When to use:** Sempre — e il single source of truth per blog listing, preview homepage, e singolo articolo

```typescript
// src/data/blogArticles.ts

// Import raw markdown
import controlliRaw from '../../content/testi-sito-attuale/blog/controlli-si-grazie.md?raw'
import quandoTornanoRaw from '../../content/testi-sito-attuale/blog/quando-a-volte-tornano.md?raw'
// ... tutti i 15 articoli

export interface BlogArticle {
  slug: string
  title: string
  date: string           // ISO format YYYY-MM-DD
  category: string
  excerpt: string
  image?: string         // path in /content/images/
  imageAlt?: string
  imagePosition?: string // object-position CSS per card
  content: string        // raw markdown
  readingTime: number    // minuti stimati
}

// Helper per calcolo tempo di lettura (~200 parole/minuto)
function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'controlli-si-grazie',
    title: 'Controlli? Si, grazie!',
    date: '2023-05-24',
    category: 'Allevamento',
    excerpt: 'Perche sottoporsi ai controlli sanitari e genetici e un atto di responsabilita...',
    image: '/content/images/maatilayla-blog-controlli-si-grazie.webp',
    imageAlt: "Casetta dei barboncini toy nell'allevamento Maatilayla",
    content: controlliRaw,
    readingTime: readingTime(controlliRaw),
  },
  // ... tutti i 15 articoli
]

// Ordinati per data decrescente (piu recente prima)
export const blogArticlesSorted = [...blogArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

// Lookup per slug
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug)
}

// Preview per homepage (primi 6)
export const blogPreviewArticles = blogArticlesSorted.slice(0, 6)
```

### Pattern 2: Tipo di dichiarazione per Vite ?raw
**What:** TypeScript non conosce i moduli `*.md?raw` — serve una dichiarazione d'ambiente
**When to use:** Sempre con ?raw import

```typescript
// src/vite-env.d.ts (aggiungere)
declare module '*.md?raw' {
  const content: string
  export default content
}
```

### Pattern 3: Routing Dinamico per Articolo Singolo
**What:** Route `/blog/:slug` con lazy loading
**When to use:** Per la pagina del singolo articolo

```typescript
// In App.tsx — aggiungere route
const BlogArticle = lazy(() => import('@/pages/BlogArticle'))

// Dentro <Routes>
<Route path="/blog/:slug" element={<BlogArticle />} />
```

### Pattern 4: Rendering Markdown con Stili Tipografici
**What:** Componente wrapper per react-markdown con classi CSS per tipografia articolo
**When to use:** Nella pagina singolo articolo

```typescript
// src/components/sections/ArticleRenderer.tsx
import Markdown from 'react-markdown'

interface Props {
  content: string
}

export default function ArticleRenderer({ content }: Props) {
  // Rimuovi titolo e data dal markdown (gia mostrati nell'header della pagina)
  const bodyContent = content
    .replace(/^#\s+.+\n/, '')     // rimuovi # Titolo
    .replace(/^\*.+\*\n/, '')      // rimuovi *data*
    .trim()

  return (
    <div className="article-body">
      <Markdown
        components={{
          h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
          p: ({ children }) => <p className="article-p">{children}</p>,
          strong: ({ children }) => <strong className="article-strong">{children}</strong>,
          em: ({ children }) => <em className="article-em">{children}</em>,
          a: ({ href, children }) => (
            <a href={href} className="article-link" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {bodyContent}
      </Markdown>
    </div>
  )
}
```

### Pattern 5: Immagine Placeholder per Articoli senza Copertina
**What:** 9 articoli su 15 non hanno immagine di copertina — serve un fallback
**When to use:** Nella griglia e nella pagina singolo articolo

Opzioni:
1. **Immagine generica dell'allevamento** — un'unica foto Maatilayla usata come fallback
2. **Gradient con colore brand** — sfondo cream/primary senza immagine
3. **Foto hero del blog** — la stessa immagine dell'hero della pagina /blog

**Raccomandazione:** Usare una singola immagine generica di fallback (`maatilayla-blog-placeholder.webp`) — coerente, professionale, evita layout shift.

### Anti-Patterns to Avoid
- **Non usare `import()` dinamico per i .md**: I path dinamici con variabili non funzionano con Vite in produzione — tutti gli import devono essere statici
- **Non parsare frontmatter a runtime**: I file .md attuali non hanno frontmatter YAML — aggiungerne ora richiederebbe modificare tutti i 15 file senza beneficio
- **Non creare un sistema di build custom**: Vite `?raw` + data layer statico e sufficiente per 15 articoli
- **Non usare `dangerouslySetInnerHTML`**: react-markdown sanitizza il contenuto — non serve HTML raw
- **Non lazy-loadare ogni singolo articolo .md**: 15 articoli corti (max 68 righe) pesano ~30KB totali come stringhe — il code splitting per pagina BlogArticle e sufficiente

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rendering markdown | Parser custom con regex | react-markdown | Gestisce edge cases, XSS-safe, custom components |
| Tempo di lettura | Niente (omettere) | Funzione helper con word count / 200 | 3 righe di codice, utile per UX |
| Slug generation | Regex su titolo | Slug hardcoded nel data layer | I .md hanno gia nomi file perfetti come slug |
| Paginazione | Custom state machine | Semplice slice su array | 15 articoli = nessuna paginazione necessaria, tutti visibili |
| Data formatting | Intl.DateTimeFormat custom | `new Date(iso).toLocaleDateString('it-IT', opts)` | Nativo, zero dipendenze |

**Key insight:** Con soli 15 articoli statici, qualsiasi sistema dinamico (CMS, API, database) e overengineering. Il data layer TypeScript offre type safety, autocompletamento, e zero overhead runtime.

## Common Pitfalls

### Pitfall 1: Dynamic Import Path con Vite
**What goes wrong:** `import(\`../../content/blog/${slug}.md?raw\`)` non funziona in produzione
**Why it happens:** Vite (Rollup) non puo analizzare path dinamici con variabili — non sa quali file includere nel bundle
**How to avoid:** Importare TUTTI i .md staticamente nel data layer, poi fare lookup per slug a runtime
**Warning signs:** Funziona in dev ma fallisce in build

### Pitfall 2: ?raw Non Dichiarato in TypeScript
**What goes wrong:** TS error `Cannot find module '*.md?raw'`
**Why it happens:** TypeScript non conosce il suffix `?raw` di Vite
**How to avoid:** Aggiungere `declare module '*.md?raw'` in `vite-env.d.ts`
**Warning signs:** Red squiggly su tutti gli import .md

### Pitfall 3: Titolo/Data Duplicati nel Rendering
**What goes wrong:** Il markdown inizia con `# Titolo` e `*data*` — se renderizzi tutto, appaiono due volte (nell'header della pagina E nel body)
**Why it happens:** Il contenuto originale WordPress includeva titolo e data nel body del post
**How to avoid:** Strip le prime 2 righe dal raw markdown prima di passarlo a react-markdown
**Warning signs:** Titolo visibile due volte nella pagina articolo

### Pitfall 4: Bundle Size con 15 Articoli Raw
**What goes wrong:** Tutti i 15 articoli vengono inclusi nel chunk del data layer
**Why it happens:** Gli import `?raw` sono statici — Vite li include nel modulo importante
**How to avoid:** Il data layer e importato solo da Blog.tsx e BlogArticle.tsx, che sono lazy-loaded. Il chunk blog conterra ~30KB di testo — accettabile
**Warning signs:** Se il main bundle cresce, verificare che il data layer non sia importato da Home.tsx

### Pitfall 5: BlogPreviewSection Duplicazione Dati
**What goes wrong:** BlogPreviewSection ha i dati hardcoded — divergono dal data layer centralizzato
**Why it happens:** E stato creato prima del data layer
**How to avoid:** Refactorare BlogPreviewSection per importare `blogPreviewArticles` dal data layer
**Warning signs:** Titolo o excerpt diverso tra homepage e pagina blog

### Pitfall 6: Link Card Non Puntano all'Articolo
**What goes wrong:** Nelle card della BlogPreviewSection, i link puntano a `/blog` generico invece di `/blog/:slug`
**Why it happens:** Il componente attuale usa `<Link to="/blog">` per tutti
**How to avoid:** Usare `<Link to={\`/blog/${article.slug}\`}>` dopo il refactor
**Warning signs:** Click su card porta alla lista invece che all'articolo

## Code Examples

### Griglia Blog (pagina /blog)
```typescript
// src/components/sections/BlogGrid.tsx
import { Link } from 'react-router'
import type { BlogArticle } from '@/data/blogArticles'

interface Props {
  articles: BlogArticle[]
}

const PLACEHOLDER_IMAGE = '/content/images/maatilayla-blog-placeholder.webp'

export default function BlogGrid({ articles }: Props) {
  return (
    <section className="bg-section" aria-label="Tutti gli articoli del blog">
      <div className="bg-container">
        <div className="bg-grid">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="bg-card"
              aria-label={`Leggi: ${article.title}`}
            >
              <div className="bg-card-img">
                <img
                  src={article.image || PLACEHOLDER_IMAGE}
                  alt={article.imageAlt || `Articolo blog Maatilayla: ${article.title}`}
                  loading="lazy"
                  decoding="async"
                  style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
                />
              </div>
              <div className="bg-card-body">
                <div className="bg-card-meta">
                  <span className="bg-card-category">{article.category}</span>
                  <span className="bg-card-date">
                    {new Date(article.date).toLocaleDateString('it-IT', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="bg-card-title">{article.title}</h3>
                <p className="bg-card-excerpt">{article.excerpt}</p>
                <div className="bg-card-footer">
                  <span className="bg-card-readtime">{article.readingTime} min di lettura</span>
                  <span className="bg-card-link" aria-hidden="true">
                    Leggi &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pagina Singolo Articolo
```typescript
// src/pages/BlogArticle.tsx
import { useParams, Navigate, Link } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { getArticleBySlug } from '@/data/blogArticles'
import ArticleRenderer from '@/components/sections/ArticleRenderer'

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) return <Navigate to="/blog" replace />

  const dateFormatted = new Date(article.date).toLocaleDateString('it-IT', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      <Helmet>
        <title>{article.title} — Blog Maatilayla</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://allevamentobarboncinimaatilayla.it/blog/${article.slug}`} />
        <meta property="og:title" content={`${article.title} — Blog Maatilayla`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://allevamentobarboncinimaatilayla.it/blog/${article.slug}`} />
        {article.image && (
          <meta property="og:image" content={`https://allevamentobarboncinimaatilayla.it${article.image}`} />
        )}
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
        <meta property="article:published_time" content={article.date} />
        <script type="application/ld+json">
          {JSON.stringify({
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
              url: 'https://allevamentobarboncinimaatilayla.it',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://allevamentobarboncinimaatilayla.it/blog/${article.slug}`,
            },
            ...(article.image && {
              image: `https://allevamentobarboncinimaatilayla.it${article.image}`,
            }),
          })}
        </script>
      </Helmet>

      <article className="ba-article">
        {/* Header articolo */}
        <header className="ba-header">
          <Link to="/blog" className="ba-back">&larr; Tutti gli articoli</Link>
          <div className="ba-meta">
            <span className="ba-category">{article.category}</span>
            <time className="ba-date" dateTime={article.date}>{dateFormatted}</time>
            <span className="ba-readtime">{article.readingTime} min di lettura</span>
          </div>
          <h1 className="ba-title">{article.title}</h1>
        </header>

        {/* Immagine copertina (se presente) */}
        {article.image && (
          <figure className="ba-cover">
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        )}

        {/* Corpo articolo markdown */}
        <ArticleRenderer content={article.content} />

        {/* Navigazione post precedente/successivo */}
        {/* TODO: componente ArticleNav con prev/next */}
      </article>
    </>
  )
}
```

### JSON-LD Blog Listing (pagina /blog)
```typescript
// Dentro Blog.tsx Helmet
<script type="application/ld+json">
  {JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Maatilayla',
    description: 'Articoli e approfondimenti dal mondo dei barboncini toy.',
    url: 'https://allevamentobarboncinimaatilayla.it/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Maatilayla',
    },
    blogPost: blogArticlesSorted.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      datePublished: a.date,
      url: `https://allevamentobarboncinimaatilayla.it/blog/${a.slug}`,
    })),
  })}
</script>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CMS + API fetch | Static import at build time | Vite ecosystem 2022+ | Zero latency, zero API dependency |
| gray-matter frontmatter | TypeScript data layer | Trend 2024+ per siti piccoli | Type safety, autocompletamento IDE |
| dangerouslySetInnerHTML | react-markdown component | react-markdown v6+ (2021) | XSS-safe, custom components |
| Paginazione server-side | Client-side array slice | SPA con dati statici | 15 articoli = mostra tutti |

## Design Recommendations

### Griglia Blog (/blog)
- **Layout**: griglia responsive 3 colonne desktop, 2 tablet, 1 mobile
- **Card**: immagine 16/10 (coerente con BlogPreviewSection), titolo, excerpt, meta (data + categoria + tempo lettura)
- **No paginazione**: 15 articoli sono tutti visibili in una pagina
- **Filtro categoria** (opzionale): dropdown o pill per filtrare — categorie presenti: Allevamento, Storie, Riflessioni, Educazione, Vita quotidiana
- **Ordinamento**: per data decrescente (default), opzionale per categoria

### Pagina Singolo Articolo (/blog/:slug)
- **Max-width contenuto**: 720px (optimal line length per lettura)
- **Tipografia**: Playfair Display per h1/h2, Poppins per body, `line-height: 1.75` per paragrafi
- **Font size body**: `clamp(1rem, 1.1vw, 1.125rem)` per leggibilita
- **Immagine copertina**: full-width fino a max-width 720px, border-radius, se presente
- **Header**: categoria pill + data + tempo lettura sopra il titolo h1
- **Back link**: freccia + "Tutti gli articoli" sopra l'header
- **CTA fondo**: suggerimento articoli correlati o CTA contatti (pattern ChiSiamoCta)
- **Articoli senza immagine**: header piu compatto senza blocco immagine

### Categorie Articoli (da assegnare nel data layer)
| Articolo | Categoria Suggerita |
|----------|-------------------|
| Controlli? Si, grazie! | Allevamento |
| Quando a volte tornano | Storie |
| Chi alleva, alleva tutto | Riflessioni |
| Facciamo fare il cane al cane | Educazione |
| Per una zampata di fango | Vita quotidiana |
| Pandemia sei tutta mia | Riflessioni |
| Maltipoo, Cockapoo o Goldendoodle? | Educazione |
| Il coraggio di lasciarli andare | Storie |
| Maschio o Femmina? | Educazione |
| Quando cerchiamo qualcuno... | Riflessioni |
| Va dove ti porta il cane | Vita quotidiana |
| Un cucciolo per Natale? | Educazione |
| Il Barbone | Razza |
| L'origine del nome | Storie |
| Siamo tutti "allevatori" | Riflessioni |

### CSS Naming Convention
- Griglia blog: prefisso `bg-` (blog grid)
- Articolo singolo: prefisso `ba-` (blog article)
- Renderer markdown: prefisso `article-` (dentro .article-body)

## Mappa Articoli con Immagini

### Con immagine (6)
| Slug | Immagine |
|------|----------|
| controlli-si-grazie | maatilayla-blog-controlli-si-grazie.webp |
| quando-a-volte-tornano | maatilayla-blog-quando-tornano.webp |
| chi-alleva-alleva-tutto | maatilayla-blog-chi-alleva.webp |
| facciamo-fare-il-cane-al-cane | maatilayla-blog-cane-al-cane.webp |
| per-una-zampata-di-fango | maatilayla-blog-zampata-fango.webp |
| pandemia-sei-tutta-mia | maatilayla-blog-pandemia.webp |

### Senza immagine (9) — useranno placeholder
- maltipoo-cockapoo-o-goldendoodle
- il-coraggio-di-lasciarli-andare
- maschio-o-femmina
- quando-cerchiamo-qualcuno-che-ci-scalda-il-cuore
- va-dove-ti-porta-il-cane
- un-cucciolo-per-natale
- il-barbone
- lorigine-del-nome
- siamo-tutti-allevatori

## Impatto su Componenti Esistenti

### BlogPreviewSection (refactor necessario)
- **Attuale**: dati hardcoded nell'array `articles` dentro il componente
- **Dopo**: importa `blogPreviewArticles` da `@/data/blogArticles`
- **Link card**: cambiare `<Link to="/blog">` in `<Link to={/blog/${slug}}>`
- **Impatto**: nessun cambiamento visivo, solo source of truth centralizzata

### App.tsx (aggiunta route)
- Aggiungere: `<Route path="/blog/:slug" element={<BlogArticle />} />`
- Aggiungere import lazy: `const BlogArticle = lazy(() => import('@/pages/BlogArticle'))`

### Vite config (nessun cambiamento)
- `?raw` e built-in, non serve plugin
- Opzionale: aggiungere chunk `markdown: ['react-markdown']` in manualChunks

## Open Questions

1. **Immagine placeholder per 9 articoli senza copertina**
   - What we know: 6 articoli hanno foto, 9 no
   - What's unclear: Usare una foto generica dell'allevamento o un pattern/gradient brand?
   - Recommendation: Creare/scegliere una foto placeholder generica (`maatilayla-blog-placeholder.webp`)

2. **Filtro per categoria nella griglia**
   - What we know: 5-6 categorie naturali dagli articoli
   - What's unclear: Se implementare subito o rimandare
   - Recommendation: Implementare come pill cliccabili — e semplice (useState + filter) e migliora UX

3. **Navigazione articolo precedente/successivo**
   - What we know: Migliora engagement e tempo sul sito
   - What's unclear: Layout — bottoni prev/next o card preview?
   - Recommendation: Bottoni semplici con titolo articolo (prev/next), evitare card preview per semplicita

4. **CTA in fondo all'articolo**
   - What we know: Il pattern CTA e presente in tutte le pagine (ChiSiamoCta, FaqCta)
   - What's unclear: Quale CTA per il blog — contatti? newsletter? articoli correlati?
   - Recommendation: Sezione Newsletter compatta (riutilizzare NewsletterSection) + link "Tutti gli articoli"

## Sources

### Primary (HIGH confidence)
- Vite docs — Static Asset Handling, `?raw` suffix: https://vite.dev/guide/assets
- react-markdown npm/GitHub — v10.1.0 API, TypeScript types: https://github.com/remarkjs/react-markdown
- Codebase esistente — BlogPreviewSection.tsx, App.tsx, vite.config.ts (letti direttamente)

### Secondary (MEDIUM confidence)
- Schema.org BlogPosting specification: https://schema.org/BlogPosting
- react-markdown custom components guide: https://strapi.io/blog/react-markdown-complete-guide-security-styling
- gray-matter npm (valutato e scartato): https://www.npmjs.com/package/gray-matter

### Tertiary (LOW confidence)
- Nessuna — tutte le raccomandazioni sono basate su docs ufficiali e codebase esistente

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - react-markdown e Vite ?raw sono soluzioni consolidate e documentate ufficialmente
- Architecture: HIGH - data layer statico e il pattern standard per blog con pochi articoli in Vite/React
- Pitfalls: HIGH - basati su esperienza diretta con Vite dynamic imports e analisi del codice esistente
- Design: MEDIUM - raccomandazioni basate su pattern gia usati nel progetto, dettagli da confermare

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stabile — librerie mature, nessun breaking change previsto)
