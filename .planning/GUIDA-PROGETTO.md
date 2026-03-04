# Guida Progetto Maatilayla — Da WordPress a React

Questa guida spiega tutto quello che è stato fatto, come funziona, e cosa significa ogni pezzo.
Scritta per chi viene da WordPress/Elementor e vuole capire il progetto.

---

## Il Quadro Generale

**Prima (WordPress):** Il tuo sito era un'applicazione server-side. Ogni volta che un utente cliccava un link, il server generava una nuova pagina HTML e la inviava al browser. Elementor aggiungeva un page builder visuale sopra WordPress.

**Ora (React SPA):** Il sito è una Single Page Application. Il browser scarica TUTTO il codice una volta sola, poi naviga tra le pagine istantaneamente senza ricaricare. È come un'app mobile nel browser.

| Concetto WordPress    | Equivalente React                                  |
| --------------------- | -------------------------------------------------- |
| Tema + child theme    | `src/index.css` + Tailwind CSS                     |
| Header.php            | `src/components/layout/Navbar.tsx`                 |
| Footer.php            | `src/components/layout/Footer.tsx`                 |
| Template pagina       | `src/pages/Home.tsx`, `ChiSiamo.tsx`, ecc.         |
| Plugin SEO (Yoast)    | `react-helmet-async` (meta tag per pagina)         |
| Plugin form (CF7)     | React Hook Form + Zod + EmailJS                    |
| Media Library         | `public/content/images/` e `public/content/logos/` |
| .htaccess             | Stesso file, ma per SPA routing                    |
| functions.php         | `src/hooks/` (funzioni riutilizzabili)             |
| wp-config.php         | `.env.local` (variabili segrete)                   |
| Plugin = funzionalità | `npm install pacchetto` (librerie)                 |

---

## La Struttura del Progetto

```
Maatilayla/
│
├── public/                    ← File statici (come wp-content/uploads)
│   ├── content/images/        ← Immagini del sito
│   ├── content/logos/         ← Loghi
│   ├── favicon.webp           ← Icona tab browser
│   ├── robots.txt             ← Istruzioni per Google
│   ├── sitemap.xml            ← Mappa del sito per SEO
│   └── .htaccess              ← Regole server Apache (Siteground)
│
├── src/                       ← Codice sorgente (il cuore del sito)
│   ├── components/
│   │   ├── layout/            ← Struttura (Navbar, Footer, Layout)
│   │   ├── sections/          ← Sezioni pagina (HeroSection, ecc.)
│   │   └── ui/                ← Componenti riusabili (bottoni, card)
│   ├── pages/                 ← Le pagine del sito
│   ├── hooks/                 ← Funzioni riutilizzabili
│   ├── lib/                   ← Utility
│   └── data/                  ← Dati statici
│
├── content/                   ← Testi estratti dal sito WordPress
│   └── testi-sito-attuale/    ← 7 pagine + 15 blog post
│
├── .claude/                   ← Configurazione AI (Claude Code)
│   ├── agents/                ← 5 agenti AI specializzati
│   └── settings.json          ← Permessi di sicurezza
│
├── .planning/                 ← Pianificazione progetto
│   ├── PROJECT.md             ← Descrizione progetto
│   ├── ROADMAP.md             ← Fasi e checklist
│   └── config.json            ← Config Vibe Kanban
│
├── CLAUDE.md                  ← Regole per l'AI (design system, convenzioni)
├── index.html                 ← Punto di ingresso (come index.php)
├── package.json               ← Lista librerie installate (come plugin WP)
├── vite.config.ts             ← Configurazione build tool
└── tsconfig.json              ← Configurazione TypeScript
```

---

## Le Tecnologie Spiegate

### React (il framework)

**Cos'è:** Una libreria per costruire interfacce utente. Invece di HTML statico, scrivi "componenti" — pezzi riutilizzabili di interfaccia.

**Esempio semplice:**

```tsx
// Un componente è una funzione che ritorna HTML
function Bottone({ testo }) {
  return <button className="btn-primary">{testo}</button>
}

// Lo usi così in un'altra pagina:
;<Bottone testo="Contattaci" />
```

**Perché è meglio di WordPress per questo progetto:**

- Navigazione istantanea (no ricaricamento pagina)
- Animazioni fluide (GSAP)
- Controllo totale sul design (no vincoli tema)
- Performance superiore (bundle ottimizzato)

### TypeScript (il linguaggio)

**Cos'è:** JavaScript con "tipi". Ti avvisa PRIMA se fai errori.

**Esempio:** Se scrivi `nome = 42` ma il componente si aspetta un testo, TypeScript ti dice "errore" prima ancora che apri il browser. In WordPress/PHP, lo scoprivi solo quando il sito crashava.

I file `.tsx` = TypeScript + JSX (HTML dentro JavaScript). I file `.ts` = solo TypeScript.

### Vite (il build tool)

