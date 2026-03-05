# Phase 4: Pagine Interne (Chi Siamo) — Research

**Researched:** 2026-03-05
**Domain:** SVG world map (React), CSS horizontal timeline, YouTube lazy embed
**Confidence:** HIGH (verified via official docs + npm + official repos)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Pagina Chi Siamo — struttura sezioni confermata (8 sezioni, Flusso A)
- Libreria mappa: `react-simple-maps` (SVG, leggera, personalizzabile)
- Timeline: orizzontale (non verticale)
- Video YouTube embed: `loading="lazy"` e aspect-ratio 16/9, no autoplay, nessuna dipendenza esterna
- Dati mappa: file JSON configurabile separato dal componente

### Claude's Discretion
- Animazioni: IntersectionObserver bidirezionale + CSS (pattern homepage)
- Icone per i 6 pillars: scegliere da Lucide React
- Spaziatura e dimensioni tipografiche: seguire CLAUDE.md
- Struttura JSON per la mappa: Claude decide il formato

### Deferred Ideas (OUT OF SCOPE)
- Blog, Galleria, FAQ, Contatti
- Dati tappe timeline post-2020
- Dati mappa paesi completa (l'utente fornirà dopo)
</user_constraints>

---

## react-simple-maps findings

### Stato della libreria (CRITICO — React 19 incompatibilità)

**Problema:** `react-simple-maps` (zcreativelabs) v3.0.0 — ultima pubblicazione 4 anni fa. Peer dependency dichiarata per React 16-18. **Non funziona con React 19** (progetto usa React 19).

**Soluzione confermata:** `@vnedyalk0v/react19-simple-maps` v2.0.2
- Fork ufficiale mantenuto attivamente (ultimo aggiornamento: 24 giorni fa al momento della ricerca)
- React 19.0.0+ richiesto come peer dependency
- 100% TypeScript-first, ESM-only con tree-shaking
- API identica all'originale: `ComposableMap`, `Geographies`, `Geography`, `ZoomableGroup`, `Marker`, `Annotation`, `Line`, `Sphere`, `Graticule`
- MIT license
- Fonte: [npmjs.com/@vnedyalk0v/react19-simple-maps](https://www.npmjs.com/package/@vnedyalk0v/react19-simple-maps)

### Installazione

```bash
npm install @vnedyalk0v/react19-simple-maps
```

Nessuna dipendenza extra da installare manualmente — d3-geo e topojson sono incluse internamente.

### Geographies data source

La mappa richiede un file GeoJSON/TopoJSON delle nazioni. Fonte consigliata (gratuita, nessun servizio esterno):

```
https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
```

Oppure scaricarlo in `public/content/` per zero dipendenze di rete.

### API Marker — pattern confermato

Il componente `Marker` accetta **coordinate `[longitude, latitude]`** (non lat/lon come Google Maps):

```tsx
// Source: https://www.react-simple-maps.io/docs/marker/
import { ComposableMap, Geographies, Geography, Marker } from '@vnedyalk0v/react19-simple-maps'

const GEO_URL = '/content/data/countries-110m.json'

<ComposableMap
  projection="geoEqualEarth"
  projectionConfig={{ scale: 147 }}
  width={800}
  height={400}
>
  <Geographies geography={GEO_URL}>
    {({ geographies }) =>
      geographies.map((geo) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          fill="var(--color-accent)"       /* #D4B896 beige sabbia */
          stroke="var(--color-cream)"      /* #FDF6EE */
          strokeWidth={0.5}
        />
      ))
    }
  </Geographies>

  {/* Marker custom — qualsiasi SVG valido come figlio */}
  <Marker coordinates={[12.4964, 41.9028]}>   {/* [lon, lat] Roma */}
    <circle r={5} fill="var(--color-primary)" stroke="#fff" strokeWidth={1} />
    <title>Italia</title>
  </Marker>
</ComposableMap>
```

### Struttura JSON dati mappa (formato raccomandato)

```json
// public/content/data/wm-destinations.json
[
  {
    "id": "it",
    "name": "Italia",
    "coordinates": [12.4964, 41.9028],
    "count": 3
  },
  {
    "id": "fr",
    "name": "Francia",
    "coordinates": [2.3522, 48.8566],
    "count": 1
  }
]
```

### Stile colori brand

| Elemento | CSS var | Hex |
|----------|---------|-----|
| Paesi (fill) | `--color-accent` | #D4B896 |
| Bordi paesi | `--color-cream` | #FDF6EE |
| Marker dot | `--color-primary` | #C8614A |
| Sfondo mappa | `--color-warm-white` | #FFFAF5 |

### Tooltip hover

Il `Marker` non ha tooltip built-in. Pattern semplice: `<title>` SVG nativo (accessibile) o `state` React con posizione assoluta CSS. Per la semplicità del progetto, usare `<title>` SVG — nessun JS aggiuntivo.

### Confidence: HIGH
Verificato tramite repo ufficiale fork + docs react-simple-maps originali.

---

## Horizontal timeline approach

### Approccio raccomandato: CSS-only con scroll-snap

Nessuna libreria necessaria. `scroll-snap-type` è supportato in tutti i browser target del progetto (Chrome 90+, Safari 14+, Firefox 88+, iOS 14+).

**Strategia desktop:** timeline linea orizzontale visibile tutta, senza scroll (5-7 item entrano in `max-width: 1400px`).

**Strategia mobile:** overflow-x scroll con `scroll-snap-type: x mandatory` — ogni tappa occupa ~85vw, snap al centro.

### Pattern CSS

```css
/* Container principale */
.tl-track {
  display: flex;
  gap: 0;
  position: relative;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;   /* iOS momentum */
  overscroll-behavior-x: contain;
  scrollbar-width: none;               /* nasconde scrollbar */
  padding-bottom: 1rem;                /* spazio per la scrollbar su Safari */
}

.tl-track::-webkit-scrollbar { display: none; }

/* Linea di connessione */
.tl-track::before {
  content: '';
  position: absolute;
  top: 2.5rem;                         /* altezza dot */
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-primary-pale) 5%,
    var(--color-primary-pale) 95%,
    transparent
  );
  pointer-events: none;
}

/* Singola tappa */
.tl-item {
  flex: 0 0 clamp(220px, 22vw, 260px);  /* desktop: tutte visibili */
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  text-align: center;
}

/* Mobile: una per volta */
@media (max-width: 768px) {
  .tl-item {
    flex: 0 0 85vw;
  }
}

/* Dot sulla linea */
.tl-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 3px solid var(--color-cream);
  box-shadow: 0 0 0 2px var(--color-primary);
  flex-shrink: 0;
  z-index: 1;
}

/* Anno */
.tl-year {
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 700;
  color: var(--color-primary);
}

/* Titolo tappa */
.tl-milestone {
  font-family: var(--font-heading);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}

/* Testo descrizione */
.tl-desc {
  font-family: var(--font-body);
  font-size: clamp(0.78rem, 0.9vw, 0.85rem);
  color: var(--color-text-muted);
  line-height: 1.6;
}
```

### Indicatore scroll mobile (CSS dot)

Per suggerire lo scroll su mobile, aggiungere dot indicatori styled pure CSS — stesso pattern di PedigreeSection già nel progetto.

### Animazione entrata

Applicare il pattern IntersectionObserver bidirezionale già usato in tutto il sito (`tl-item` con classe `tl-entered`), con `translate: 0 20px` → `translate: none` — max 1 transition per elemento.

### Confidence: HIGH
`scroll-snap-type` è una feature CSS stabile, ampiamente documentata su MDN. Pattern validato dal codebase esistente (BlogPreviewSection usa già overflow-x scroll orizzontale).

---

## YouTube lazy embed approach

### Approccio raccomandato: stato React click-to-load

La decisione in CONTEXT.md esclude dipendenze esterne per il video. L'approccio migliore per React:

**Pattern useState — thumbnail → click → iframe:**

```tsx
// Source pattern verificato: robertmarshall.dev + css-tricks.com
import { useState } from 'react'

const VIDEO_ID = '_jQ2oFcZIhY'  // dall'URL youtube.com/watch?v=_jQ2oFcZIhY

export function YouTubeFacade({ videoId }: { videoId: string }) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <div className="yt-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Video allevamento Maatilayla — campo agility"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <button
      className="yt-facade"
      onClick={() => setActive(true)}
      aria-label="Guarda il video del campo agility Maatilayla"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
        alt="Anteprima video campo agility barboncini Maatilayla"
        loading="lazy"
        decoding="async"
      />
      <span className="yt-play-btn" aria-hidden="true">
        {/* SVG play icon — no dipendenze */}
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/>
          <path d="M45 24 27 14v20" fill="#fff"/>
        </svg>
      </span>
    </button>
  )
}
```

```css
/* CSS facade */
.yt-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: #000;
}

.yt-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.yt-facade {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: var(--radius-card);
  overflow: hidden;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: #000;
  contain: layout style paint;
}

.yt-facade img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.yt-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.yt-facade:hover .yt-play-btn {
  opacity: 0.85;
}
```

### Caveats confermati

| Problema | Dettaglio | Soluzione |
|----------|-----------|-----------|
| Autoplay dopo click | `&autoplay=1` funziona su Chrome/Safari solo se l'utente ha interagito (click → carica iframe con autoplay=1 = OK) | Mantenere `autoplay=1` nell'src dell'iframe — il click sul button conta come user gesture |
| Thumbnail quality | `sddefault.jpg` = 640x480, `maxresdefault.jpg` = 1280x720 ma non sempre disponibile | Usare `sddefault.jpg` come fallback sicuro |
| Due click su mobile | Solo con approccio `srcdoc` — **non si verifica** con approccio useState (l'iframe rimpiazza direttamente il button) | Usare useState, non srcdoc |
| Privacy YouTube | YouTube carica tracker solo al click — privacy by design | Opzionale: usare `youtube-nocookie.com` al posto di `youtube.com` |

### Alternative scartate

- `srcdoc` approach: causa double-click su mobile (confermato CSS-Tricks) — scartato
- `react-lite-youtube-embed`: dipendenza esterna non necessaria — scartato per convenzione progetto
- `loading="lazy"` su iframe nativo: carica comunque tutti gli asset YouTube al load — non sufficiente

### Confidence: HIGH
Pattern useState click-to-load è il metodo più affidabile senza librerie esterne. Verificato da più fonti (CSS-Tricks, robertmarshall.dev, swyx.io).

---

## Implementation recommendations

### Ordine di implementazione

1. **Scarica `countries-110m.json`** in `public/content/data/` (evita CDN request a runtime):
   ```bash
   curl -o public/content/data/countries-110m.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
   ```

2. **Installa fork React 19:**
   ```bash
   npm install @vnedyalk0v/react19-simple-maps
   ```

3. **Crea `public/content/data/wm-destinations.json`** con struttura `[{ id, name, coordinates: [lon, lat], count }]` — anche vuoto con 2-3 placeholder (Italia, Francia, UK) per sviluppo.

4. **Componente WorldMapSection** (`wm-` prefix CSS):
   - `ComposableMap` con `geoEqualEarth` projection
   - Paesi in colori brand (fill `--color-accent`, stroke `--color-cream`)
   - `Marker` con `<circle>` in `--color-primary` + `<title>` per accessibilità
   - Tooltip hover facoltativo — può essere solo `<title>` SVG in prima fase

5. **Componente TimelineSection** (`tl-` prefix CSS):
   - Dati hardcoded nel componente (5 tappe 2018-2020 da CONTEXT.md)
   - Array JS delle tappe → map → `.tl-item`
   - Struttura configurabile per aggiunta futura tappe

6. **YouTubeFacade inline in StrutturaDSection** (non componente separato se usato una sola volta):
   - useState locale
   - Thumbnail YouTube + play button SVG
   - Al click: sostituisce con `<iframe>` + autoplay=1

### CSS naming convention (da CONTEXT.md)
- Storia Layla: `ls-`
- Credenziali: `cr-`
- Valori/filosofia: `vl-`
- Timeline: `tl-`
- Struttura sezione: `st-`
- World map: `wm-`
- YouTube facade: `yt-`

---

## Sources

### Primary (HIGH confidence)
- [react-simple-maps official docs — Marker API](https://www.react-simple-maps.io/docs/marker/)
- [npmjs.com/@vnedyalk0v/react19-simple-maps](https://www.npmjs.com/package/@vnedyalk0v/react19-simple-maps)
- [github.com/vnedyalk0v/react19-simple-maps](https://github.com/vnedyalk0v/react19-simple-maps)
- [MDN scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)

### Secondary (MEDIUM confidence)
- [CSS-Tricks: Lazy Load Embedded YouTube Videos](https://css-tricks.com/lazy-load-embedded-youtube-videos/) — conferma double-click issue con srcdoc
- [swyxkit: 85% faster YouTube embeds](https://swyxkit.netlify.app/faster-youtube-embeds) — srcdoc tecnica e benchmark
- [robertmarshall.dev: On-Click Lazy Load YouTube in React](https://robertmarshall.dev/blog/on-click-lazy-load-video-iframe-in-react/) — pattern useState

### Confidence breakdown
- react-simple-maps fork/API: **HIGH** — docs ufficiali + repo attivo
- Timeline CSS: **HIGH** — spec CSS stabile, pattern browser-native
- YouTube lazy embed: **HIGH** — pattern useState ampiamente adottato, senza dipendenze

**Research date:** 2026-03-05
**Valid until:** 2026-06-05 (stabile — librerie slow-moving)
