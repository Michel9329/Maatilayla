---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: — Sito Completo
current_plan: 04-15
status: executing
stopped_at: Completed 04-15-PLAN.md
last_updated: "2026-03-06T12:36:00.000Z"
progress:
  total_phases: 1
  completed_phases: 1
  total_plans: 16
  completed_plans: 15
---

# Project State — Maatilayla

## Current Position

- **Phase:** 04-pagine-interne
- **Current Plan:** 04-15 (completed)
- **Status:** Phase 04 Blog rework - Articolo singolo redesign complete

## Progress

```
Phase 0 ████████████████████ COMPLETE
Phase 1 ████████████████████ COMPLETE
Phase 2 ████████████████████ COMPLETE
Phase 3 ████████████████████ COMPLETE
Phase 4 ████████████████████ 7/7 Chi Siamo done + Polish done
Phase 4 ████████████████████ Galleria 2/2 done
Phase 4 ███████████████████░ Blog rework 3/4
Phase 5-10                    Pending
```

## Completed Plans

| Phase | Plan | Name | Commit | Date |
|-------|------|------|--------|------|
| 04-pagine-interne | 01 | StoriaLaylaSection | 2525fd1 | 2026-03-05 |
| 04-pagine-interne | 02 | CredenzialiSection | ac8527f | 2026-03-05 |
| 04-pagine-interne | 03 | ValoriSection | d686b41 | 2026-03-05 |
| 04-pagine-interne | 04 | StrutturaDSection | 587d673 | 2026-03-05 |
| 04-pagine-interne | 05 | TimelineSection | c23c62a | 2026-03-05 |
| 04-pagine-interne | 06 | WorldMapSection | 980d28c | 2026-03-05 |
| 04-pagine-interne | 08 | Blog Data Layer + BlogPreview refactor | 6c371c2 | 2026-03-06 |
| 04-pagine-interne | 09 | Blog Grid Page | de586cd | 2026-03-06 |
| 04-pagine-interne | 10 | Blog Article Page + CSS | b5d83ce | 2026-03-06 |
| 04-pagine-interne | 11 | GallerySection (data+component) | 3db9f22 | 2026-03-06 |
| 04-pagine-interne | 12 | Galleria page assembly + CTA | 8ad9b40 | 2026-03-06 |
| 04-pagine-interne | 13 | Blog hero + CTA + pill verdi | 082bff6 | 2026-03-06 |
| 04-pagine-interne | 14 | H2 headlines articoli + heading IDs | 5f6b0ce | 2026-03-06 |
| 04-pagine-interne | 15 | Articolo singolo redesign (hero + sidebar + CTA) | f54ce22 | 2026-03-06 |

## Decisions