**Cos'è:** L'equivalente del "compilatore". Prende tutti i tuoi file `.tsx`, `.css`, immagini, e li impacchetta in file ottimizzati per il browser.

**Comandi:**

- `npm run dev` → Avvia un server locale per sviluppo (modifica il codice e vedi i cambiamenti in tempo reale)
- `npm run build` → Crea la versione finale per il server (la cartella `dist/`)
- `npm run preview` → Preview della build finale

### Tailwind CSS (lo stile)

**Cos'è:** Un framework CSS utility-first. Invece di scrivere classi CSS personalizzate, usi classi predefinite direttamente nell'HTML.

**Equivalenza Elementor:**
| Elementor | Tailwind |
|---|---|
| Padding: 20px | `p-5` |
| Flex, center | `flex items-center justify-center` |
| Colore testo rosso | `text-red-500` |
| Nascosto su mobile | `hidden md:block` |

Nel nostro progetto usiamo un **mix**: Tailwind per layout rapido + CSS custom in `src/index.css` per effetti complessi (glass, animazioni).

### GSAP (le animazioni)

**Cos'è:** Libreria per animazioni professionali. Usata da Apple, Nike, Google.

**Nel nostro progetto:** La navbar che appare dall'alto. Il drawer mobile. Il pulsante "pulse dot" verde.

**Nota:** L'hero section usava GSAP inizialmente, ma è stato sostituito con **CSS @keyframes** per risolvere un conflitto tra GSAP `transform` e CSS `translate` (GSAP 3.14 gestisce le proprietà CSS individuali in modo diverso). Le CSS animations sono più affidabili per componenti che si montano/smontano con React Router.

### React Router (la navigazione)

**Cos'è:** Gestisce gli URL. Quando clicchi "Chi Siamo", non ricarica la pagina — cambia solo il contenuto visualizzato.

**In WordPress:** Ogni pagina = un URL diverso = richiesta al server.
**In React:** Un solo caricamento, poi navigazione istantanea.

---

## Cosa Ho Costruito — Spiegato Pezzo per Pezzo

### 1. Navbar (`src/components/layout/Navbar.tsx`)

La barra di navigazione "floating pill" ispirata ad Apple.

**Come funziona:**

- Su **desktop** (>1024px): pillola con logo + 6 link + pulsante CTA "Richiedi Informazioni"
- Su **tablet** (768-1023px): stessa struttura ma più compatta
- Su **smartphone** (<768px): logo + hamburger menu → apre un drawer fullscreen

**Effetto glass:** La navbar è semitrasparente con sfocatura (`backdrop-filter: blur`). Quando sei sulla hero (hero-mode), è trasparente con testo bianco. Quando scorri, diventa crema opaca.

**Funzionalità:**

- Scroll listener: cambia stile quando scorri giù
- Escape key: chiude il drawer
- Browser back/forward: chiude il drawer
- Animazione ingresso con GSAP

### 2. Hero Section (`src/components/sections/HeroSection.tsx`)

Componente riusabile per la sezione hero di ogni pagina. Riceve props per personalizzare contenuto e aspetto.

**Props disponibili:**

- `image` — URL immagine di sfondo (diversa per pagina)
- `alt` — Testo alternativo per accessibilità
- `title` — Titolo (supporta JSX per stili inline)
- `subtitle` — Sottotitolo opzionale
- `badge` — Badge superiore (es. "Allevamento Amatoriale ENCI · FCI")
- `description` — Testo breve (mobile) + completo (desktop)
- `cta` — Array di bottoni Call To Action
- `compact` — Variante compatta per pagine interne

**Come funziona:**

- **Sfondo**: immagine WebP, copre tutto lo spazio
- **Overlay**: gradiente scuro sopra l'immagine per leggibilità
- **Glass card**: effetto "liquid glass" Apple — sfocatura + bordi luminosi + ombra
- **Responsive**: la card è in basso centrata su mobile, a destra su desktop
- **Testi**: versione corta su mobile, completa su desktop (toggle CSS)
- **Animazione**: CSS `@keyframes` con stagger sui figli (no GSAP — risolve conflitto transform/translate)

**Pagine configurate:**

- **Home**: hero completo (badge + titolo + descrizione + 2 CTA)
- **Chi Siamo**: hero completo con immagine cuccioli neonati + CTA "La Struttura" e "Storia"
- **Blog, Galleria, FAQ, Contatti**: hero con titolo + sottotitolo

