---
phase: 04-pagine-interne
plan: 17
subsystem: faq
tags: [faq, accordion, data-layer, css-animations]
dependency-graph:
  requires: []
  provides: [faqData, FaqIntroSection, FaqAccordionSection]
  affects: [Faq.tsx, index.css]
tech-stack:
  added: []
  patterns: [grid-template-rows-transition, intersection-observer-entrance, data-attribute-toggle]
key-files:
  created:
    - src/data/faqData.ts
    - src/components/sections/FaqIntroSection.tsx
    - src/components/sections/FaqAccordionSection.tsx
  modified:
    - src/index.css
    - src/pages/Faq.tsx
decisions:
  - Usato grid-template-rows 0fr/1fr per transizione altezza smooth
  - Usato data-open attribute per toggle stato CSS
  - Integrato sezioni direttamente in Faq.tsx
metrics:
  tasks-completed: 3
  tasks-total: 3
  files-created: 3
  files-modified: 2
---

# Phase 04 Plan 17: FAQ Data Layer, Intro e Accordion Summary

Data layer con 17 FAQ in 5 categorie, sezione intro "Una scelta consapevole" e accordion con apertura singola e transizione grid-template-rows.

## Tasks Completed

| Task | Name | Files |
|------|------|-------|
| 1 | Data layer FAQ | src/data/faqData.ts |
| 2 | FaqIntroSection | src/components/sections/FaqIntroSection.tsx, src/index.css |
| 3 | FaqAccordionSection + integrazione | src/components/sections/FaqAccordionSection.tsx, src/index.css, src/pages/Faq.tsx |

## Implementation Details

### Task 1: faqData.ts
- Interfacce `FaqItem` e `FaqCategory` esportate
- 5 categorie: Cessione e Prenotazione (6), Salute e Vaccinazioni (3), Cura e Gestione (4), Alimentazione (2), Biosensor e Socializzazione (2)
- 17 FAQ totali: 8 riadattate dal WordPress originale + 9 nuove
- Risposte con HTML semplice (strong, em, br) per formattazione

### Task 2: FaqIntroSection
- Badge "Una scelta consapevole" con dot pulsante
- Titolo "Informarsi e il primo passo." con accent primary
- 2 paragrafi riadattati dal testo WordPress originale
- CSS namespace fi-* con entrance animation IntersectionObserver
- Reduced motion check

### Task 3: FaqAccordionSection
- Accordion con apertura singola (state openId)
- Toggle via data-open attribute sul .fa-item
- Transizione altezza con grid-template-rows 0fr -> 1fr
- Chevron rotazione 180deg su apertura
- Accessibilita: aria-expanded, aria-controls, role="region", aria-labelledby, focus-visible
- CSS namespace fa-* responsive (768px breakpoint)
- Reduced motion: disabilita tutte le transizioni
- Integrato in Faq.tsx sotto HeroSection

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing functionality] Integrazione in Faq.tsx**
- **Found during:** Task 3
- **Issue:** Il piano non specificava l'integrazione delle sezioni in Faq.tsx, ma senza import la pagina non mostrerebbe i componenti
- **Fix:** Aggiunto import e rendering di FaqIntroSection e FaqAccordionSection in Faq.tsx
- **Files modified:** src/pages/Faq.tsx

## Build Status

- `npx tsc --noEmit`: passa senza errori
- `npm run build`: errori pre-esistenti in WorldMapSection.tsx (non correlati a questo piano)

## Self-Check: PASSED
