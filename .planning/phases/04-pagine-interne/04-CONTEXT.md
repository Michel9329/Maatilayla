# Phase 4: Pagine Interne — Chi Siamo - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning (Chi Siamo only — altre pagine da pianificare separatamente)

<domain>
## Phase Boundary

Costruire la pagina Chi Siamo completa: storia personale di Layla, credenziali professionali, filosofia dell'allevamento, timeline della struttura, mappa internazionale dei cuccioli. Il layout e il design system della homepage sono il riferimento. Le altre pagine (Blog, Galleria, FAQ, Contatti) sono fasi separate.

</domain>

<decisions>
## Implementation Decisions

### Obiettivo della pagina
- La pagina deve dare **emozione prima, credibilità dopo** — opposto alla homepage (brand-driven)
- Il visitatore deve capire che c'è una storia vera dietro, non solo un brand professionale
- Tono: narrativo e personale nella sezione storia, autorevole nelle credenziali, valoriale nella filosofia

### Ordine sezioni (Flusso A — confermato)
1. **Hero** — già implementato (`/chi-siamo`, badge "La Nostra Filosofia")
2. **Storia di Layla** — il racconto emotivo dell'origine
3. **Credenziali Layla** — la professionista dietro la passione
4. **Filosofia & valori** — i 6 pillars dell'allevamento
5. **La Struttura** — immagine + video + testo introduttivo (il posto oggi)
6. **Timeline orizzontale** — la storia di come la struttura è nata e cresciuta
7. **Mappa del mondo** — i cuccioli Maatilayla nel mondo
8. **CTA contatti** — chiusura con link a /contatti

