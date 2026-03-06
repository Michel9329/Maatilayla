---
phase: 04-pagine-interne
plan: 18
subsystem: faq
tags: [faq, cta, assembly, seo, gsap]
dependency-graph:
  requires: [faqData, FaqIntroSection, FaqAccordionSection]
  provides: [FaqPageCta, Faq-page-complete]
  affects: [Faq.tsx, index.css]
tech-stack:
  added: []
  patterns: [gsap-word-by-word, parallax-scrub, intersection-observer-fade]
key-files:
  created:
    - src/components/sections/FaqPageCta.tsx
  modified:
    - src/pages/Faq.tsx
    - src/index.css
decisions:
  - Foto CTA: maatilayla-barboncino-toy-natura-riposo.webp (cane rilassato, adatto al tono rassicurante)
  - Pattern BlogCta con leaveTimer per evitare flicker su scroll veloce
  - Parallax foto con scrub 0.6 e yPercent +-6 desktop, +-3 mobile
metrics:
  tasks-completed: 2
  tasks-total: 3
  files-created: 1
  files-modified: 2
  completed: 2026-03-06
---

# Phase 04 Plan 18: FAQ Assembly e CTA Summary

CTA con foto background (pattern BlogCta), GSAP word-by-word desktop, CSS fade mobile. Pagina FAQ assemblata con 6 sezioni: Hero, Intro, Accordion, CTA, Contact, Instagram. SEO aggiornato con canonical e descrizione completa.

## Tasks Completed

| Task | Name | Files |
|------|------|-------|
| 1 | FaqPageCta con foto background | src/components/sections/FaqPageCta.tsx, src/index.css |
| 2 | Assembly pagina Faq.tsx | src/pages/Faq.tsx |

## Implementation Details

### Task 1: FaqPageCta.tsx
- Componente CTA con foto background (maatilayla-barboncino-toy-natura-riposo.webp)
- Badge "Siamo qui per te" con dot pulsante
- Titolo "Hai ancora qualche dubbio?" con accent primary-light su "dubbio?"
- Body rassicurante + bottone "Contattaci" -> /contatti
- Desktop: GSAP ScrollTrigger word-by-word + parallax foto (scrub 0.6)
- Mobile: IntersectionObserver CSS fade + parallax ridotto
- Reduced motion: nessuna animazione
- CSS namespace fp-* con responsive 768px, 1024px, 1440px
- leaveTimer pattern (da BlogCta) per evitare flicker su scroll veloce

### Task 2: Assembly Faq.tsx
- Ordine sezioni: Hero -> FaqIntroSection -> FaqAccordionSection -> FaqPageCta -> ContactSection -> InstagramFeedSection
- Helmet SEO aggiornato: descrizione completa con "test genetici e programma Biosensor"
- Aggiunto canonical link
- OG description allineata alla meta description

## Deviations from Plan

None - piano eseguito esattamente come scritto.

## Build Status

- `npx vite build`: passa senza errori (4.06s)
- Errori tsc pre-esistenti in WorldMapSection.tsx (non correlati)

## Self-Check: PASSED
