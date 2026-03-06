---
phase: 04-pagine-interne
plan: 20
subsystem: contatti
tags: [contatti, assembly, lazy-loading, seo]
dependency_graph:
  requires: [ContactInfoSection, ContactMapSection]
  provides: [Contatti-page-complete]
  affects: [Contatti.tsx]
tech_stack:
  added: []
  patterns: [React.lazy + Suspense, canonical link]
key_files:
  created: []
  modified:
    - src/pages/Contatti.tsx
decisions:
  - "React.lazy + Suspense fallback={null} per ContactMapSection (mapbox-gl pesante)"
  - "Nessuna CTA section tra contenuto e ContactSection (pagina gia orientata al contatto)"
  - "OG image aggiornata a header-contatti.webp"
metrics:
  tasks_completed: 1
  tasks_total: 2
  completed_date: "2026-03-06"
---

# Phase 04 Plan 20: Assembly pagina Contatti Summary

Pagina Contatti assemblata con 5 sezioni: Hero, ContactInfoSection (card info + callout visite), ContactMapSection (lazy-loaded via React.lazy), ContactSection (form EmailJS), InstagramFeedSection. SEO aggiornato con canonical link e descrizione che menziona mappa.

## Completed Tasks

| # | Task | Files |
|---|------|-------|
| 1 | Assembly pagina Contatti.tsx | src/pages/Contatti.tsx |

## Implementation Details

### Contatti.tsx Assembly
- Aggiornato da stub (solo Hero) a pagina completa con 5 sezioni
- ContactMapSection caricato con `React.lazy()` + `<Suspense fallback={null}>` per evitare di caricare mapbox-gl nel bundle principale
- Vite produce chunk separato: `ContactMapSection-DnRQsnV4.js` (1.27 kB gzipped 0.70 kB)
- Ordine sezioni: HeroSection -> ContactInfoSection -> ContactMapSection -> ContactSection -> InstagramFeedSection

### SEO
- Aggiunto `<link rel="canonical">` per /contatti
- Meta description aggiornata: menziona "orari e mappa a Bassano Romano (VT)"
- OG description allineata alla meta description
- OG image aggiornata a header-contatti.webp

## Deviations from Plan

None - task 1 eseguita esattamente come pianificato.

## Notes

- Task 2 (checkpoint visivo) non ancora eseguita - richiede verifica utente
- Build passa pulita con `npx vite build` (4.19s)
- Errori TS pre-esistenti in WorldMapSection.tsx ignorati come da istruzioni
