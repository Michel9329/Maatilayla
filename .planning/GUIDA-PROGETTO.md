# Guida Progetto Maatilayla — Da WordPress a React

Questa guida spiega tutto quello che è stato fatto, come funziona, e cosa significa ogni pezzo.
Scritta per chi viene da WordPress/Elementor e vuole capire il progetto.

---

## Il Quadro Generale

**Prima (WordPress):** Il tuo sito era un'applicazione server-side. Ogni volta che un utente cliccava un link, il server generava una nuova pagina HTML e la inviava al browser. Elementor aggiungeva un page builder visuale sopra WordPress.

**Ora (React SPA):** Il sito è una Single Page Application. Il browser scarica TUTTO il codice una volta sola, poi naviga tra le pagine istantaneamente senza ricaricare. È come un'app mobile nel browser.

| Concetto WordPress | Equivalente React |
|---|---|
| Tema + child theme | `src/index.css` + Tailwind CSS |
| Header.php | `src/components/layout/Navbar.tsx` |
| Footer.php | `src/components/layout/Footer.tsx` |
| Template pagina | `src/pages/Home.tsx`, `ChiSiamo.tsx`, ecc. |
| Plugin SEO (Yoast) | `react-helmet-async` (meta tag per pagina) |
| Plugin form (CF7) | React Hook Form + Zod + EmailJS |
| Media Library | `public/content/images/` e `public/content/logos/` |
| .htaccess | Stesso file, ma per SPA routing |
| functions.php | `src/hooks/` (funzioni riutilizzabili) |
| wp-config.php | `.env.local` (variabili segrete) |
| Plugin = funzionalità | `npm install pacchetto` (librerie) |

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
<Bottone testo="Contattaci" />
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

**Nel nostro progetto:** L'animazione d'ingresso della hero card (appare dal basso con fade-in). La navbar che appare dall'alto. Il pulsante "pulse dot" verde.

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
La sezione grande con l'immagine del cucciolo e la card vetro.

**Come funziona:**
- **Sfondo**: immagine WebP del cucciolo, copre tutto lo spazio
- **Overlay**: gradiente scuro sopra l'immagine per leggibilità
- **Glass card**: effetto "liquid glass" Apple — sfocatura + bordi luminosi + ombra
- **Responsive**: la card è in basso centrata su mobile, a destra su desktop
- **Testi**: versione corta su mobile, completa su desktop (toggle CSS)

**Il bug widescreen risolto:** Su monitor ultrawide (49"), il CSS `aspect-ratio: 16/8` combinato con `max-height: 90vh` faceva restringere la larghezza del hero. Risolto sostituendo con `height: clamp(560px, 50vw, 90vh)` che mantiene la stessa proporzione senza effetti collaterali.

### 3. Layout (`src/components/layout/Layout.tsx`)
Il "wrapper" che contiene Navbar + contenuto pagina + Footer. Ogni pagina viene renderizzata dentro `<main>`. Include il link "Salta al contenuto" per accessibilità.

### 4. CSS (`src/index.css`)
Il file di stile principale. Contiene:
- **@theme**: variabili CSS (colori, font, raggi bordo) — come il "Design System" in Elementor
- **Liquid glass**: effetto vetro sfocato riutilizzabile
- **Hero responsive**: 3 breakpoints (768px, 1024px, 1440px) con media queries CSS pure
- **Bottoni hero**: primario (filled) e outline (ghost) con effetti hover/active
- **Navbar pill**: due modalità (hero trasparente, scrolled opaca)
- **Accessibilità**: focus-visible per keyboard, prefers-reduced-motion

### 5. Pagine (`src/pages/`)
6 pagine con react-helmet-async per SEO:
- Ogni pagina ha `<title>`, `<meta description>`, e **Open Graph tags** per condivisione social
- Home è caricata subito, le altre sono **lazy loaded** (scaricate solo quando servono)

---

## L'AI — Agents, Skills e Configurazione

### Cos'è Claude Code?
Lo strumento che stai usando ora. È un assistente AI che può leggere, scrivere e modificare codice direttamente nel tuo progetto. Può anche eseguire comandi nel terminale (build, lint, ecc.).

### Agents (`.claude/agents/`)
Sono "prompt specializzati" — istruzioni predefinite per compiti specifici:

| Agent | Cosa fa |
|---|---|
| **component-builder** | Crea componenti React seguendo il design system |
| **content-writer** | Scrive testi in italiano con tono corretto per il sito |
| **seo-reviewer** | Controlla SEO: meta tag, performance, structured data |
| **a11y-auditor** | Controlla accessibilità: contrasto, keyboard, screen reader |
| **deploy** | Guida al deploy su Siteground con checklist |

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

| Elemento | Stato | Equivalente WordPress |
|---|---|---|
| `<title>` per pagina | ✅ | Yoast SEO → Titolo |
| `<meta description>` | ✅ | Yoast SEO → Descrizione |
| Open Graph tags | ✅ | Yoast SEO → Social |
| robots.txt | ✅ | Plugin o file manuale |
| sitemap.xml | ✅ | Yoast SEO → Sitemap |
| .htaccess SPA routing | ✅ | Automatico in WP |
| Structured data (schema) | Da fare | Yoast SEO → Schema |
| Google Search Console | Da fare | Plugin + verifica |

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

| Termine | Significato |
|---|---|
| **Componente** | Pezzo riutilizzabile di UI (come un widget Elementor) |
| **Props** | Parametri passati a un componente (come le impostazioni di un widget) |
| **Hook** | Funzione speciale React (`useState`, `useEffect`, `useRef`) |
| **State** | Dati che cambiano nel tempo (es: menu aperto/chiuso) |
| **Effect** | Codice che si esegue dopo il render (es: animazione d'ingresso) |
| **Ref** | Riferimento diretto a un elemento HTML (per GSAP) |
| **Media query** | Regola CSS che cambia stile in base alla larghezza schermo |
| **Breakpoint** | Soglia di larghezza dove cambia il layout (768px, 1024px) |
| **Lazy loading** | Carica contenuto solo quando serve |
| **Bundle** | Il file JS finale impacchettato da Vite |
| **Chunk** | Un pezzo del bundle (vendor, gsap, pagine) |
| **Build** | Il processo che trasforma il codice sorgente in file ottimizzati |
| **SPA** | Single Page Application — un solo caricamento, navigazione interna |
| **SSR** | Server Side Rendering — non lo usiamo, siamo full SPA |
| **TypeScript** | JavaScript con controllo tipi (meno bug) |
| **JSX/TSX** | Sintassi che permette di scrivere HTML dentro JavaScript |
