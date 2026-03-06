# Phase 04-17/18: Pagina F.A.Q. - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Pagina F.A.Q. completa: sezione introduttiva, accordion animato con 17 FAQ raggruppate per categoria, CTA section con foto background, ContactSection e InstagramFeedSection. Hero section gia implementata.

</domain>

<decisions>
## Implementation Decisions

### Struttura pagina
- Hero (gia fatto) -> Intro -> FaqSection (accordion) -> FaqPageCta -> ContactSection -> InstagramFeedSection
- Sezione intro "Una scelta consapevole" sopra l'accordion (testo dal WordPress originale, riadattato)

### Accordion FAQ
- **17 FAQ totali** raggruppate in 5 categorie:
  1. **Cessione e Prenotazione** (6 FAQ): cessione 3 mesi, pedigree ENCI 7-8 mesi, caparra dopo visita, rifiuto spedizione, kit di partenza, scelta cucciolo
  2. **Salute e Vaccinazioni** (3 FAQ): uscire subito, test genetici (prcd-PRA, lussazione rotulea), garanzie sanitarie
  3. **Cura e Gestione** (4 FAQ): bisogni, cappottino inverno, lavaggio/spazzolatura, perdita pelo (ipoallergenico)
  4. **Alimentazione** (2 FAQ): pasti giornalieri, tipologia cibo + starter-kit
  5. **Il Programma Biosensor** (1 FAQ): stimolazione sensoriale neonatale + taglia adulta toy
- **Apertura singola**: cliccando una nuova domanda si chiude quella aperta
- Animazione CSS smooth (height transition o max-height)
- Icona chevron che ruota su apertura

### Contenuti nuovi da scrivere
- Kit di partenza: mangime, libretto sanitario, pedigree, contratto cessione
- Scelta del cucciolo: l'allevatore guida la scelta in base a carattere/esigenze famiglia
- Test genetici: prcd-PRA, lussazione rotulea, certificato veterinario genitori
- Garanzie sanitarie: contratto, certificato vet, copertura vaccinale completa
- Perdita pelo: no sottopelo, pelo simile a capello umano, ipoallergenico
- Taglia adulta: peso e altezza barboncino toy, differenze maschio/femmina

### CTA section
- **Foto background + testo** (pattern FaqCtaSection homepage / ChiSiamoCta)
- Badge + titolo + body + bottone "Contattaci" -> /contatti
- Foto barboncino con blur/overlay, testi in chiaro sopra

### Claude's Discretion
- Design esatto delle card categoria (titolo + numero FAQ o titolo + icona)
- Animazione entrance dell'accordion (CSS transition con IntersectionObserver)
- Scelta foto per la CTA section
- Layout esatto intro section (testo centrato vs testo + immagine laterale)

</decisions>

<specifics>
## Specific Ideas

- Le 8 FAQ originali dal WordPress vanno mantenute nel tono e contenuto, riadattate per il nuovo sito
- Le 3 FAQ da memoria (pedigree, caparra, spedizione) rafforzano il messaggio di serieta dell'allevamento
- Le 6 FAQ nuove (kit, scelta, test, garanzie, pelo, taglia) completano l'informazione per i futuri padroni
- Categorie aiutano a orientarsi rapidamente — il visitatore potrebbe cercare solo "alimentazione"
- La nota "visite solo su appuntamento" NON va ripetuta qui (e' nella ContactSection)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ContactSection`: componente riusabile gia in Home, Chi Siamo, Galleria, Blog
- `InstagramFeedSection`: marquee riusabile
- `HeroSection`: gia implementato per FAQ con hero image e CTA
- Pattern CTA: FaqCtaSection, ChiSiamoCta, BlogCta, GalleriaCta — pattern consolidato

### Established Patterns
- CSS transition + IntersectionObserver per entrance animations (no GSAP per entrate)
- CSS namespace per componente (es. `fq-` per FAQ)
- `prefers-reduced-motion` check su tutte le animazioni
- Sezioni alternano sfondo cream/warm-white

### Integration Points
- `Faq.tsx` gia esiste come stub con Hero — aggiungere sezioni sotto
- Route `/faq` gia configurata in React Router
- Hash scroll `#faq` gia nel CTA hero — deve puntare alla FaqSection

</code_context>

<deferred>
## Deferred Ideas

- Schema markup FAQ (FAQPage JSON-LD) — Phase 8 SEO
- Ricerca/filtro FAQ — non necessario con 17 domande
- FAQ multilingua — Phase 9

</deferred>

---

*Phase: 04-pagine-interne (FAQ)*
*Context gathered: 2026-03-06*
