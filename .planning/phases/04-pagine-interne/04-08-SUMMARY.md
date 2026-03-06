---
phase: 04-pagine-interne
plan: 08
subsystem: data
tags: [blog, markdown, vite-raw, react-markdown, data-layer, typescript]

requires:
  - phase: 04-pagine-interne
    provides: BlogPreviewSection homepage con dati hardcoded
provides:
  - Data layer centralizzato blog con 15 articoli tipizzati (BlogArticle)
  - Esportazioni blogArticlesSorted, getArticleBySlug, blogPreviewArticles, blogCategories
  - Dichiarazione TypeScript per moduli *.md?raw
  - react-markdown come dipendenza
affects: [04-09-blog-grid, 04-10-blog-article, blog, galleria]

tech-stack:
  added: [react-markdown]
  patterns: [vite-raw-import, centralized-data-layer, static-blog-articles]

key-files:
  created:
    - src/data/blogArticles.ts
  modified:
    - src/swiper.d.ts
    - src/components/sections/BlogPreviewSection.tsx
    - package.json

key-decisions:
  - "Import statico ?raw per tutti i 15 .md — nessun import dinamico (incompatibile Vite prod)"
  - "Dichiarazione *.md?raw aggiunta in swiper.d.ts esistente anziche creare file separato"
  - "blogPreviewArticles importato direttamente in homepage — accettabile aumento chunk index (~58KB)"

patterns-established:
  - "Data layer blog: src/data/blogArticles.ts e il single source of truth per tutti i componenti blog"
  - "Articoli senza immagine: campo image undefined, componenti gestiscono condizionalmente"

requirements-completed: [BLOG-DATA, BLOG-PREVIEW-REFACTOR]

duration: 3min
completed: 2026-03-06
---

# Phase 4 Plan 08: Data Layer Blog Summary

**Data layer centralizzato con 15 articoli markdown importati via Vite ?raw, BlogPreviewSection refactored per usare fonte dati unica**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-06T11:01:12Z
- **Completed:** 2026-03-06T11:04:29Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Creato src/data/blogArticles.ts con 15 articoli tipizzati, ordinamento per data, lookup per slug, preview homepage
- Installato react-markdown e aggiunta dichiarazione TypeScript per *.md?raw
- BlogPreviewSection refactored: zero duplicazione dati, link card puntano a /blog/:slug

## Task Commits

1. **Task 1: Data layer blog + react-markdown + type declaration** - `c93c69e` (feat)
2. **Task 2: Refactor BlogPreviewSection** - `6c371c2` (refactor)

## Files Created/Modified
- `src/data/blogArticles.ts` - Data layer centralizzato con 15 articoli, type BlogArticle, helper functions
- `src/swiper.d.ts` - Aggiunta dichiarazione modulo *.md?raw
- `src/components/sections/BlogPreviewSection.tsx` - Refactored per usare blogPreviewArticles dal data layer
- `package.json` - Aggiunto react-markdown come dipendenza
- `package-lock.json` - Lockfile aggiornato

## Decisions Made
- Import statico ?raw per tutti i 15 .md: Vite non supporta import dinamici con variabili in produzione
- Dichiarazione *.md?raw in swiper.d.ts esistente: evita proliferazione di file .d.ts
- Aumento chunk index accettabile (~58KB): 15 articoli corti pesano ~30KB come stringhe raw, BlogPreviewSection e in homepage

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Data layer pronto per pagina griglia /blog (BlogGrid) e pagina singolo articolo /blog/:slug
- react-markdown installato, pronto per ArticleRenderer
- blogCategories esportato per futuro filtro per categoria
- 9 articoli senza immagine gestiti con campo undefined — serve placeholder per griglia

## Self-Check: PASSED

- All created files exist on disk
- All commit hashes verified in git log

---
*Phase: 04-pagine-interne*
*Completed: 2026-03-06*
