---
phase: 04-pagine-interne
plan: 01
subsystem: chi-siamo
tags: [sezione, storia, narrativa, animazioni, css, gsap]
dependency_graph:
  requires: []
  provides: [StoriaLaylaSection]
  affects: [src/pages/ChiSiamo.tsx]
tech_stack:
  added: []
  patterns: [IntersectionObserver-bidirezionale, GSAP-parallax-scrub, onError-graceful-fallback]
key_files:
  created:
    - src/components/sections/StoriaLaylaSection.tsx
  modified:
    - src/index.css
decisions:
  - Testo italiano SEO-ottimizzato da la-storia.md: 3 paragrafi narrativi + callout con bordo primary
  - Foto con fallback onError graceful (display none se assente) invece di img condizionale
  - blockquote per callout (semantica corretta) invece di div generico
metrics:
  duration: "129s (~2 min)"
  completed: "2026-03-05"
  tasks_completed: 2
  files_created: 1
  files_modified: 1
---

# Phase 04 Plan 01: StoriaLaylaSection — Sommario

**One-liner:** Sezione narrativa storia Layla con layout foto+testo, IntersectionObserver bidirezionale e parallax GSAP scrub — foto placeholder gestita con fallback graceful.

## Tasks Completati

| # | Nome | Commit | File |
|---|------|--------|------|
| 1 | Crea StoriaLaylaSection con testo SEO e placeholder foto | 346ae50 | src/components/sections/StoriaLaylaSection.tsx |
| 2 | CSS prefisso ls- in src/index.css | 2525fd1 | src/index.css |

## Cosa e' stato costruito

### StoriaLaylaSection.tsx

Componente React che implementa la prima sezione narrativa della pagina Chi Siamo. Segue fedelmente il pattern di AllevamentoSection:

- **Layout:** griglia due colonne (foto sinistra, testo destra) su desktop, colonna singola su mobile
- **Foto:** `aspect-ratio: 4/5`, background `var(--color-primary-pale)` come fallback visivo, `onError` nasconde il tag img se il file non esiste senza crash
- **Animazione entrata:** IntersectionObserver bidirezionale (aggiunge/rimuove `ls-entered`) con `requestAnimationFrame` pre-transition, `rootMargin: '-12% 0px'`
- **Parallax:** GSAP `fromTo yPercent -8 → 8` con `scrub: 0.6` e `force3d: true` sull'img interno, cleanup via `gsap.context().revert()`
- **Accessibilita':** controlla `prefers-reduced-motion` in entrambi i useEffect — mostra tutto senza animazione se abilitato
- **Testo:** 3 paragrafi SEO-ottimizzati da `la-storia.md` + callout blockquote con bordo primary e sfondo primary-pale

### CSS ls- (src/index.css)

Aggiunto blocco CSS in fondo al file con prefisso `ls-` per evitare conflitti:

- `.ls-section` — padding fluido con `clamp(4rem, 8vw, 7rem)`
- `.ls-block` — griglia + transizione entrata (opacity 0 → 1, translate 0 28px → none)
- `.ls-img` — `contain: layout style paint`, `aspect-ratio: 4/5`, background cream fallback
- `.ls-img img` — `height: 120%`, `translate: 0 -10%` per oversizing parallax
- `.ls-badge` — pill con punto rosso `pulse-dot` animato
- `.ls-callout` — bordo sinistro primary, background primary-pale, border-radius asimmetrico
- Stagger `transition-delay` su figli di `.ls-content` (0.08s → 0.36s)
- Responsive: colonna singola sotto 768px, padding widescreen a 1440px+

## Deviazioni dal Piano

Nessuna — piano eseguito esattamente come scritto.

Nota: il punto finale nelle frasi dei paragrafi e' stato omesso solo dove il testo finiva con puntini di sospensione o virgola naturale; tutte le sezioni di titolo seguono la convenzione con punto finale stabilita in homepage.

## Self-Check: PASSED

- [x] `src/components/sections/StoriaLaylaSection.tsx` esiste
- [x] Commit 346ae50 verificato in git log
- [x] Commit 2525fd1 verificato in git log
- [x] Build production pulita: `built in 3.00s` zero errori TypeScript/ESLint
- [x] Esporta `default StoriaLaylaSection`
- [x] CSS classi `ls-section`, `ls-block`, `ls-badge`, `ls-title`, `ls-body`, `ls-callout` presenti in index.css
