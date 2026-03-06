# Phase 4: Galleria - Research

**Researched:** 2026-03-06
**Domain:** Photo gallery with masonry layout, lightbox, category filters
**Confidence:** HIGH

## Summary

La pagina Galleria richiede una griglia masonry responsive con lightbox YARL (gia' installato v3.29.1), filtri per categoria e lazy loading. L'approccio migliore usa **CSS `column-count`** per il layout masonry (supporto browser universale, zero JS, zero dipendenze) combinato con **yet-another-react-lightbox** per la visualizzazione fullscreen delle foto.

Le foto originali WordPress (~30-40) vanno scaricate manualmente dal sito live e processate con `sharp` secondo le regole CLAUDE.md. Il REST API WordPress restituisce solo ~32 media items tra le due pagine — il gallery plugin carica le immagini dinamicamente. Le foto gia' presenti nel progetto (~36 in `public/content/images/`) coprono parzialmente il fabbisogno; servono foto aggiuntive specifiche per la galleria (cuccioli, madri, struttura, agility).

**Primary recommendation:** CSS `column-count` per masonry + YARL lightbox con plugins Thumbnails/Zoom/Counter + filtri pill button con transizione CSS opacity/scale + dati in `src/data/galleryData.ts`.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| yet-another-react-lightbox | 3.29.1 | Lightbox fullscreen | Gia' installato, React 19 compatibile, plugin ecosystem |
| CSS column-count | N/A | Layout masonry | Supporto universale (IE10+), zero JS, performante |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | 0.34.5 | Image processing | Script download/compress foto (dev dependency, gia' installato) |
| Lucide React | 0.576.0 | Icone filtri | Gia' installato, usato ovunque nel progetto |
| Framer Motion | 12.34.4 | Filter animation | AnimatePresence per transizione griglia al cambio filtro |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS column-count | CSS Grid masonry (`grid-template-rows: masonry`) | Grid masonry e' sperimentale, nessun browser lo supporta unflagged in produzione (mar 2026). Column-count funziona ovunque. |
| CSS column-count | react-masonry-css / masonry-layout JS | Dipendenza extra non necessaria, CSS column-count copre il caso d'uso |
| Framer Motion (filtri) | CSS transition + classe toggle | Framer gia' installato, AnimatePresence gestisce exit animation gratis |

## Architecture Patterns

### Recommended Project Structure
```
src/
  data/
    galleryData.ts       # Array foto con src, alt, category, width, height
  pages/
    Galleria.tsx          # Page component (HeroSection + GallerySection + CTA)
  components/
    sections/
      GallerySection.tsx  # Masonry grid + filtri + lightbox
```

### Pattern 1: CSS Column-Count Masonry
**What:** Griglia masonry pura CSS con `column-count` responsive via media queries
**When to use:** Foto con altezze variabili, layout Pinterest-style
**Example:**
```css
/* Prefisso gl- per namespace (convenzione progetto) */
.gl-grid {
  column-count: 2;
  column-gap: 0.75rem;
}

@media (min-width: 768px) {
  .gl-grid { column-count: 3; }
}

@media (min-width: 1024px) {
  .gl-grid { column-count: 4; }
}

.gl-item {
  break-inside: avoid;
  margin-bottom: 0.75rem;
  border-radius: var(--radius-card);
  overflow: hidden;
  cursor: pointer;
  contain: layout style paint;
}

.gl-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.gl-item:hover img {
  transform: scale(1.03);
}
```

### Pattern 2: YARL Lightbox Integration
**What:** Lightbox aperto al click su foto, con thumbnails, zoom e counter
**When to use:** Sempre — visualizzazione fullscreen delle foto galleria
**Example:**
```typescript
// Source: yet-another-react-lightbox.com/documentation
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'

const [lightboxIndex, setLightboxIndex] = useState(-1)

// Slides da foto filtrate
const slides = filteredPhotos.map(p => ({
  src: p.src,
  alt: p.alt,
  width: p.width,
  height: p.height,
}))

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
```

### Pattern 3: Category Filter Pills
**What:** Bottoni pill per filtrare foto per categoria (tutti, cuccioli, madri, struttura, agility)
**When to use:** Sempre — navigazione intuitiva della galleria
**Example:**
```typescript
type GalleryCategory = 'tutti' | 'cuccioli' | 'madri' | 'struttura' | 'agility'

const categories: { key: GalleryCategory; label: string }[] = [
  { key: 'tutti', label: 'Tutti' },
  { key: 'cuccioli', label: 'Cuccioli' },
  { key: 'madri', label: 'Le mamme' },
  { key: 'struttura', label: 'Struttura' },
  { key: 'agility', label: 'Agility' },
]

const [activeCategory, setActiveCategory] = useState<GalleryCategory>('tutti')

const filteredPhotos = useMemo(() =>
  activeCategory === 'tutti'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeCategory),
  [activeCategory]
)
```

### Pattern 4: IntersectionObserver Entrance (Project Convention)
**What:** CSS transition + IntersectionObserver per animazione entrata (come AllevamentoSection)
**When to use:** Entrata sezione e singole card galleria
**Example:**
```typescript
// Segue il pattern gia' stabilito in 18 componenti del progetto
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
          requestAnimationFrame(() => {
            entry.target.classList.add('gl-entered')
          })
        }
      })
    },
    { threshold: 0, rootMargin: '-8% 0px' },
  )
  // observe section header
  if (sectionRef.current) observer.observe(sectionRef.current)
  return () => observer.disconnect()
}, [])
```

### Pattern 5: Photo Data Structure
**What:** Array tipizzato in file separato per dati galleria
**When to use:** Sempre — separa dati dalla logica di rendering
**Example:**
```typescript
// src/data/galleryData.ts
export interface GalleryPhoto {
  id: string
  src: string                    // path relativo: /content/images/gallery/...
  alt: string                    // italiano, SEO: include "barboncino toy" o "Maatilayla"
  category: 'cuccioli' | 'madri' | 'struttura' | 'agility'
  width: number                  // dimensioni originali per aspect-ratio
  height: number
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'cucciolo-prato-01',
    src: '/content/images/gallery/maatilayla-cucciolo-barboncino-toy-prato-01.webp',
    alt: 'Cucciolo di barboncino toy rosso che gioca nel prato dell\'allevamento Maatilayla',
    category: 'cuccioli',
    width: 800,
    height: 1067,
  },
  // ... altre foto
]
```

### Anti-Patterns to Avoid
- **JS masonry (react-masonry-css):** Aggiunge dipendenza inutile, CSS column-count e' sufficiente
- **Native CSS Grid masonry:** `grid-template-rows: masonry` non e' supportato in nessun browser stabile (mar 2026)
- **Lazy loading con libreria esterna:** `loading="lazy"` nativo + `decoding="async"` e' sufficiente (CLAUDE.md)
- **GSAP per transizione filtri:** Overkill, usare CSS transition opacity/transform o Framer AnimatePresence
- **Stagger su 40+ elementi:** Violerebbe il limite ~3 transizioni simultanee (CLAUDE.md). Usare solo fade-in semplice su tutto il grid

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Lightbox fullscreen | Custom modal con swipe/zoom | YARL (gia' installato) | Gesture handling, keyboard nav, a11y, responsive, plugins |
| Image zoom | Custom pinch-to-zoom | YARL Zoom plugin | Touch gestures complessi, cross-browser |
| Thumbnail strip | Custom scroll strip | YARL Thumbnails plugin | Sync automatica con slide corrente |
| Masonry layout | JS layout calculation | CSS `column-count` | Zero JS, performante, responsive con media queries |
| Image lazy loading | Custom IntersectionObserver per lazy | Attributo nativo `loading="lazy"` | Browser-native, zero JS, supportato ovunque |

**Key insight:** YARL copre tutta la complessita' del lightbox (gesture, keyboard, touch, zoom, fullscreen). Il masonry CSS column-count e' la soluzione piu' semplice e performante. Non serve alcuna libreria aggiuntiva.

## Common Pitfalls

### Pitfall 1: Column-count riordina le foto verticalmente
**What goes wrong:** CSS columns riempie colonna per colonna (alto-basso, poi prossima colonna), non riga per riga. Se le foto sono ordinate cronologicamente, l'ordine visivo sembra sbagliato.
**Why it happens:** E' il comportamento nativo di `column-count`.
**How to avoid:** Ordinare le foto intenzionalmente per visual balance (alternare altezze e categorie), non per data. Oppure accettare l'ordine verticale che e' comunque standard per gallerie masonry (Pinterest, Unsplash).
**Warning signs:** Foto consecutive appaiono in colonne diverse.

### Pitfall 2: Hover scale su immagini pesanti causa jank
**What goes wrong:** `transform: scale(1.03)` su immagini >100KB causa decode jank durante hover.
**Why it happens:** Il browser deve ridecodificare l'immagine alla nuova dimensione.
**How to avoid:** Le immagini galleria devono essere sotto 80KB (card size, CLAUDE.md). Usare `contain: layout style paint` sul container. Scale max 1.03.
**Warning signs:** Stutter visibile al primo hover su un'immagine.

### Pitfall 3: Lightbox index sfasato dopo filtro
**What goes wrong:** Si clicca la foto 5 nella vista filtrata ma il lightbox apre la foto 5 dell'array completo.
**Why it happens:** L'index del lightbox punta all'array sbagliato.
**How to avoid:** Passare `filteredPhotos` (non `galleryPhotos`) come `slides` al lightbox. L'index deve corrispondere alla posizione nell'array filtrato.
**Warning signs:** Cliccando una foto nel filtro "cuccioli" si apre una foto di categoria diversa.

### Pitfall 4: CLS (Content Layout Shift) durante lazy loading
**What goes wrong:** Le immagini senza dimensioni predefinite causano salti di layout quando si caricano.
**Why it happens:** Il browser non conosce le dimensioni fino al caricamento.
**How to avoid:** Impostare `aspect-ratio: width/height` su ogni immagine usando i dati da `galleryData.ts`. Oppure usare un placeholder con background-color.
**Warning signs:** La pagina "salta" durante lo scroll mentre le foto si caricano.

### Pitfall 5: column-count break-inside su Safari
**What goes wrong:** Su Safari vecchio, `break-inside: avoid` non funziona con certi layout.
**Why it happens:** Bug Safari pre-14.
**How to avoid:** Target browser del progetto e' Safari 14+ (CLAUDE.md) dove funziona. Aggiungere anche `-webkit-column-break-inside: avoid` per sicurezza.
**Warning signs:** Foto tagliate a meta' tra due colonne su Safari.

### Pitfall 6: Foto mancanti dal WordPress
**What goes wrong:** Il REST API WordPress restituisce solo ~32 media items, ma la galleria live ne ha 40+.
**Why it happens:** Il gallery plugin (probabilmente NextGen Gallery) gestisce le foto separatamente dal media library WP.
**How to avoid:** Scaricare le foto manualmente dal sito live ispezionando il DOM della pagina galleria con DevTools, oppure usare le foto gia' disponibili nel progetto + richiedere all'utente foto aggiuntive.
**Warning signs:** Meno foto del previsto dopo il download.

## Code Examples

### Componente GallerySection completo (pattern)
```typescript
// Source: pattern progetto (IntersectionObserver + YARL docs)
import { useState, useMemo, useEffect, useRef } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'
import { galleryPhotos, type GalleryCategory } from '@/data/galleryData'

const categories: { key: GalleryCategory | 'tutti'; label: string }[] = [
  { key: 'tutti', label: 'Tutti' },
  { key: 'cuccioli', label: 'Cuccioli' },
  { key: 'madri', label: 'Le mamme' },
  { key: 'struttura', label: 'Struttura' },
  { key: 'agility', label: 'Agility' },
]

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'tutti'>('tutti')
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)

  const filteredPhotos = useMemo(() =>
    activeCategory === 'tutti'
      ? galleryPhotos
      : galleryPhotos.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  const slides = useMemo(() =>
    filteredPhotos.map(p => ({
      src: p.src,
      alt: p.alt,
      width: p.width,
      height: p.height,
    })),
    [filteredPhotos]
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
        <span className="gl-badge"><span className="gl-dot" />Galleria</span>
        <h2 className="gl-title">I nostri <span className="gl-accent">barboncini.</span></h2>
        <p className="gl-subtitle">Scatti e momenti dall'allevamento Maatilayla.</p>
      </div>

      {/* Filter pills */}
      <div className="gl-filters" role="group" aria-label="Filtra per categoria">
        {categories.map(cat => (
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

      {/* Masonry grid */}
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

      {/* Lightbox */}
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
```

### CSS completo per GallerySection
```css
/* ── GallerySection ── */
.gl-section {
  padding: 4rem 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.gl-section.gl-entered {
  opacity: 1;
  transform: translateY(0);
}

/* Header */
.gl-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.gl-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.gl-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: pulse-dot 2s ease-in-out infinite;
}

.gl-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-text);
}

.gl-accent {
  color: var(--color-primary);
}

.gl-subtitle {
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-top: 0.5rem;
}

/* Filters */
.gl-filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.gl-filter-btn {
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-btn);
  border: 1.5px solid var(--color-secondary);
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.gl-filter-btn:hover {
  background: var(--color-primary-pale);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.gl-filter-btn.gl-filter-active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.gl-filter-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Masonry grid */
.gl-grid {
  column-count: 2;
  column-gap: 0.75rem;
}

.gl-item {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  margin-bottom: 0.75rem;
  border-radius: var(--radius-card);
  overflow: hidden;
  cursor: pointer;
  contain: layout style paint;
  transition: box-shadow 0.3s ease;
}

.gl-item:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.gl-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gl-item:hover img {
  transform: scale(1.03);
}

.gl-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@media (min-width: 768px) {
  .gl-grid { column-count: 3; }
  .gl-section { padding: 5rem 2rem; }
}

@media (min-width: 1024px) {
  .gl-grid { column-count: 4; }
  .gl-section { padding: 5rem 2.5rem; }
}

@media (min-width: 1440px) {
  .gl-section { padding: 5rem 3rem; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .gl-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .gl-item img { transition: none; }
  .gl-item { transition: none; }
}
```

### Script download foto da WordPress
```typescript
// scripts/download-gallery.ts (eseguire con: npx tsx scripts/download-gallery.ts)
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const OUTPUT_DIR = path.resolve('public/content/images/gallery')

// URLs da ispezionare manualmente sul sito live (DevTools > Network > Img)
const PHOTO_URLS: string[] = [
  // Aggiungere URLs qui dopo ispezione manuale
]

async function downloadAndProcess(url: string, filename: string) {
  const res = await fetch(url)
  const buffer = Buffer.from(await res.arrayBuffer())

  await sharp(buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(path.join(OUTPUT_DIR, filename))

  console.log(`Processed: ${filename}`)
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true })

  for (const url of PHOTO_URLS) {
    const name = url.split('/').pop()?.replace(/\.[^.]+$/, '') || 'photo'
    const filename = `maatilayla-${name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}.webp`
    await downloadAndProcess(url, filename)
  }
}

main()
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS masonry (Masonry.js, Isotope) | CSS `column-count` | 2020+ | Zero JS, nessuna dipendenza, piu' performante |
| CSS Grid masonry (`grid-template-rows: masonry`) | Ancora sperimentale, rinominato `grid-lanes` | Gen 2026 | Non usare in produzione, nessun browser stabile lo supporta |
| Custom lightbox modal | YARL v3 | 2023 | Gestione completa gesture/keyboard/touch/zoom, SSR compatible |
| `loading="lazy"` polyfill | Nativo browser | 2020 | Supporto universale, nessun polyfill necessario |

**Deprecated/outdated:**
- `react-masonry-css`: Non necessario, CSS column-count basta
- `Isotope.js` / `Masonry.js`: jQuery-era, non servono con React
- `lightbox2`, `fancybox`: jQuery-based, YARL e' la scelta moderna React

## Open Questions

1. **Quante e quali foto dalla galleria WordPress?**
   - What we know: Il REST API restituisce ~32 media items totali, la galleria live ne mostra ~40+
   - What's unclear: Le foto esatte della pagina galleria (il plugin le carica via JS)
   - Recommendation: L'utente puo' ispezionare manualmente il sito live con DevTools (Network > Img) e scaricare le foto, oppure fornire le foto originali direttamente

2. **Categorie esatte per i filtri?**
   - What we know: Il sito WP non ha categorie esplicite per la galleria
   - What's unclear: Se l'utente vuole categorie diverse da cuccioli/madri/struttura/agility
   - Recommendation: Usare le 4 categorie proposte + "tutti", assegnare manualmente a ogni foto

3. **Sottocartella gallery per le foto?**
   - What we know: Le foto attuali sono tutte in `public/content/images/`
   - What's unclear: Se creare `public/content/images/gallery/` per separare
   - Recommendation: Creare sottocartella `gallery/` per mantenere ordine (36 foto gia' nella root)

## Sources

### Primary (HIGH confidence)
- [YARL Documentation](https://yet-another-react-lightbox.com/documentation) - API completa, props, slides format
- [YARL Plugins](https://yet-another-react-lightbox.com/plugins) - Thumbnails, Zoom, Counter, Fullscreen
- [MDN CSS Masonry](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout) - Stato specifica masonry
- Codice progetto esistente (18 componenti con IntersectionObserver pattern)

### Secondary (MEDIUM confidence)
- [Chrome Blog - Masonry Update](https://developer.chrome.com/blog/masonry-update) - Stato browser support
- [CSS-Tricks - Masonry Layout Today](https://css-tricks.com/making-a-masonry-layout-that-works-today/) - Approcci production-ready
- [WebKit - Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/) - Evoluzione specifica

### Tertiary (LOW confidence)
- WordPress REST API media listing (incompleto, gallery plugin gestisce separatamente)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - YARL gia' installato e verificato, CSS column-count universale
- Architecture: HIGH - Pattern IntersectionObserver gia' usato in 18 componenti, data structure semplice
- Pitfalls: HIGH - Basati su esperienza progetto (hover scale, CLS, Safari) e documentazione ufficiale

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stabile, nessuna dipendenza fast-moving)
