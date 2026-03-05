---
phase: 04-pagine-interne
plan: 06
subsystem: chi-siamo
tags: [world-map, svg, react-simple-maps, geojson, interactive]
dependency_graph:
  requires: []
  provides: [WorldMapSection, wm-destinations-json, countries-110m-geojson]
  affects: [src/pages/ChiSiamo.tsx]
tech_stack:
  added: ["@vnedyalk0v/react19-simple-maps@2.0.2"]
  patterns: [IntersectionObserver-bidirezionale, CSS-translate-animate, SVG-tooltip-title]
key_files:
  created:
    - src/components/sections/WorldMapSection.tsx
    - src/data/wm-destinations.json
    - public/content/data/countries-110m.json
  modified:
    - src/index.css
    - package.json
    - package-lock.json
decisions:
  - "Fork React 19 @vnedyalk0v/react19-simple-maps usato invece dell'originale zcreativelabs (incompatibile React 19)"
  - "Cast a Coordinates branded type per compatibilità TypeScript della libreria"
  - "Tooltip SVG nativo <title> — nessun JS aggiuntivo necessario"
  - "GeoJSON scaricato in public/content/data/ — zero dipendenza CDN a runtime"
  - "Dati destinazioni placeholder (IT, FR, CH, DE) — dati reali arriveranno dall'utente"
metrics:
  duration: "~2min"
  completed: "2026-03-05"
  tasks_completed: 2
  files_changed: 6
---

# Phase 4 Plan 06: WorldMapSection — Mappa SVG Interattiva

**One-liner:** Mappa SVG del mondo con marker rossi sui paesi di destinazione cuccioli, usando @vnedyalk0v/react19-simple-maps (fork React 19) con dati configurabili in JSON.

## What Was Built

WorldMapSection: sesta sezione della pagina Chi Siamo che mostra una mappa interattiva del mondo con marker rossi sui paesi dove sono andati cuccioli Maatilayla. Feature "wow" che chiude il racconto narrativo della pagina.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Setup — npm install, GeoJSON, placeholder JSON | d8f00b5 | package.json, countries-110m.json, wm-destinations.json |
| 2 | WorldMapSection componente + CSS wm- | 980d28c | WorldMapSection.tsx, index.css |

## Technical Decisions

- **Libreria:** `@vnedyalk0v/react19-simple-maps` v2.0.2 — fork attivo di react-simple-maps compatibile con React 19. L'originale zcreativelabs non supporta React 19 (peer dep dichiarata per 16-18).
- **Proiezione:** `geoEqualEarth` con scale 147 — rappresentazione più fedele delle dimensioni dei continenti rispetto a Mercator.
- **GeoJSON locale:** `public/content/data/countries-110m.json` scaricato da world-atlas@2 — zero richieste CDN a runtime.
- **Tooltip:** `<title>` SVG nativo — accessibile (screen reader), nessun JS aggiuntivo, mostra nome paese + numero cuccioli.
- **TypeScript branded types:** Il tipo `Coordinates` della libreria usa branded types (`Longitude`, `Latitude`). Fix: cast `dest.coordinates as unknown as Coordinates`.
- **Dati placeholder:** 4 destinazioni (Italia, Francia, Svizzera, Germania) — struttura `[{ id, name, coordinates: [lon, lat], count }]` configurabile dall'utente.
- **Colori brand:** paesi fill `--color-accent` (#D4B896 beige sabbia), marker `--color-primary` (#C8614A rosso).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fix TypeScript branded Coordinates type**
- **Found during:** Task 2 — prima build
- **Issue:** TypeScript error `Type '[number, number]' is not assignable to type 'Coordinates'` — la libreria usa branded types `Longitude` e `Latitude` incompatibili con `number` plain
- **Fix:** Cast esplicito `dest.coordinates as unknown as Coordinates` con import del tipo dalla libreria
- **Files modified:** src/components/sections/WorldMapSection.tsx
- **Commit:** 980d28c (incluso nel commit del componente)

## Self-Check

### Files
- FOUND: src/components/sections/WorldMapSection.tsx
- FOUND: src/data/wm-destinations.json
- FOUND: public/content/data/countries-110m.json

### Commits
- FOUND: d8f00b5 (chore setup)
- FOUND: 980d28c (feat componente)

### Build
- `npm run build` — zero errori TypeScript, zero errori ESLint. Build pulita.

## Self-Check: PASSED