### Storia di Layla
- Usare il testo originale di `content/testi-sito-attuale/la-storia.md` come base
- Migliorare in ottica SEO senza forzare — parole chiave naturali ("barboncino toy", "allevamento", "Maatilayla")
- Preservare il tono narrativo e personale (racconto di Jolie, i cani precedenti, la formazione)
- Include foto di Layla: da recuperare dal sito WordPress originale (https://allevamentobarboncinimaatilayla.it/la-storia/ e homepage)
- Foto da processare con sharp: webp, max 800px, qualità 78, sotto 80KB
- Layout: foto Layla + testo a fianco (pattern simile a AllevamentoSection), o foto in apertura con testo sotto
- La sezione dei cani precedenti (Yupie, Giacobbe, Dersie, Togo...) può essere sintetizzata — è lunga

### Credenziali Layla
- **Card dedicata con peso visivo** — sezione autonoma, non integrata nel testo
- 3 credenziali da mostrare in evidenza:
  - Addestratrice ENCI
  - Educatrice cinofila
  - Master Allevatore ENCI (in completamento al momento del testo originale — verificare stato attuale)
- Possibile aggiunta di anni di esperienza / numero cuccioli nati
- Stile: card elevata, badge/pill per ogni credenziale, nome completo "Layla Zarfati" in evidenza

### Filosofia & valori — grid 3×2
- **6 pillars** divisi in 2 gruppi naturali:
  - **Gruppo 1 — I tre obiettivi** (focus cucciolo): Cuccioli sani · Cuccioli belli · Cuccioli equilibrati
  - **Gruppo 2 — I tre valori** (focus allevamento): Rispetto della natura · Ambiente sereno · Punto di riferimento
- Layout: griglia 3×2 con icona + titolo + 2 righe descrizione per ogni pillar
- Stile coerente con le feat-card di AllevamentoSection (non serve reinventare)
- Badge sezione sopra + titolo h2

### La Struttura (sezione visiva)
- **Posizione**: tra Filosofia/valori e Timeline — prima mostri com'è oggi, poi la Timeline racconta come ci si è arrivati
- Contenuto: sopratitolo (badge) + titolo h2 + testo descrittivo + immagine della struttura + video YouTube (https://www.youtube.com/watch?v=_jQ2oFcZIhY — campo agility)
- Layout: testo a sinistra / media a destra (o media sopra il testo su mobile) — pattern simile ad AllevamentoSection
- Video: embed YouTube con `loading="lazy"` e aspect-ratio 16/9, no autoplay, nessuna dipendenza esterna oltre iframe standard
- Immagine: foto della struttura/casetta dei barboni (da identificare tra le immagini disponibili o da aggiungere)
- Testo: sintetico, descrittivo — introduce il posto fisico ("Una struttura immersa nel verde...")

### Timeline orizzontale
- **Orientamento**: orizzontale (non verticale blog-style)
- **Tappe previste**:
  - Pre-2018: Fondazione — storia di Jolie, la passione che ha dato origine a Maatilayla (testo da la-storia.md)
  - Ottobre 2018: Trasferimento — lasciare la casa di città per spazi aperti
  - Novembre 2018: Inizio lavori — i cani esplorano il nuovo terreno
  - Ottobre 2019: La casetta dei Barboni — inaugurazione spazio dedicato
  - Maggio 2020: Campo di Agility — area attrezzata completa
  - Tappe future (certificazioni, cucciolare importanti): **da aggiungere in seguito** — struttura con slot configurabili
- Contenuti delle tappe esistenti vanno migliorati (testo più sintetico e d'impatto rispetto all'originale)
- I dati delle tappe future (date esatte, tipo di certificazioni) saranno forniti dall'utente in seguito

### Mappa del mondo
- **Feature**: mappa interattiva con icone del barboncino su ogni paese dove è andato a vivere un cucciolo Maatilayla
- **Posizione**: tra Timeline e CTA — momento "wow" che chiude il racconto narrativo
- **Libreria**: `react-simple-maps` (SVG, leggera, personalizzabile, nessun servizio esterno)
- **Dati**: file JSON configurabile (lista paesi/coordinate) — separato dal componente per facile aggiornamento
- **Stato attuale dati**: non disponibili ora (da raccogliere in seguito) — costruire struttura con placeholder
- La mappa deve funzionare anche con pochi paesi (5-10) e aggiornabile nel tempo
- Stile: mappa stilizzata nei colori del brand (cream/primary), tooltip hover con nome paese

### CTA finale
- Link a /contatti
- Tono caldo, non commerciale — coerente con la pagina
- Pattern simile a FaqCtaSection (foto background + testo centrato + bottone)

### Claude's Discretion
- Animazioni: pattern IntersectionObserver + CSS (stessa logica homepage) — ora bidirezionali (replay su scroll)
- Icone per i 6 pillars: scegliere da Lucide React
- Spaziatura e dimensioni tipografiche: seguire convenzioni CLAUDE.md
- Testo SEO migliorato per la storia: Claude può proporre la versione ottimizzata
- Struttura JSON per la mappa: Claude decide il formato

</decisions>

<specifics>
## Specific Ideas

- "Il sito in questa parte deve dare emozione e credibilità — sfatare l'idea del brand puro mostrando la passione vera"
- La mappa del mondo è la feature più differenziante — costruirla con dati configurabili, i dati arriveranno dopo
- Il sito è una sorpresa per la madre (Layla) — i dati delle certificazioni e tappe recenti arriveranno in un secondo momento
- Foto di Layla disponibile su https://allevamentobarboncinimaatilayla.it/la-storia/ — da scaricare e processare con sharp
- La sezione cani precedenti nella storia (Yupie, Giacobbe, ecc.) è molto lunga nell'originale — può essere sintetizzata mantenendo l'essenza

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `HeroSection` — già implementato su Chi Siamo, non toccare
- `AllevamentoSection` — pattern foto+testo side-by-side riusabile come ispirazione per la storia di Layla
- `FaqCtaSection` — pattern foto background + CTA riusabile per la chiusura
- `PedigreeSection` — grid card con icone, ispirazione per i 6 pillars

### Established Patterns
- Animazioni: IntersectionObserver bidirezionale → CSS class `xxx-entered` (ora tutte le sezioni usano questo pattern)
- Tipografia: Playfair Display per h2, Poppins per body — `var(--font-heading)` / `var(--font-body)`
- Badge: `display: inline-flex`, `font-size: 0.65rem`, `letter-spacing: 0.12em`, punto rosso `pulse-dot`
- Parallax immagini: GSAP scrub `yPercent` sull'img interno, solo per immagini grandi
- Card radius: `var(--radius-card)` = 1.5rem
- `contain: layout style paint` su card container con immagini

### Integration Points
- `src/pages/ChiSiamo.tsx` — aggiungere sezioni dopo l'Hero esistente
- `src/index.css` — aggiungere CSS sezioni nuove in fondo (naming convention: prefisso sezione es. `ls-` storia, `cr-` credenziali, `vl-` valori, `tl-` timeline, `wm-` world map)
- `public/content/images/` — foto Layla da aggiungere dopo processing sharp
- Nuova dipendenza: `react-simple-maps` per la mappa

</code_context>

<deferred>
## Deferred Ideas

- Blog, Galleria, FAQ, Contatti — altre pagine di Phase 4, da pianificare separatamente
- Dati tappe timeline post-2020 (certificazioni, date esatte) — l'utente li fornirà in seguito
- Dati mappa (lista paesi completa) — l'utente li fornirà dopo aver parlato con Layla

</deferred>

---

*Phase: 04-pagine-interne (Chi Siamo)*
*Context gathered: 2026-03-05*
