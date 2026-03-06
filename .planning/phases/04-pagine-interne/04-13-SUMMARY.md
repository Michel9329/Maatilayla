---
phase: 04-pagine-interne
plan: 13
subsystem: ui
tags: [blog, cta, hero, gsap, sharp, webp]

requires:
  - phase: 04-pagine-interne
    provides: Blog grid page (plan 09), ChiSiamoCta pattern (plan 07)
provides:
  - Foto hero blog dedicata (maatilayla-header-blog.webp)
  - BlogCta sezione con GSAP word-by-word e link a /chi-siamo
  - Pill categoria blog in verde salvia
affects: [blog-rework, pagine-interne]

tech-stack:
  added: []
  patterns: [bc- CSS namespace per BlogCta, verde salvia #8BAD91 come accento alternativo al primary]

key-files:
  created:
    - public/content/images/maatilayla-header-blog.webp
    - src/components/sections/BlogCta.tsx
  modified:
    - src/pages/Blog.tsx
    - src/index.css

key-decisions:
  - "Overlay scuro (rgba 0,0,0,0.45) al posto di blur radiale — foto CTA diversa da ChiSiamoCta"
  - "Dot badge verde salvia #8BAD91 per coerenza con pill categoria"
  - "Riuso foto maatilayla-cta-chi-siamo-background.webp per BlogCta — nessuna foto aggiuntiva necessaria"

patterns-established:
  - "bc- namespace CSS per BlogCta"

requirements-completed: []

duration: ~3min
completed: 2026-03-06
---

# Phase 04 Plan 13: Blog Rework - Hero + CTA + Pill Verdi Summary

**Hero blog dedicato (80KB webp), BlogCta con GSAP word-by-word verso /chi-siamo, pill categoria in verde salvia #8BAD91**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-06T12:20:41Z
- **Completed:** 2026-03-06T12:23:42Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Foto hero blog processata con sharp (1600x1067, 80KB) da sorgente JPEG 10MB
- BlogCta sezione completa: badge verde salvia, titolo word-by-word GSAP, CTA verso /chi-siamo
- Pill categoria blog cambiate da arancione primary a verde salvia (#5A8C62 testo, rgba(139,173,145,0.12) background)
- Responsive + reduced-motion gestiti su BlogCta

## Task Commits

1. **Task 1+2: Hero + BlogCta + Pill verdi + CSS bc-** - `082bff6` (feat)

**Plan metadata:** pending

## Files Created/Modified
- `public/content/images/maatilayla-header-blog.webp` - Foto hero blog processata (1600x1067, 80KB)
- `src/components/sections/BlogCta.tsx` - CTA sezione con pattern ChiSiamoCta (146 righe)
- `src/pages/Blog.tsx` - Aggiornato hero image, OG tag, importato BlogCta
- `src/index.css` - CSS bc- namespace + pill categoria verde salvia

## Decisions Made
- Overlay scuro uniforme (rgba 0,0,0,0.45) invece di blur radiale come ChiSiamoCta — la foto background e diversa e il blur radiale non funzionava altrettanto bene
- Dot del badge in verde salvia (#8BAD91) per coerenza con le pill categoria, non in primary come ChiSiamoCta
- Riusata foto maatilayla-cta-chi-siamo-background.webp per il BlogCta — stessa foto usata anche nel CTA Galleria/Chi Siamo, evita aggiungere peso al bundle

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Task 1 e 2 combinati in singolo commit**
- **Found during:** Task 1
- **Issue:** Blog.tsx importa BlogCta ma il componente non esisteva ancora — il build fallirebbe con task separate
- **Fix:** Creato BlogCta.tsx + CSS bc- + aggiornato Blog.tsx in un unico commit atomico
- **Verification:** npm run build passa senza errori

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Nessun impatto — entrambi i task completati, solo combinati per coerenza build

## Issues Encountered
- lint-staged v16 "Needed a single revision" error durante commit — risolto eseguendo prettier + eslint manualmente prima del commit con HUSKY=0

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Pagina blog ha hero dedicato, CTA verso chi-siamo, pill verdi
- Pronto per prossimi piani blog rework (foto copertina articoli, sidebar TOC)

---
*Phase: 04-pagine-interne*
*Completed: 2026-03-06*
