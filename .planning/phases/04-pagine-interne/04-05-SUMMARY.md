---
phase: 04-pagine-interne
plan: 05
subsystem: chi-siamo
tags: [timeline, scroll-snap, css-only, intersection-observer, mobile]
dependency_graph:
  requires: [04-04-StrutturaDSection]
  provides: [TimelineSection]
  affects: [src/pages/ChiSiamo.tsx]
tech_stack:
  added: []
  patterns: [IntersectionObserver bidirezionale, scroll-snap CSS, dot indicatori mobile]
key_files:
  created:
    - src/components/sections/TimelineSection.tsx
  modified:
    - src/index.css
decisions:
  - Array milestones hardcoded nel componente con struttura configurabile per aggiunta future tappe
  - Dot indicatori sincronizzati tramite scroll listener passivo (passive: true)
  - IntersectionObserver bidirezionale con rootMargin -10% per evitare trigger immediato
  - CSS-only senza librerie — scroll-snap nativo supportato da tutti i browser target
metrics:
  duration: ~3min
  completed: 2026-03-05
  tasks: 2
  files: 2
---

# Phase 4 Plan 05: TimelineSection Summary

Timeline orizzontale CSS-only con 5 tappe storiche Maatilayla (2018-2020), scroll-snap mobile, dot indicatori sincronizzati e animazione IntersectionObserver bidirezionale.

## Tasks Completati

| Task | Descrizione | Commit | File |
|------|-------------|--------|------|
| 1 | TimelineSection.tsx — componente con array milestones, IntersectionObserver, scroll listener | fba56cc | src/components/sections/TimelineSection.tsx |
| 2 | CSS prefisso tl- in index.css — layout, scroll-snap, dot, animazione entrata | c23c62a | src/index.css |

## Cosa e' stato costruito

**TimelineSection** e' il componente che racconta la storia della struttura Maatilayla in ordine cronologico. Si posiziona dopo StrutturaDSection nella pagina Chi Siamo — prima si vede com'e' oggi la struttura, poi la timeline racconta come ci si e' arrivati.

### Struttura dati

5 tappe con `{ year, milestone, description }`:

1. **Prima del 2018** — La Fondazione (storia di Jolie)
2. **Ottobre 2018** — Il Trasferimento (lasciare la casa di citta')
3. **Novembre 2018** — I Lavori Iniziano (cani liberi nel nuovo spazio)
4. **Ottobre 2019** — La Casetta dei Barboni (inaugurazione)
5. **Maggio 2020** — Il Campo di Agility (completamento sogno)

### Pattern tecnici

- **Desktop**: 5 tappe visibili in riga orizzontale (`flex: 0 0 clamp(220px, 22vw, 260px)`)
- **Mobile**: una tappa per volta con `scroll-snap-type: x mandatory` e `flex: 0 0 85vw`
- **Linea connessione**: `::before` pseudo-element con gradient `transparent → primary-pale → transparent`
- **Dot sulla linea**: cerchi 14px in `--color-primary` con bordo cream
- **Dot indicatori mobile**: 7px, `display: none` su desktop, `display: flex` su mobile, sincronizzati via `scroll` listener passivo
- **Animazione entrata**: IntersectionObserver bidirezionale con `rootMargin: '-10% 0px'`, transition-delay cascata header → track → dots
- **Accessibilita'**: `role="list"` + `role="listitem"`, `aria-label` sulla section, `aria-hidden` sui decorativi

## Decisioni prese

- **Array nel componente**: testo e date hardcoded direttamente — struttura `{ year, milestone, description }` configurabile per aggiungere future tappe senza modificare JSX
- **Scroll listener passivo**: `{ passive: true }` per performance su mobile (nessun `preventDefault`)
- **IntersectionObserver rootMargin -10%**: evita il trigger quando la sezione e' appena visibile per 1px — attiva l'animazione quando e' effettivamente nel viewport
- **CSS-only timeline**: nessuna libreria necessaria — `scroll-snap-type` e' una feature CSS stabile supportata da tutti i browser target (Chrome 90+, Safari 14+, Firefox 88+)

## Deviations from Plan

None — piano eseguito esattamente come scritto.

## Self-Check

Verifiche post-completamento:

- TimelineSection.tsx esiste: FOUND
- Esporta `default TimelineSection`: confermato
- Array milestones 5 elementi: confermato
- Classi tl- in index.css: 27 occorrenze trovate
- Build production pulita: zero errori TypeScript, zero errori ESLint
