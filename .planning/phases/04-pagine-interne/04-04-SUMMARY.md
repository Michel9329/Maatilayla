---
phase: 04-pagine-interne
plan: 04
subsystem: chi-siamo
tags: [section, youtube, lazy-load, parallax, two-column]
dependency_graph:
  requires: [04-03-ValoriSection]
  provides: [StrutturaDSection]
  affects: [src/pages/ChiSiamo.tsx]
tech_stack:
  added: []
  patterns: [youtube-facade, intersection-observer-bidirectional, gsap-parallax-scrub]
key_files:
  created:
    - src/components/sections/StrutturaDSection.tsx
  modified:
    - src/index.css
decisions:
  - YouTube facade con youtube-nocookie.com (privacy by design) — nessuna risorsa caricata prima del click
  - Placeholder immagine struttura: maatilayla-barboncino-toy-relax-sole.webp in attesa di foto specifica casetta
  - Animazione entrance IntersectionObserver bidirezionale (replica pattern AllevamentoSection)
metrics:
  duration: ~2min
  completed: 2026-03-05
---

# Phase 4 Plan 04: StrutturaDSection Summary

## One-liner

Sezione struttura con layout due colonne, YouTube facade click-to-load (youtube-nocookie.com) e parallax GSAP.

## What was built

`StrutturaDSection` e il relativo CSS in `src/index.css`:

- Componente React con layout `grid` due colonne (testo sinistra, stack foto+video destra)
- Testo descrittivo in tre paragrafi estratto da `la-struttura.md` (casetta barboni, campo agility, obiettivo)
- Badge "La Struttura" con punto animato `pulse-dot` (pattern coerente con le sezioni precedenti)
- Immagine con GSAP parallax scrub `yPercent -8 → +8` tramite `gsap.context`
- YouTube facade: thumbnail da `img.youtube.com/vi/{id}/sddefault.jpg` + play button SVG rosso; al click si rimpiazza con `<iframe>` puntando a `youtube-nocookie.com/embed/{id}?autoplay=1`
- IntersectionObserver bidirezionale (`rootMargin: '-12% 0px'`) con classe `st-entered` — stesso pattern di `AllevamentoSection` e `ValoriSection`
- `id="struttura"` sul `<section>` per il deep-link dal Hero CTA

## CSS aggiunto (src/index.css)

Blocco `st-` (sezione, blocco, badge, titolo, corpo, media, immagine) + blocco `yt-` (facade, wrapper iframe, play button SVG). Responsive: colonna singola su `max-width: 768px`, padding `0 3rem` su `min-width: 1440px`.

## Tasks completati

| Task | Nome | Commit | Files |
|------|------|--------|-------|
| 1 | StrutturaDSection con testo + foto + YouTube facade | 687ab22 | src/components/sections/StrutturaDSection.tsx |
| 2 | CSS prefissi st- e yt- in index.css | 587d673 | src/index.css |

## Deviations from Plan

Nessuna — piano eseguito esattamente come scritto.

## Self-Check: PASSED

- `src/components/sections/StrutturaDSection.tsx` — FOUND
- `src/index.css` aggiornato con `.st-section` e `.yt-facade` — FOUND
- Commit 687ab22 — FOUND
- Commit 587d673 — FOUND
- Build production: zero errori TypeScript, zero errori ESLint
