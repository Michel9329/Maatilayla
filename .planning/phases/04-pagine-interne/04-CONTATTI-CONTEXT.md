# Phase 04-19/20: Pagina Contatti - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Pagina Contatti completa: sezione info con card contatti + mappa Mapbox personalizzata in stile pastello, callout visite su appuntamento, ContactSection (form EmailJS), InstagramFeedSection. Hero section gia implementata. Nessuna CTA section necessaria (la pagina stessa e' orientata al contatto).

</domain>

<decisions>
## Implementation Decisions

### Struttura pagina
- Hero (gia fatto) -> ContactInfoSection (info + mappa) -> Callout visite -> ContactSection (form) -> InstagramFeedSection
- **Nessuna CTA section** tra contenuto e ContactSection (la pagina e' gia tutta orientata al contatto)
- **Nessuna mini-FAQ** — link rimanda a /faq

### ContactInfoSection
- Card info con dati dal sito WordPress:
  - Orari: Lun-Sab 9:00-13:00 | 15:30-19:00 (solo chiamate)
  - Telefono: 07 61 179 0344 + 338 761 7628
  - Email: maatilayla.org@gmail.com
  - Indirizzo: Strada Vicinale Pianamola 6, 01030 Bassano Romano (VT)
- **Nessun pulsante WhatsApp dedicato** (numero gia presente nella ContactSection info card)

### Mappa Mapbox
- **Mapbox GL JS** con stile custom in colori pastello/caldi (warm beige, cream, toni della palette sito)
- Mappa navigabile (zoom, pan) con marker su Bassano Romano
- Stile personalizzato via Mapbox Studio (colori #FDF6EE, #FAE0D0, #D4B896 per terreno/strade/acqua)
- API key gratuita (50k views/mese free tier) — in `.env.local` come `VITE_MAPBOX_TOKEN`
- Lazy load della mappa (IntersectionObserver, carica solo quando visibile)
- Border-radius var(--radius-card), ombra sottile

### Callout visite su appuntamento
- **Box callout evidenziato** (stile simile al callout Biosensor in AllevamentoSection)
- Icona + testo chiaro: sede = casa della famiglia, visite solo previo appuntamento
- Nota disservizi cellulare: contattare via WhatsApp o email se non raggiungibile
- NON invitare a visitare — solo informare che visite richiedono appuntamento previo contatto

### Claude's Discretion
- Layout esatto delle card info (grid, flex, disposizione)
- Design del marker Mapbox (pin custom con colore primary o marker standard stilizzato)
- Posizionamento mappa rispetto alle card info (sotto, affiancata, o full-width)
- Stile esatto del callout (colore bordo, icona, sfondo)

</decisions>

<specifics>
## Specific Ideas

- Mappa NON deve sembrare la classica Google Maps — colori pastello, toni caldi che si integrano nel design
- Mapbox Studio permette di creare stili completamente custom — usare la palette del sito
- La ContactSection esistente ha gia form + info card — la ContactInfoSection aggiunge contesto visivo (mappa + card espanse) SOPRA il form
- Tono della pagina: accogliente, disponibile, ma con confini chiari (privacy, appuntamento)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ContactSection`: form EmailJS completo con anti-spam (honeypot + rate limiting + reCAPTCHA v3)
- `InstagramFeedSection`: marquee riusabile
- `HeroSection`: gia implementato per Contatti con hero image e CTA
- Pattern callout: AllevamentoSection ha callout Biosensor con shimmer — pattern riutilizzabile

### Established Patterns
- CSS transition + IntersectionObserver per entrance animations
- CSS namespace per componente (es. `ci-` per contact info)
- Lazy loading componenti pesanti (WorldMapSection pattern con Suspense)
- `.env.local` per API keys (gia usato per EmailJS, Brevo, reCAPTCHA)

### Integration Points
- `Contatti.tsx` gia esiste come stub con Hero — aggiungere sezioni sotto
- Route `/contatti` gia configurata in React Router
- Hash scroll `#contatti` nel CTA hero — deve puntare alla ContactSection form
- Mapbox token va aggiunto in `.env.example` e `.env.local`

</code_context>

<deferred>
## Deferred Ideas

- Google Maps fallback se Mapbox non carica — valutare in Phase 6 test
- Mappa multilingua — Phase 9
- Form multilingua — Phase 9

</deferred>

---

*Phase: 04-pagine-interne (Contatti)*
*Context gathered: 2026-03-06*