- Layout foto+testo usa pattern AllevamentoSection (due colonne, IntersectionObserver bidirezionale, GSAP parallax scrub)
- Foto placeholder gestita con `onError` graceful (display none) — build non dipende dal file immagine
- Testo SEO-ottimizzato da la-storia.md preservando tono narrativo e personale
- ValoriSection: doppia definizione .vl-container CSS — layout + animazione separate, cascade gestisce correttamente
- Sfondo warm-white per ValoriSection alterna con cream di CredenzialiSection — separazione visiva tra sezioni
- Stagger applicato ai gruppi (non alle singole card) — rispetta limite 3 transizioni simultanee CLAUDE.md
- YouTube facade con youtube-nocookie.com (privacy by design) — nessuna risorsa caricata prima del click
- Placeholder immagine struttura in attesa di foto specifica casetta dai cani
- Array milestones hardcoded nel componente con struttura configurabile per future tappe
- CSS-only timeline (scroll-snap nativo) — nessuna libreria necessaria per browser target
- Dot indicatori sincronizzati via scroll listener passivo (passive: true)
- Fork @vnedyalk0v/react19-simple-maps usato al posto dell'originale zcreativelabs (incompatibile React 19)
- Cast a Coordinates branded type per compatibilità TypeScript della libreria react19-simple-maps
- GeoJSON world-atlas scaricato in public/content/data/ — zero dipendenza CDN a runtime
- Tooltip SVG nativo <title> — nessun JS aggiuntivo, accessibile screen reader
- [Phase 04-pagine-interne]: StoriaLaylaSection aveva già id='storia' — nessun wrapper div necessario in ChiSiamo.tsx
- [Phase 04-pagine-interne]: Pattern CTA word-by-word ereditato da FaqCtaSection per coerenza visiva tra pagine
- [Phase 04-11]: CSS column-count per masonry (zero JS, supporto universale) invece di librerie JS
- [Phase 04-11]: Lightbox usa filteredPhotos come slides per sincronizzazione index corretta
- [Phase 04-08]: Import statico ?raw per tutti i 15 .md blog — nessun import dinamico (incompatibile Vite prod)
- [Phase 04-08]: blogPreviewArticles importato in homepage — aumento chunk ~58KB accettabile per 15 articoli corti
- [Phase 04]: CSS bg-* namespace per blog grid, JSON-LD Blog+BlogPosting schema, SVG inline fallback card senza immagine
- [Phase 04-10]: Prev/next navigazione: prev = piu vecchio (indice+1), next = piu recente (indice-1) in blogArticlesSorted
- [Phase 04-10]: Regex cleanup markdown: rimuove H1 e riga data per evitare duplicazione con header pagina
- [Phase 04]: CTA galleria inline (non componente separato) — pattern semplificato senza foto background
- [Phase 04-13]: Overlay scuro uniforme per BlogCta (non blur radiale) — foto diversa da ChiSiamoCta
- [Phase 04-13]: Dot badge verde salvia #8BAD91 per coerenza con pill categoria blog
- [Phase 04-13]: Riuso foto cta-chi-siamo-background.webp per BlogCta — nessuna foto aggiuntiva
- [Phase 04-14]: Solo H2 (no H3) per semplicita e pulizia TOC
- [Phase 04-14]: slugify() gestisce caratteri accentati italiani per id heading
- [Phase 04-14]: extractText() ricorsiva per nodi React complessi da react-markdown
- [Phase 04-15]: Hero custom inline (non HeroSection) per breadcrumb/meta sovrapposti
- [Phase 04-15]: extractHeadings() regex su markdown raw (sincrono, no DOM)
- [Phase 04-15]: Foto impegno.webp per ArticleCta (diversa da BlogCta)
- [Phase 04-15]: Sidebar sticky solo desktop >= 1024px, static su mobile

## Performance Metrics

| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 04 | 01 | ~2min | 2 | 2 |
| 04 | 02 | ~10min | 2 | 2 |
| 04 | 03 | ~15min | 2 | 2 |
| 04 | 04 | ~2min | 2 | 2 |
| 04 | 05 | ~3min | 2 | 2 |
| 04 | 06 | ~2min | 2 | 6 |
| Phase 04-pagine-interne P07 | 5 | 2 tasks | 3 files |
| 04 | 08 | ~3min | 2 | 5 |
| 04 | 11 | ~3min | 2 | 3 |
| Phase 04 P09 | ~3min | 2 tasks | 3 files |
| 04 | 10 | ~3min | 2 | 4 |
| Phase 04 P12 | ~2min | 2 tasks | 2 files |
| 04 | 13 | ~3min | 2 | 4 |
| 04 | 14 | ~3min | 2 | 16 |
| 04 | 15 | ~4min | 2 | 4 |

## Accumulated Context

### Roadmap Evolution
- Phase 04 Chi Siamo: 7/7 piani completati
- Phase 04 Polish Homepage e Chi Siamo: aggiunto (da pianificare)
- Phase 04 Blog: aggiunto (da pianificare)
- Phase 04 Galleria: aggiunto (da pianificare)

## Last Session

- **Stopped At:** Completed 04-15-PLAN.md
- **Timestamp:** 2026-03-06
- **Next:** Blog rework continua — piano 16 (foto copertina articoli)
