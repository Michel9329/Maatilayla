---
phase: 04-pagine-interne
plan: 19
subsystem: contatti
tags: [contatti, mapbox, info-cards, mappa]
dependency_graph:
  requires: []
  provides: [ContactInfoSection, ContactMapSection]
  affects: [Contatti.tsx]
tech_stack:
  added: [mapbox-gl, "@types/mapbox-gl"]
  patterns: [IntersectionObserver lazy-load, dynamic import, CSS namespace ci-*/cm-*]
key_files:
  created:
    - src/components/sections/ContactInfoSection.tsx
    - src/components/sections/ContactMapSection.tsx
  modified:
    - src/index.css
    - .env.example
    - package.json
    - package-lock.json
decisions:
  - "color-mix() per background callout trasparente (20% primary-pale)"
  - "Dynamic import mapbox-gl per lazy loading effettivo del bundle"
  - "Popup marker aperto al click (non al load) per non sovraccaricare"
  - "setPaintProperty con cast any per compatibilita con union type Mapbox"
metrics:
  tasks_completed: 3
  tasks_total: 3
  completed_date: "2026-03-06"
---

# Phase 04 Plan 19: ContactInfoSection + ContactMapSection Summary

Sezione info contatti con 4 card dati (indirizzo, telefono, email, orari), callout visite su appuntamento con CalendarClock, e mappa Mapbox lazy-loaded con stile pastello nei colori del sito.

## Completed Tasks

| # | Task | Files |
|---|------|-------|
| 1 | Installare mapbox-gl e configurare env | package.json, .env.example |
| 2 | ContactInfoSection — card info + callout visite | ContactInfoSection.tsx, index.css |
| 3 | ContactMapSection — mappa Mapbox pastello | ContactMapSection.tsx, index.css |

## Implementation Details

### ContactInfoSection
- 4 card info con icone Lucide in cerchio primary-pale: MapPin, Phone, Mail, Clock
- Link funzionanti: tel:, mailto:, Google Maps (target blank)
- Callout visite con bordo sinistro primary e sfondo color-mix 20% primary-pale
- Icona CalendarClock, testo privacy famiglia, nota cellulare non raggiungibile
- IntersectionObserver con translate entrance, check prefers-reduced-motion
- CSS namespace ci-*, responsive (1 colonna sotto 768px)

### ContactMapSection
- Lazy load via IntersectionObserver (threshold 0, rootMargin 200px)
- Dynamic import di mapbox-gl (non caricato nel bundle principale)
- Stile base light-v11 con paint overrides pastello: acqua #E8DDD0, terra #F0E8DC, strade #D4B896/#EDE5D8, edifici #E0D4C4, label #6B5040
- Marker #C8614A con popup (nome allevamento, indirizzo, link Google Maps)
- NavigationControl per zoom/rotazione accessibili
- Fallback senza token: placeholder con icona MapPin, indirizzo e link Google Maps
- Cleanup map.remove() su unmount
- CSS namespace cm-*, altezza responsive (400/450/500px)

### Dipendenze aggiunte
- `mapbox-gl` (runtime)
- `@types/mapbox-gl` (devDependency)
- `VITE_MAPBOX_TOKEN` in .env.example

## Deviations from Plan

None - piano eseguito esattamente come scritto.

## Notes

- Gli errori TypeScript in WorldMapSection.tsx sono pre-esistenti (verificato con git stash) e non correlati a questo piano
- I componenti non sono ancora integrati in Contatti.tsx — questo sara compito del piano 04-20
- Il token Mapbox dovra essere configurato in .env.local per la mappa interattiva; senza token il fallback funziona correttamente
