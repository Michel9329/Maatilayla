---
phase: 04-pagine-interne
plan: 15
subsystem: ui
tags: [react, gsap, sidebar, toc, blog, article, intersection-observer]

requires:
  - phase: 04-pagine-interne
    provides: "BlogArticle.tsx con ArticleRenderer, H2 heading IDs, blogArticles data layer"
provides:
  - "Pagina articolo ridisegnata con hero compatto + layout 2 colonne"
  - "ArticleSidebar sticky con TOC, correlati, categorie, CTA, Instagram"
  - "ArticleCta con foto background e GSAP word-by-word"
affects: [blog, pagine-interne]

tech-stack:
  added: []
  patterns: ["as-* CSS namespace per sidebar articolo", "ac-* CSS namespace per CTA articolo", "IntersectionObserver per active heading TOC"]

key-files:
  created:
    - src/components/sections/ArticleSidebar.tsx
    - src/components/sections/ArticleCta.tsx
  modified:
    - src/pages/BlogArticle.tsx
    - src/index.css

key-decisions:
  - "Hero custom inline (non HeroSection) per supportare breadcrumb + meta sovrapposti"
  - "extractHeadings() in BlogArticle.tsx con regex su markdown raw (non DOM)"
  - "ArticleCta dimensioni contenute (max-width 900px, min-height 320px) per stare dentro ba-main"
  - "Foto impegno.webp per ArticleCta (diversa da BlogCta che usa cta-chi-siamo-background)"

patterns-established:
  - "Sidebar sticky pattern: position sticky top 6rem, static sotto 1024px"
  - "TOC active state via IntersectionObserver con rootMargin -80px 0px -60% 0px"

requirements-completed: []

duration: ~4min
completed: 2026-03-06
---

# Phase 04 Plan 15: Articolo Singolo Redesign Summary

**Pagina articolo ridisegnata con hero compatto (foto + breadcrumb + meta), layout 2 colonne (articolo + sidebar sticky TOC/correlati/CTA), e CTA fine articolo con GSAP word-by-word**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-06T12:31:48Z
- **Completed:** 2026-03-06T12:36:13Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Hero compatto con foto background, overlay gradient, breadcrumb cliccabili, titolo H1 e meta (categoria + data + reading time)
- Layout grid 2 colonne su desktop (1fr + 320px), colonna singola su mobile
- Sidebar sticky con TOC (active heading via IntersectionObserver), articoli correlati, categorie pill, CTA contatti e link Instagram
- ArticleCta con foto background, badge pulse, GSAP word-by-word su desktop, IntersectionObserver CSS su mobile

## Task Commits

1. **Task 1: Hero compatto + layout 2 colonne** - `2e5ac09` (feat)
2. **Task 2: ArticleSidebar + ArticleCta + CSS** - `f54ce22` (feat)

## Files Created/Modified
- `src/pages/BlogArticle.tsx` - Ridisegnata con hero custom, layout grid, import sidebar e CTA
- `src/components/sections/ArticleSidebar.tsx` - Sidebar con TOC, correlati, categorie, CTA contatti, Instagram
- `src/components/sections/ArticleCta.tsx` - CTA fine articolo pattern bc- con prefisso ac-
- `src/index.css` - CSS ba-hero-*, ba-layout, as-*, ac-* (~350 righe aggiunte)

## Decisions Made
- Hero custom inline invece di HeroSection (che non supporta children arbitrari per breadcrumb/meta)
- extractHeadings() usa regex su markdown raw anziche DOM — piu affidabile e sincrono
- Articoli correlati: stessa categoria prima, poi recenti di altre categorie se insufficienti
- Foto impegno.webp per ArticleCta, diversa da cta-chi-siamo-background di BlogCta
- Sidebar sticky solo su desktop (>= 1024px), static su mobile sotto il contenuto

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Articolo singolo completo con design editoriale
- Pronto per plan 16 (foto copertina articoli)
- TOC funzionante con heading IDs generati in plan 14

---
*Phase: 04-pagine-interne*
*Completed: 2026-03-06*
