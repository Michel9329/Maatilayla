# Phase 4: Blog/Articolo Rework - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning
**Source:** PRD Express Path (inline — user Q&A session)

<domain>
## Phase Boundary

Rework delle pagine Blog griglia e Articolo singolo gia' costruite (04-08/09/10). Aggiunge sidebar sticky, headlines articoli, breadcrumbs, hero compatto, CTA sezioni, e riduce arancione con verde salvia. Non tocca Galleria ne' altre pagine.

</domain>

<decisions>
## Implementation Decisions

### Hero Blog Griglia (/blog)
- Processare foto AB27EBFC-BD02-4411-B276-013005E4A521.jpeg con sharp -> maatilayla-header-blog.webp
- Riusare HeroSection esistente con nuova foto e card stile coerente con Chi Siamo/Galleria

### Blog Grid
- Grid gia' funzionante, non toccare
- Aggiungere CTA sezione prima di ContactSection -> punta a /chi-siamo
- CTA stile foto background (come ChiSiamoCta/FaqCtaSection)

### Colori verde salvia
- Ridurre arancione (#C8614A) alternando con verde salvia (#8BAD91) su badge e accenti secondari
- Valutare caso per caso nelle pagine blog

### Hero Articolo Singolo (/blog/:slug)
- Riusare HeroSection in versione compatta
- Foto full-width, overlay scuro solo se necessario per leggibilita'
- Contenuto hero: breadcrumb (Home > Blog > Titolo, cliccabili) + titolo + mini riassunto (2 righe) + data

### Sidebar Sticky (NUOVO)
- TOC (sommario) generato da H2/H3 dell'articolo
- Articoli correlati (2-3 card compatte)
- Tag/categorie
- CTA contatti (card compatta)
- Foto Instagram con hover -> https://www.instagram.com/maatilayla
- Sidebar sticky on scroll (position: sticky)
- Mobile: sidebar sotto articolo o collapsible

### Headlines Articoli (NUOVO)
- I 15 .md non hanno H2/H3 — Claude propone headlines, utente approva
- Headlines necessarie per leggibilita' e per generare TOC sidebar
- Processo iterativo: proposta -> approvazione -> inserimento nei .md

### CTA Fine Articolo
- Stile A: foto background + testo + bottone (pattern ChiSiamoCta/FaqCtaSection)
- Destinazione da decidere dopo aver visto il risultato (placeholder /contatti)

### Navigazione Articolo
- Prev/next gia' presente, mantenere

### Claude's Discretion
- Layout esatto sidebar (larghezza, spacing, breakpoints)
- Algoritmo articoli correlati (stesso tag? piu' recenti?)
- Stile card sidebar (compatte, mini-preview)
- Breakpoint mobile per sidebar (collapsible vs sotto articolo)
- Scelta specifica di quali badge/accenti diventano verde salvia
- Formato data nell'hero articolo
- Animazioni entrata sidebar

</decisions>

<specifics>
## Specific Ideas

- Pattern CTA: word-by-word GSAP desktop, IntersectionObserver mobile (come ChiSiamoCta)
- Sidebar TOC: click su heading -> smooth scroll alla sezione
- Sidebar Instagram: foto con overlay gradient + icona Instagram + "Seguici"
- Breadcrumb: separatore ">" cliccabile, ultimo elemento non cliccabile
- Verde salvia (#8BAD91) gia' usato in: ContactSection Chi Siamo, AllevamentoSection pills, FuturiPadroniSection icons

</specifics>

<deferred>
## Deferred Ideas

- Foto mancanti articoli (9 senza copertina) — utente fornira' successivamente
- Approvazione headlines — processo interattivo post-piano

</deferred>

---

*Phase: 04-pagine-interne (Blog Rework)*
*Context gathered: 2026-03-06 via PRD Express Path*