**Il bug widescreen risolto:** Su monitor ultrawide (49"), il CSS `aspect-ratio: 16/8` combinato con `max-height: 90vh` faceva restringere la larghezza del hero. Risolto sostituendo con `height: clamp(560px, 50vw, 90vh)` che mantiene la stessa proporzione senza effetti collaterali.

### 3. Layout (`src/components/layout/Layout.tsx`)

Il "wrapper" che contiene Navbar + contenuto pagina + Footer. Ogni pagina viene renderizzata dentro `<main>`. Include il link "Salta al contenuto" per accessibilità.

**Protezione contenuti:** Blocca tasto destro (menu contestuale), Ctrl+C (copia), Ctrl+U (view source), Ctrl+S (salva), Ctrl+P (stampa). Il CSS aggiunge `user-select: none` su tutto il body e `user-drag: none` sulle immagini. I form restano selezionabili.

### 4. CSS (`src/index.css`)

Il file di stile principale. Contiene:

- **@theme**: variabili CSS (colori, font, raggi bordo) — come il "Design System" in Elementor
- **Liquid glass**: effetto vetro sfocato riutilizzabile
- **Hero responsive**: 3 breakpoints (768px, 1024px, 1440px) con media queries CSS pure
- **Bottoni hero**: primario (filled) e outline (ghost) con effetti hover/active
- **Navbar pill**: due modalità (hero trasparente, scrolled opaca)
- **Accessibilità**: focus-visible per keyboard, prefers-reduced-motion

### 5. App (`src/App.tsx`)

Il componente radice che gestisce il routing. Include:

- **ScrollToTop**: scrolla in cima ad ogni cambio pagina
- **Lazy loading**: tutte le pagine tranne Home sono caricate su richiesta
- **Analytics**: traccia page view su Google Analytics

### 6. Pagine (`src/pages/`)

6 pagine con react-helmet-async per SEO:

- Ogni pagina ha `<title>`, `<meta description>`, e **Open Graph tags** per condivisione social
- Home è caricata subito, le altre sono **lazy loaded** (scaricate solo quando servono)
- Ogni pagina usa HeroSection con props personalizzati

### 7. Footer (`src/components/layout/Footer.tsx`)

Il footer a piena larghezza (con margini isola come l'hero su tablet/desktop). Sfondo `#EDE5D8` (beige sabbia caldo).

**Struttura:**

- **Brand bar**: logo Maatilayla a sinistra + loghi ENCI/FCI (cliccabili, aprono i siti ufficiali) a destra
- **Corpo 2 colonne**:
  - Sinistra: tagline "Nasce da noi, cresce con te." + testo SEO → Naviga (6 link) → Legale (5 link) → Lingua (stub, Phase 8)
  - Destra: Contatti (indirizzo Maps, 2 telefoni, email) + note privacy + nota copyright
- **Newsletter** (stub, Phase 3): riga full-width tra corpo e bottom bar, input pill + bottone "Iscriviti"
- **Bottom bar**: © copyright | ENCI · FCI · Albo Allevatori | SHARKCODE

**Accessibilità:**

- `<nav aria-labelledby>` attorno a Naviga e Legale
- `aria-label` su tutti i link funzionali (tel, email, Maps)
- Alt text descrittivo su tutti gli `<img>`
- Colore _cresce con te._ = `#9b3e28` (5.4:1 su sfondo footer → WCAG AA ✅)
- Focus ring esplicito sui link immagine ENCI/FCI

**Sticky footer:** `#root { display: flex; flex-direction: column; min-height: 100dvh; }` + `#main-content { flex: 1 }` — il footer resta sempre al fondo del viewport anche su pagine corte.

### 8. StatsSection (`src/components/sections/StatsSection.tsx`)

Sezione contatori animati sopra la BentoSection. Tre statistiche: anni di esperienza (countdown da 16 a 0), superficie allevamento (10.000 m²), cani attivi (countUp da 0 a 100 con "% Passione").

**Animazioni:** Contatori via `requestAnimationFrame` con duration calibrata per ognuno, attivati da IntersectionObserver una sola volta. Prefers-reduced-motion: mostra valori finali statici.

---

### 9. BentoSection (`src/components/sections/BentoSection.tsx`)

Griglia bento 2×2 con quattro card: hero testo, photo slider, caratteristiche, CTA.

**Layout CSS grid:**

- Desktop: `grid-template-columns: 1fr 1fr`, `grid-template-rows: 310px 260px`
- Mobile: stack verticale, altezze auto

**Card 1 — Hero testo:**

- Badge "Il Barbone Toy" + titolo + 2 paragrafi sul barboncino toy
- GSAP stagger in ingresso: badge → h2 → p1 → p2 (y 24px, power3.out, delay 0.44s)

**Card 2 — Photo slider:**

- Swiper EffectFade + Autoplay (3500ms) + Pagination cliccabile + loop
- 6 foto reali in `public/content/images/` (nome semantico, alt text in italiano)
- CSS: `position: absolute; inset: 0; object-fit: cover` + `transform: translateZ(0)` per stabilità GPU

**Card 3 — Caratteristiche:**

- 6 caratteristiche: Intelligenza, Devozione, Socialità, Versatilità, Equilibrio, Ipoallergenico
- Swiper senza effetto + Autoplay (4200ms) + pauseOnMouseEnter + frecce navigazione manuale
- Sfondo `#D8DFC6` (olive pastello)
- Clip-path text reveal: nascosto su mount, `inset(0 100% 0 0)` → `inset(0 0% 0 0)` in 0.65s
- Testo nascosto su `onSlideChangeTransitionStart`, rivelato su `onSlideChangeTransitionEnd`

**Card 4 — CTA:**

- Sfondo scuro (--color-text)
- Titolo + testo compatto + ghost pill button "Leggi di più →" → `/il-barbone`
- `.btn-bento-cta-ghost`: border rgba(255,255,255,0.25), hover gap animation su freccia

**Hover tilt 3D:**

- React `onMouseMove`/`onMouseLeave` handlers con `gsap.to` + `overwrite: 'auto'`
- ±4° rotazione, `perspective: 900px` su parent `.bento-grid` (CSS)
- Return: 1.2s duration con `expo.out` (ritorno morbido, no scatto)

**ScrollTrigger per-card:**

- Top cards (hero + photos): trigger sulla sezione (`start: 'top 82%'`)
- Bottom cards (caratteristiche + CTA): trigger individuale su ogni card (`start: 'top 90%'`)
- Le bottom cards si animano solo quando entrano nel viewport, non quando appaiono le top cards

---

### 10. TestimonialsSection (`src/components/sections/TestimonialsSection.tsx`)

Sezione recensioni con due righe marquee infinite a direzioni opposte.

**Contenuto:**

- 10 recensioni reali da Google (5 per riga), troncate a 150 caratteri + link "leggi di più"
- Avatar con iniziale colorata (10 colori diversi), nome + 5 stelle inline

**Marquee CSS (non GSAP):**

- CSS `@keyframes` sul compositor thread — zero scatti (GSAP `repeat: -1` causava jump su main thread)
- `--scroll-dist` misurato via `getBoundingClientRect()` in `requestAnimationFrame`
- Riga 1 (normale): `[items, items]` — scrolla a sinistra
- Riga 2 (reverse): `[items, items, items]` — keyframe dedicato `tm-marquee-reverse` + pre-offset a `translateX(-scrollDist)` per avvio seamless. 3 copie necessarie per coprire viewport su schermi larghi
- Hover: `animation-play-state: paused` sul wrapper

**Animazioni entrata CSS (no GSAP):**

- Badge + titolo: CSS transition fade-up con stagger (IntersectionObserver aggiunge `.tm-entered`)
- Righe: CSS transition slide da lato coerente con direzione marquee (riga 1 da destra translateX(30%), riga 2 da sinistra translateX(-30%))
- Cubic-bezier expo-like, durata 1.8s/2.0s
- Transizione entrata → marquee: `setTimeout` avvia CSS animation a ~800ms/1100ms dopo IntersectionObserver (quando la transition e' quasi completa)

**Responsive:**

- Card: 320px desktop → 260px mobile (767px)
- Padding e spacing fluidi con `clamp()`
- Animazione 40s su entrambi i breakpoint

---

### 11. AllevamentoSection (`src/components/sections/AllevamentoSection.tsx`)

Sezione homepage con due blocchi foto+testo alternati dentro card elevate (sfondo cream, bordi arrotondati).

**Blocco 1 — "Il nostro approccio":**

- Badge "Il nostro approccio" + titolo "Cresciuti in famiglia, con dedizione e competenza"
- 3 paragrafi: socializzazione, manipolazione/rumori, multi-specie
- Callout Biosensor con bordo sinistro primary + shimmer continuo (gradient linear, 6.5s loop)

**Blocco 2 — "Da Maatilayla a casa tua":**

- Badge "Pronti per te" + titolo "Da Maatilayla a casa tua, un cucciolo pronto per te"
- 3 paragrafi: 3 mesi con mamma, vaccinazioni/ecocardiogramma, microchip/pedigree
- Frase finale in italico sull'indole
- 7 feature pills con icone Lucide: vaccinato, ecocardiogramma, test prcd-PRA, test patella lux, microchip, pedigree ENCI, Puppy Starter Kit

**Animazioni:**

- Entrata blocco: CSS transition `opacity 0→1, translateY(24px)→0` con `ease-out` 0.6s (IntersectionObserver + rAF pre-transition, no GSAP)
- Pills: float continuo CSS (translate 0 -2px, 3.2s) + pulse icona (scale 1→1.15, 2.8s)
- Shimmer callout Biosensor: gradient lineare loop 6.5s
- Parallax foto: GSAP `yPercent -8→8`, scrub 0.6, force3d (unico uso GSAP nella sezione)

**Responsive:** Mobile stack verticale (foto sopra, testo sotto), tablet 44% foto, desktop 48% foto. Padding allineato con BentoSection.

---

### 12. BlogPreviewSection (`src/components/sections/BlogPreviewSection.tsx`)

Sezione homepage con scroll orizzontale di 6 card articoli dal blog. Pattern "peek": ~2.5 card visibili su desktop, la terza tagliata sul bordo destro.

**Struttura:**

- Header: badge "Dal Blog" con dot pulsante + titolo con accent primary
- Subtitle row: sottotitolo a sinistra + link "Tutti gli articoli" a destra (allineato al margine delle altre sezioni)
- Track orizzontale: 6 card articolo in flex row, overflow-x auto, scroll-snap proximity
- Progress bar: 4px centrata (scaleX transform, no layout recalc), fill 12% default per UX
- Fade overlay: div con gradient CSS sul bordo destro (no mask-image per performance)

**Card articolo:**

- Foto in alto (aspect-ratio 16/10, object-fit cover, zoom 1.03 su hover)
- Meta: categoria (primary, uppercase) + data
- Titolo h3 (line-clamp 2)
- Excerpt (line-clamp 3)
- Link "Leggi articolo" con freccia animata in fondo alla card
- Sfondo warm-white, bordo sottile, border-radius card

**Interazioni:**

- Drag-to-scroll su desktop (mousedown/mousemove/mouseup handlers, cursor grab/grabbing)
- Touch scroll nativo su mobile (no drag handlers)
- Scroll-snap x mandatory — snap ai bordi card
- Keyboard: Arrow Left/Right per navigare (step 320px, smooth)
- Hover: ombra + zoom foto 1.03
- Progress bar aggiornata in realtime via scroll event

**Animazioni CSS (no GSAP):**

- Header: CSS transition fade-up stagger (badge → titolo → sottotitolo), IntersectionObserver
- Card: CSS transition opacity stagger (0.1s → 0.35s delay), contain: layout style paint
- Nessun transform sulle card (evita GPU layer promotion inutile)

**6 articoli selezionati** (i più recenti dal blog WordPress):

1. "Controlli? Sì, grazie!" (2023) — Allevamento
2. "Quando a volte tornano" (2022) — Storie
3. "Chi alleva, alleva tutto" (2021) — Riflessioni
4. "Facciamo fare il cane al cane" (2021) — Educazione
5. "Per una zampata di fango" (2021) — Vita quotidiana
6. "Pandemia sei tutta mia" (2021) — Riflessioni

**Responsive:** Card 85vw mobile (~1.15 visibili), 42vw tablet (~2.2 visibili), clamp(280px,36vw,380px) desktop, widescreen padding 3rem.

---

### 13. FuturiPadroniSection (`src/components/sections/FuturiPadroniSection.tsx`)

Sezione homepage rivolta a chi sta pensando di prendere un cucciolo. Sfondo warm-white (trasparente, background pagina).

**Struttura:**

- Header centrato: badge "Ai futuri padroni" con dot pulsante + titolo con accent primary + sottotitolo
- Griglia 3x3 desktop di 8 card valori + 1 CTA card:
  1. "Vi incontriamo di persona" (HandHeart) — consegna esclusivamente di persona
  2. "Scelta consapevole" (ShieldAlert) — diffidate dai prezzi stracciati
  3. "Crescita sotto i nostri occhi" (Eye) — crescita supervisionata con madre e fratelli
  4. "Sempre al vostro fianco" (MessageCircleHeart) — supporto post-cessione
  5. "Un cucciolo pronto per la vita" (PawPrint) — vaccinazioni, socializzazione, microchip
  6. "Selezione delle famiglie" (UserCheck) — valutiamo ogni famiglia
  7. "Accoppiamenti naturali" (HeartHandshake) — nessuna inseminazione artificiale
  8. "Rispetto dei tempi" (CalendarClock) — intervallo minimo 1 anno tra gravidanze
  9. CTA dark card: "Stai cercando il tuo cucciolo?" → /contatti (sfondo --color-text, testo bianco)

**Card:** sfondo cream, border-radius card, padding 1.5rem, icona Lucide in cerchio primary-pale (40x40).

**CTA card:** sfondo scuro (--color-text), testo bianco, Link a /contatti, senza shimmer.

**Animazioni CSS (no GSAP):**

- CSS transition fade-up (opacity + translateY 24px) con IntersectionObserver
- 9 card con delay scalato via nth-child (0.08s incremento)
- `contain: layout style paint` sulle card

**Responsive:** Griglia `repeat(3, 1fr)` su desktop, `repeat(2, 1fr)` tablet, scroll orizzontale mobile. Widescreen: max-width 1400px centrato.

---

### 14. CinematicCtaSection (`src/components/sections/CinematicCtaSection.tsx`)

Sezione CTA a due colonne prima del footer. Foto cuccioli a sinistra con dissolvenza CSS, testo a destra su sfondo cream.

**Layout:**

- Flex row: `.cine-img-wrap` (50%) + `.cine-content` (flex: 1)
- Sfondo cream (#FDF6EE) per alternanza con FuturiPadroniSection (warm-white)
- Foto originale alta qualità (5568x3712 JPG → 1600x1067 webp, quality 82, 43KB)
- CSS `mask-image` sfuma il bordo destro della foto (black 0-82%, transparent 100%) — no bordo visibile
- Titolo: "Ogni cucciolo merita la *famiglia giusta.*" — accent primary su "famiglia" e "giusta."

**Desktop (>= 768px) — GSAP entrance:**

- ScrollTrigger toggleActions (play, start top 75%) — no pin, no scrub
- Badge → titolo word-by-word (stagger 0.07) → body → CTA: sequenza GSAP
- Parallax foto: yPercent -4→4, scrub 0.6

**Mobile (< 768px) — stack colonna:**

- flex-direction: column, immagine sopra, testo sotto centrato
- mask-image: fade bottom (black 0-65%, transparent 100%)
- CSS transition entrance via IntersectionObserver (fade-up stagger)
- `.cine-word` diventa display: inline (no per-word animation)

**Accessibilità:** aria-label sulla sezione, focus-visible sul CTA, prefers-reduced-motion mostra tutto senza animazione.

---

### 15. PedigreeSection (`src/components/sections/PedigreeSection.tsx`)

Sezione educativa che spiega cos'è il pedigree e perché è importante. Posizionata dopo CinematicCtaSection, ultima sezione prima del footer.

**Struttura:**

- Header centrato: badge "Il Pedigree" con dot pulsante + titolo con accent primary su "barboncino" + sottotitolo
- Griglia 2x3 desktop di 6 card informative:
  1. "Dati anagrafici" (FileText) — razza, nome, sesso, nascita, mantello, microchip
  2. "Albero genealogico" (GitBranch) — fino al quarto grado, purezza razza
  3. "Campioni in famiglia" (Trophy) — campioni bellezza/lavoro, premi esposizione
  4. "Salute genetica" (ShieldCheck) — patologie testate geneticamente
  5. "Libro delle Origini" (BookOpen) — iscrizione LOI ENCI
  6. "Tracciabilità completa" (UserCheck) — proprietario, allevatore, passaggi
- Callout blockquote: bordo sinistro primary, testo italico sull'importanza economica del pedigree

**Card:** sfondo cream (#FDF6EE), border-radius card, padding 1.5rem, icona Lucide in cerchio primary-pale (40x40), hover box-shadow.

**Animazioni CSS (no GSAP):**

- CSS transition fade-up (opacity + translateY) con IntersectionObserver
- 3 gruppi con delay scalato: header → griglia (0.22s) → callout (0.35s)
- `contain: layout style paint` sulle card

**Responsive:** Griglia `repeat(3, 1fr)` desktop, `repeat(2, 1fr)` tablet, 1 colonna mobile. Widescreen: padding 5rem 3rem.

---

### 16. Pagina Il Barbone (`src/pages/IlBarbone.tsx`)

Stub per `/il-barbone` — pagina dedicata alla razza (da sviluppare in Phase 4 estesa).
Attualmente: HeroSection + SEO Helmet (titolo, description, OG tags).
Raggiungibile dal pulsante "Leggi di più" nella BentoSection CTA card.

---

### 17. Lenis Smooth Scroll (`src/lib/lenis.ts`)

Smooth scroll globale integrato con GSAP ticker.

**Come funziona:**

- `initLenis()` chiamata in `src/main.tsx` prima del render
- Opzioni: `autoRaf: false` (GSAP ticker controlla), `syncTouch: false` (touch nativo su mobile)
- Lenis alimentato da `gsap.ticker.add((time) => lenis.raf(time * 1000))` — tick unificato
- `lenis.on('scroll', ScrollTrigger.update)` — ScrollTrigger sincronizzato con Lenis
- `gsap.ticker.lagSmoothing(0)` — no jump nel refresh di ScrollTrigger
- Skip automatico se `prefers-reduced-motion: reduce`

---

### 18. Feature Pianificate (stub presenti, funzionalità in fasi future)

### 16. NewsletterSection (`src/components/sections/NewsletterSection.tsx`)

Sezione newsletter per iscrizione alla mailing list. Layout 2 colonne: testo a sinistra, form a destra.

- **Sfondo:** cream (alternanza con PedigreeSection warm-white)
- **Badge:** "Newsletter" con dot pulsante (animazione CSS pulse)
- **Titolo:** "Resta *aggiornato*" (accent primary su "aggiornato")
- **Form:** campo email + bottone "Iscriviti" + checkbox GDPR obbligatoria
- **Validazione:** react-hook-form + Zod (email valida, consenso required)
- **Integrazione:** Brevo API (POST /v3/contacts con api-key header)
  - Variabili: `VITE_BREVO_API_KEY`, `VITE_BREVO_LIST_ID` in `.env.local`
  - Double opt-in gestito lato dashboard Brevo
  - Gestione duplicati (Brevo risponde "duplicate_parameter" → trattato come successo)
- **Stati UI:** idle → loading (spinner) → success (messaggio verde) → error (fallback contatto diretto)
- **Nota privacy:** "Nessuno spam. Puoi disiscriverti in qualsiasi momento."
- **Animazione:** CSS transition entrance (IntersectionObserver): testo fade-up → form fade-up (delay 0.15s)
- **Mobile:** stack colonna, form centrato full-width

### 17. ContactSection (`src/components/sections/ContactSection.tsx`)

Sezione contatti con form e info. Header centrato + 2 colonne: form (55%) + info card (45%).

- **Sfondo:** warm-white (trasparente, alternanza con Newsletter cream)
- **Badge:** "Contatti" con dot pulsante
- **Titolo:** "Hai domande? *Scrivici.*" (accent primary su "Scrivici.")
- **Form campi:** Nome (min 2), Email (validata), Messaggio (textarea, min 10), Checkbox GDPR
- **Validazione:** react-hook-form + Zod
- **Integrazione:** EmailJS (@emailjs/browser, già installato)
  - Variabili: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- **Stati UI:** idle → loading → success ("Messaggio inviato!") → error (email diretta come alternativa)
- **Info card (destra):** sfondo cream, border-radius card
  - `MapPin` — indirizzo + link Google Maps
  - `Phone` — fisso 0761 179 0344 + cell 338 761 7628 (WhatsApp)
  - `Mail` — maatilayla.org@gmail.com
  - `Clock` — Lun-Sab 9.00-13.00 | 15.30-19.00
  - Nota: "La sede dell'allevamento è anche il posto in cui viviamo. Al fine di tutelare la nostra privacy, non potremo ricevere chi non avrà preventivamente fissato un appuntamento."
- **Animazione:** CSS transition entrance: header → form (0.15s) → info card (0.25s)
- **Mobile:** stack colonna, info card full-width

#### Newsletter footer (futuro)

#### Dark / Light Mode (Phase 5)

- Toggle in Navbar (icona sole/luna con Framer Motion)
- Strategia: classe `.dark` su `<html>` + override CSS variables
- Palette dark calda: sfondo `#1C1610`, surface `#252018`, testo `#F5EDE0`
- Persistenza: `localStorage` (sovrascrive preferenza OS `prefers-color-scheme`)
- Stub attuale: toggle visibile in Navbar ma non funzionante

#### Internazionalizzazione IT · EN · FR · ES (Phase 8)

- Libreria: `react-i18next` con lazy loading namespace
- URL: `/en/`, `/fr/`, `/es/` — italiano default senza prefisso
- Language switcher in Navbar + Footer (sotto "Legale")
- SEO: `hreflang` tag su ogni pagina per ogni lingua
- Stub attuale: switcher IT/EN/FR/ES visibile nel footer, solo IT attivo

---

## L'AI — Agents, Skills e Configurazione

### Cos'è Claude Code?

Lo strumento che stai usando ora. È un assistente AI che può leggere, scrivere e modificare codice direttamente nel tuo progetto. Può anche eseguire comandi nel terminale (build, lint, ecc.).

### Agents (`.claude/agents/`)

Sono "prompt specializzati" — istruzioni predefinite per compiti specifici:

| Agent                 | Cosa fa                                                     |
| --------------------- | ----------------------------------------------------------- |
| **component-builder** | Crea componenti React seguendo il design system             |
| **content-writer**    | Scrive testi in italiano con tono corretto per il sito      |
| **seo-reviewer**      | Controlla SEO: meta tag, performance, structured data       |
| **a11y-auditor**      | Controlla accessibilità: contrasto, keyboard, screen reader |
| **deploy**            | Guida al deploy su Siteground con checklist                 |

**Come usarli:** Quando chiedi a Claude di fare qualcosa, lui può invocare questi agent per avere istruzioni specializzate. Non devi fare nulla di manuale.

### MCP Servers (`.mcp.json`)

**MCP = Model Context Protocol.** Sono "connettori" che danno a Claude capacità extra.

Attualmente configurato:

- **Context7** (Upstash): gestisce contesto lungo tra conversazioni

### CLAUDE.md

Il file più importante per l'AI. Contiene TUTTE le regole del progetto:

- Colori esatti da usare
- Font e dimensioni
- Come strutturare i componenti
- Convenzioni di naming
- Regole accessibilità
- Comandi disponibili

Quando Claude legge questo file, "sa" come deve lavorare nel tuo progetto. È come dare un brief dettagliato a un designer.

### Vibe Kanban (`.planning/config.json`)

Tool di project management per AI. Traccia fasi, task, dipendenze. Si avvia con `npm run kanban`.

### Permessi (`.claude/settings.json`)

Lista whitelist dei comandi che Claude può eseguire senza chiederti permesso (build, dev, lint, install). Per sicurezza, comandi pericolosi richiedono sempre la tua approvazione.

---

## Tooling per Sviluppatori

### Pre-commit hooks (Husky + lint-staged)

**Cosa fanno:** Ogni volta che fai un `git commit`, automaticamente:

1. ESLint controlla errori nel codice
2. Prettier formatta il codice in modo uniforme
3. Se ci sono errori, il commit viene bloccato

È come avere un "correttore di bozze" automatico.

### ESLint (controllo errori)

Analizza il codice e segnala problemi: variabili non usate, errori di tipo, pattern pericolosi. Configurato con regole strict per TypeScript e React hooks.

### Prettier (formattazione)

Formatta il codice in modo consistente: indentazione, virgole, apici. Non devi preoccuparti di formattare — lo fa lui.

### .editorconfig

Dice a qualsiasi editor (VS Code, Sublime, ecc.) di usare le stesse impostazioni: spazi (non tab), 2 spazi per livello, fine riga Unix.

### .vscode/ (configurazione editor)

- **extensions.json**: suggerisce le estensioni utili (Prettier, ESLint, Tailwind)
- **settings.json**: format-on-save attivo, ESLint auto-fix al salvataggio

---

## SEO — Cosa Abbiamo Fatto

| Elemento                 | Stato   | Equivalente WordPress   |
| ------------------------ | ------- | ----------------------- |
| `<title>` per pagina     | ✅      | Yoast SEO → Titolo      |
| `<meta description>`     | ✅      | Yoast SEO → Descrizione |
| Open Graph tags          | ✅      | Yoast SEO → Social      |
| robots.txt               | ✅      | Plugin o file manuale   |
| sitemap.xml              | ✅      | Yoast SEO → Sitemap     |
| .htaccess SPA routing    | ✅      | Automatico in WP        |
| Structured data (schema) | Phase 6 | Yoast SEO → Schema      |
| Google Search Console    | Phase 6 | Plugin + verifica       |
| Core Web Vitals          | Phase 6 | N/A (nuovo standard)    |
| Protezione contenuti     | ✅      | Plugin anti-copy        |

---

## Performance — Cosa Abbiamo Fatto

### Code Splitting

Il codice JavaScript è diviso in "pezzi":

- **vendor** (47 KB): React, Router — scaricato una volta, poi in cache
- **gsap** (70 KB): animazioni — separato perché pesante
- **app** (213 KB): il tuo codice
- **pagine** (~1 KB ciascuna): scaricate solo quando servono (lazy loading)

In WordPress tutto il JS dei plugin veniva caricato su ogni pagina. Qui carichi solo quello che serve.

### Immagini

- Formato **WebP** (più leggero di JPG/PNG)
- Favicon scaricata dal sito originale WordPress

### Font

- **Preconnect**: il browser inizia a scaricare i font prima ancora di sapere che servono
- **display=swap**: mostra testo subito con font di sistema, poi sostituisce quando il font custom è pronto

---

## Comandi Utili

```bash
# Sviluppo
npm run dev          # Avvia server locale (vedi le modifiche in tempo reale)
npm run build        # Crea versione finale
npm run preview      # Preview della build

# Qualità codice
npm run lint         # Controlla errori
npm run lint:fix     # Correggi errori automaticamente
npm run format       # Formatta codice
npm run format:check # Controlla formattazione

# Project management
npm run kanban       # Avvia Vibe Kanban

# Git (da terminale)
git status           # Vedi file modificati
git add .            # Prepara tutto per il commit
git commit -m "msg"  # Salva con messaggio
git push             # Invia su GitHub
```

---

## Glossario Veloce

| Termine          | Significato                                                           |
| ---------------- | --------------------------------------------------------------------- |
| **Componente**   | Pezzo riutilizzabile di UI (come un widget Elementor)                 |
| **Props**        | Parametri passati a un componente (come le impostazioni di un widget) |
| **Hook**         | Funzione speciale React (`useState`, `useEffect`, `useRef`)           |
| **State**        | Dati che cambiano nel tempo (es: menu aperto/chiuso)                  |
| **Effect**       | Codice che si esegue dopo il render (es: animazione d'ingresso)       |
| **Ref**          | Riferimento diretto a un elemento HTML (per GSAP)                     |
| **Media query**  | Regola CSS che cambia stile in base alla larghezza schermo            |
| **Breakpoint**   | Soglia di larghezza dove cambia il layout (768px, 1024px)             |
| **Lazy loading** | Carica contenuto solo quando serve                                    |
| **Bundle**       | Il file JS finale impacchettato da Vite                               |
| **Chunk**        | Un pezzo del bundle (vendor, gsap, pagine)                            |
| **Build**        | Il processo che trasforma il codice sorgente in file ottimizzati      |
| **SPA**          | Single Page Application — un solo caricamento, navigazione interna    |
| **SSR**          | Server Side Rendering — non lo usiamo, siamo full SPA                 |
| **TypeScript**   | JavaScript con controllo tipi (meno bug)                              |
| **JSX/TSX**      | Sintassi che permette di scrivere HTML dentro JavaScript              |
