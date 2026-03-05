# Roadmap — Maatilayla v1.0

## Milestone v1.0 — Sito Completo

### Phase 0 — Setup & Health Check ✅

**Goal:** Progetto funzionante, configurazioni, AI agents, skills, GitHub, code health

- [x] Progetto React + Vite + TypeScript inizializzato
- [x] Routing funzionante (React Router v7)
- [x] Tailwind CSS v4 configurato con palette e font
- [x] Layout base (Layout, Navbar, Footer stub)
- [x] GitHub repo configurato e push funzionante
- [x] Claude Code agents creati (component-builder, content-writer, seo-reviewer, a11y-auditor, deploy)
- [x] MCP servers configurati (context7)
- [x] Permissions `.claude/settings.json` ottimizzate
- [x] Controllo qualità codice (dead code, console.log, unused imports)
- [x] Accessibility: focus-visible, prefers-reduced-motion, skip-to-content
- [x] SEO base: Helmet su tutte le pagine stub
- [x] Build production pulita (zero errori TS, zero ESLint)
- [x] Hook useMediaQuery riusabile
- [x] CLAUDE.md — convenzioni progetto per AI
- [x] .editorconfig — standard indentazione/line endings
- [x] .vscode/extensions.json + settings.json — DX configurata
- [x] Prettier + ESLint + eslint-config-prettier
- [x] Husky + lint-staged pre-commit hooks
- [x] .env.example documentato
- [x] .gitignore completo (secrets, settings.local.json)
- [x] Code splitting (lazy pages + manual chunks vendor/gsap)
- [x] react-helmet-async v3 (compatibile React 19)
- [x] npm audit 0 vulnerabilità
- [x] robots.txt + sitemap.xml
- [x] Open Graph meta tags su tutte le 6 pagine
- [x] README.md aggiornato con setup/script/struttura
- [x] Favicon dal sito WordPress originale
- [x] .htaccess completo (SPA routing + compression + cache 1y + security headers)
- [x] GitHub Actions CI/CD (type-check + lint + format + build su ogni push/PR)
- [x] CLAUDE.md aggiornato (OG convention, GSAP clearProps, browser support, comandi)
- [x] Agent component-builder aggiornato (translate vs transform, clearProps pattern)
- [x] Permessi settings.json completi (format, preview, audit)

### Phase 1 — Scraping Contenuti Sito Attuale ✅

**Goal:** Estrarre tutti i testi dal sito WordPress per riutilizzarli

- [x] Homepage — testi hero, sezioni, CTA
- [x] Chi Siamo — testo completo
- [x] Blog — 15 articoli estratti via WordPress REST API
- [x] Galleria — didascalie e descrizioni
- [x] F.A.Q. — domande e risposte
- [x] Contatti — testi, indirizzi, info
- [x] Contenuti salvati in `content/testi-sito-attuale/` (7 pagine + 15 blog + index)

### Phase 2 — Header, Hero Section & Footer 🔄

**Goal:** Componenti riusabili per header (navbar), hero section e footer

- [x] Navbar floating pill (logo, links, CTA, glass effect)
- [x] Hamburger menu mobile + fullscreen drawer
- [x] Drawer chiude su: click link, Escape, back/forward browser
- [x] Hero section con glass card Apple-style
- [x] Responsive fluido CSS-only (mobile → tablet → desktop → ultrawide)
- [x] Liquid glass material (blur, specular highlight, rim lighting)
- [x] GSAP entrance animations con prefers-reduced-motion
- [x] clearProps GSAP per evitare conflitto transform/translate
- [x] Scrollbar compensation per simmetria margini
- [x] Fix widescreen (aspect-ratio → clamp per ultrawide)
- [x] Altezza hero responsiva per device (smartphone/tablet/desktop)
- [x] Hero riusabile con props (immagine, titolo, descrizione, CTA)
- [x] CSS @keyframes al posto di GSAP per hero (risolto conflitto translate/transform)
- [x] Navbar hero-mode trasparente su tutte le pagine
- [x] ScrollToTop su cambio pagina
- [x] Footer completo (brand, naviga, legale, contatti, bottom bar)
- [x] Footer: loghi ENCI/FCI con link ufficiali, accessibilità WCAG AA
- [x] Footer: sticky al fondo viewport (flex layout su #root)
- [x] Footer: newsletter stub full-width (funzionale in Phase 3)
- [x] Footer: language switcher stub IT/EN/FR/ES (funzionale in Phase 8)
- [x] Footer: sitemap spostata in bottom bar (ENCI · FCI · Albo Allevatori · Sitemap)
- [x] Footer: WCAG AA contrasto su sfondo #EDE5D8 (em italic #9b3e28, 5.4:1)
- [x] Footer: allineamento destra uniforme (padding-right 2rem su tutte le sezioni)
- [x] Footer: icone contatti centrate verticalmente (align-items: center)
- [x] Scrollbar compensation globale (overflow-y: scroll su html — margini sempre simmetrici)
- [x] Responsive footer completo (mobile/tablet/desktop verificato)
- [ ] Test cross-device finale (Phase 2 + Phase 3 insieme)

### Phase 3 — Homepage Sezioni + Newsletter

**Goal:** Tutte le sezioni della homepage completate, newsletter integrata

- [x] Lenis smooth scroll (integrato con GSAP ticker, `src/lib/lenis.ts`)
- [x] StatsSection — contatori animati (3 stat: anni di attività, ettari, cani attivi)
- [x] BentoSection — griglia 2×2 con:
  - [x] Hero card testo (badge + titolo + 2 paragrafi con stagger GSAP)
  - [x] Photo slider (6 foto reali, Swiper EffectFade + Autoplay, cover positioning)
  - [x] Slider caratteristiche (6 caratteristiche, nav arrows, clip-path text reveal)
  - [x] CTA card (titolo + testo adattato + ghost pill button → /il-barbone)
  - [x] Hover tilt 3D su tutte le card (React handlers + gsap.to, ±4°, overwrite auto, expo.out return)
  - [x] Entrance animations ScrollTrigger (per-card trigger: top cards su sezione, bottom cards individuali)
- [x] Pagina stub `/il-barbone` (IlBarbone.tsx con HeroSection + SEO Helmet)
- [x] TestimonialsSection — marquee due righe direzioni opposte con:
  - [x] 10 recensioni reali Google (5 per riga, troncate a 150 chars + "leggi di più")
  - [x] CSS @keyframes marquee (compositor thread, zero scatti)
  - [x] Riga reverse: keyframe dedicato + 3 copie items + pre-offset seamless
  - [x] Pause on hover (animation-play-state)
  - [x] CSS transition entrance: header fade-up, row slide da direzioni opposte
  - [x] Marquee avviato via setTimeout (~800ms/1100ms) dopo IntersectionObserver
  - [x] Avatar colorati variati, stelle inline con nome, responsive (260px mobile)
- [x] AllevamentoSection — Card Elevate layout (2 blocchi foto+testo alternati in card) con:
  - [x] Blocco 1: "Il nostro approccio" — filosofia allevamento, socializzazione, Biosensor
  - [x] Blocco 2: "Da Maatilayla a casa tua" — iter cucciolo, test genetici, garanzie
  - [x] 7 feature pills con icone Lucide (vaccini, eco, prcd-PRA, patella lux, microchip, pedigree, kit)
  - [x] CSS transition entrance: fade-up blocco intero, rAF pre-transition (no GSAP per entrate)
  - [x] GSAP solo per parallax foto (yPercent -8→8, scrub 0.6, force3d)
  - [x] Shimmer continuo sul bordo callout Biosensor (linear gradient, 6.5s)
  - [x] Float continuo sulle pills + pulse icone (CSS @keyframes, sfalsati a onda)
  - [x] Responsive: mobile stack verticale, tablet 44%, desktop 48%, widescreen padding 3rem
- [x] BlogPreviewSection — scroll orizzontale 6 card articoli con:
  - [x] Header centrato (badge "Dal Blog" + titolo + sottotitolo)
  - [x] Track orizzontale con peek pattern (~2.5 card visibili, terza tagliata)
  - [x] Card: foto 16/10, categoria+data, titolo line-clamp 2, excerpt line-clamp 3
  - [x] Drag-to-scroll desktop (mousedown/mousemove/mouseup), touch nativo mobile
  - [x] Progress bar scaleX (compositor, no layout recalc) + fade overlay div
  - [x] Scroll-snap x proximity, scrollbar nascosta
  - [x] CSS transition entrance: header fade-up stagger + card opacity stagger (no GSAP)
  - [x] Keyboard nav (Arrow Left/Right), focus-visible, aria-label
  - [x] Hover: ombra + zoom foto 1.03, contain: layout style paint
  - [x] Link "Tutti gli articoli" nel subtitle-row
  - [x] Responsive: 85vw mobile, 42vw tablet, clamp(280,36vw,380) desktop, widescreen 3rem
- [x] Ottimizzazione performance scroll:
  - [x] Immagini compresse con sharp (blog: 5.8MB→388KB, allevamento: 1.5MB→81KB)
  - [x] Navbar backdrop-filter: blur(24px)→blur(10px), background più opaco
  - [x] Tutte le entrate convertite da GSAP a CSS transition + IntersectionObserver
  - [x] Lenis: syncTouch false, autoRaf false
  - [x] Regole immagini aggiunte a CLAUDE.md (formato, compressione, naming, alt text)
- [x] FuturiPadroniSection — griglia 2x2 card valori "Ai futuri padroni" con:
  - [x] Header centrato (badge con dot pulsante + titolo accent + sottotitolo)
  - [x] 4 card: consegna di persona, scelta consapevole, crescita sotto i nostri occhi, sempre al vostro fianco
  - [x] Icone Lucide in cerchio primary-pale (HandHeart, ShieldAlert, Eye, MessageCircleHeart)
  - [x] CTA "Hai domande? Scrivici" con link a /contatti
  - [x] CSS transition entrance: fade-up blocco intero (header + griglia + CTA con delay scalato)
  - [x] Sfondo warm-white (alternanza con cream del blog), contain: layout style paint
  - [x] Responsive: 2x2 desktop, 1 colonna mobile
- [x] CinematicCtaSection — layout flex due colonne (foto + testo) con:
  - [x] Foto originale alta qualità (5568x3712 JPG → 1600x1067 webp, quality 82)
  - [x] CSS mask-image per sfumare bordo destro foto nel cream (82%→100%)
  - [x] Sfondo cream per alternanza con FuturiPadroniSection (warm-white)
  - [x] Desktop: GSAP word-by-word entrance (toggleActions play, start top 75%)
  - [x] Titolo word-by-word reveal (span .cine-word, GSAP stagger 0.07)
  - [x] Badge → titolo → body → CTA sequenza GSAP
  - [x] Parallax foto (yPercent -4→4, scrub 0.6)
  - [x] Mobile: stack colonna, mask-image bottom fade, CSS transition entrance
  - [x] CTA "Contattaci" → /contatti (bottone primary)
  - [x] "famiglia giusta" accent primary (due parole)
  - [x] prefers-reduced-motion: tutto visibile, no animazione
  - [x] Accessibilità: aria-label, focus-visible, WCAG AA contrasto
- [x] PedigreeSection — griglia 2x3 card educativa "Importanza del pedigree" con:
  - [x] Header centrato (badge "Il Pedigree" + titolo accent "barboncino" + sottotitolo)
  - [x] 6 card: dati anagrafici, albero genealogico, campioni, salute genetica, LOI, tracciabilità
  - [x] Icone Lucide in cerchio primary-pale (FileText, GitBranch, Trophy, ShieldCheck, BookOpen, UserCheck)
  - [x] Callout blockquote con bordo sinistro primary (importanza economica pedigree)
  - [x] CSS transition entrance: header fade-up → griglia (delay 0.22s) → callout (delay 0.35s)
  - [x] Sfondo trasparente (warm-white body), card cream — alternanza con CinematicCTA cream
  - [x] Responsive: 3 col desktop, 2 col tablet, 1 col mobile
- [x] NewsletterSection — form iscrizione newsletter con Brevo API:
  - [x] Layout 2 colonne (testo + form), sfondo cream
  - [x] Badge "Newsletter" con dot pulsante
  - [x] Form: email + checkbox GDPR (react-hook-form + Zod)
  - [x] Integrazione Brevo API (POST /v3/contacts, listIds, updateEnabled)
  - [x] Stati UI: idle → loading (spinner) → success (conferma) → error (fallback)
  - [x] GDPR: checkbox consenso obbligatoria, nota privacy
  - [x] CSS transition entrance (IntersectionObserver, fade-up con delay)
  - [x] Responsive: stack colonna su mobile
- [x] ContactSection — form contatti con EmailJS + info:
  - [x] Header centrato (badge "Contatti" + titolo accent + sottotitolo)
  - [x] Layout 2 colonne: form 55% + info card 45%
  - [x] Form: nome, email, messaggio, checkbox GDPR (react-hook-form + Zod)
  - [x] Integrazione EmailJS (@emailjs/browser)
  - [x] Stati UI: idle → loading → success → error (fallback email diretta)
  - [x] Info card cream: indirizzo (Google Maps), telefono fisso+cell, email, orari
  - [x] Nota "visite solo su appuntamento"
  - [x] CSS transition entrance (header → form → info card con delay scalato)
  - [x] Responsive: stack colonna su mobile
- [x] InstagramFeedSection — marquee full-width 8 foto, card 300px, hover overlay Instagram
- [x] **Homepage polish completo:**
  - [x] Visual consistency (titoli, font-weight/size, padding uniformi)
  - [x] Content review (testi allineati WordPress, copy migliorati, "pedigree ENCI")
  - [x] SEO audit (canonical, structured data JSON-LD, OG, alt text, preload hero)
  - [x] Responsive ultra-wide (max-width 1400px container, CinematicCta 1920px+)
  - [x] Code audit (setTimeout cleanup, querySelector null check, build pulita)
  - [x] Link audit (52 interni + 15 esterni verificati, 0 rotti)
  - [x] Ordine sezioni aggiornato: Blog → Pedigree → ParallaxCta → FuturiPadroni
  - [x] FuturiPadroniSection espansa: 8 card valori + 1 CTA dark card (griglia 3x3)
  - [x] FaqCtaSection: min-height 480px allineata a ParallaxCtaSection
  - [x] ContactSection: testo privacy completo (come footer)
- [ ] **Newsletter — footer** (versione compatta inline nel footer, sopra la bottom bar)

### Phase 4 — Pagine Interne

**Goal:** Tutte le pagine del menu completate

#### Chi Siamo — 7 piani (in pianificazione)

**Piani:** 7 piani

Piani:
- [x] 04-01-PLAN.md — StoriaLaylaSection (racconto emotivo + foto placeholder + CSS ls-)
- [x] 04-02-PLAN.md — CredenzialiSection (3 card ENCI Layla Zarfati + CSS cr-)
- [x] 04-03-PLAN.md — ValoriSection (griglia 3x2 sei pillars + CSS vl-)
- [ ] 04-04-PLAN.md — StrutturaDSection (layout 2col + YouTube lazy facade + CSS st-/yt-)
- [ ] 04-05-PLAN.md — TimelineSection (5 tappe orizzontali + scroll-snap mobile + CSS tl-)
- [ ] 04-06-PLAN.md — WorldMapSection (SVG react19-simple-maps + dati JSON + CSS wm-)
- [ ] 04-07-PLAN.md — Assembly ChiSiamo.tsx + ChiSiamoCta + checkpoint visivo

#### Altre pagine (da pianificare separatamente)

- [ ] Blog (lista articoli + pagina singolo articolo)
- [ ] Galleria (lightbox YARL, griglia masonry)
- [ ] F.A.Q. (accordion animato)
- [ ] Contatti (form EmailJS: nome, email, messaggio, consenso GDPR)

### Phase 5 — Dark / Light Mode

**Goal:** Tema scuro completo, toggle persistente, tutto il sito coperto

**Decisioni architetturali:**

- Strategia: classe `.dark` su `<html>` + override CSS variables (no Tailwind dark:)
- Rilevamento automatico: `prefers-color-scheme: dark` come default iniziale
- Persistenza: `localStorage` (scelta utente sovrascrive OS preference)
- Token: palette dark definita in `@media (prefers-color-scheme: dark)` e `.dark {}`

**Palette dark (da definire):**

- Background: warm dark (es. #1C1610) — non nero puro, mantiene calore
- Surface: #252018 (cards, footer)
- Text: #F5EDE0 (testo principale)
- Text muted: #A89070
- Primary: #E07B60 (leggermente più chiaro per contrasto su dark)
- Bordi: rgba(255,255,255,0.1)

**Task:**

- [ ] Definire palette dark e aggiungere token in `src/index.css`
- [ ] Toggle button in Navbar (icona sole/luna, animazione Framer Motion)
- [ ] Hook `useTheme` (legge/scrive localStorage, applica classe a `<html>`)
- [ ] Dark mode: Navbar (glass scuro, logo leggibile)
- [ ] Dark mode: Hero section (overlay, glass card)
- [ ] Dark mode: Footer (sfondo, bordi, testi)
- [ ] Dark mode: tutte le sezioni Homepage (Phase 3)
- [ ] Dark mode: tutte le Pagine Interne (Phase 4)
- [ ] Dark mode: form contatti e newsletter
- [ ] Dark mode: Swiper, lightbox YARL
- [ ] Test accessibilità contrasto WCAG su entrambi i temi
- [ ] Test cross-device (mobile toggle, OS sync)

### Phase 6 — Pre Go-Live: Configurazione Servizi & Test

**Goal:** Tutti i servizi configurati, API key inserite, link e CTA verificati, strumenti di marketing e compliance pronti prima del deploy

#### API Key & Servizi (`.env.local` → `.env.production`)
- [ ] **EmailJS** — inserire `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- [ ] **Brevo** — inserire `VITE_BREVO_API_KEY`, `VITE_BREVO_LIST_ID`; attivare double opt-in; verificare mittente `maatilayla.org@gmail.com`
- [ ] **Google reCAPTCHA v3** — inserire `VITE_RECAPTCHA_SITE_KEY`; aggiungere dominio `allevamentobarboncinimaatilayla.it` + `localhost` alla console reCAPTCHA
- [ ] **Google Analytics GA4** — inserire `VITE_GA_TRACKING_ID`; configurare con consenso cookie iubenda (fire solo dopo accettazione)
- [ ] Test invio email dal form contatti (verifica ricezione su `maatilayla.org@gmail.com`)
- [ ] Test iscrizione newsletter (verifica contatto su dashboard Brevo)

#### iubenda — Privacy & GDPR
- [ ] Generare **Privacy Policy** su iubenda e integrare (link nel footer)
- [ ] Generare **Cookie Policy** su iubenda e integrare (link nel footer)
- [ ] Generare **Termini e Condizioni** su iubenda e integrare (link nel footer)
- [ ] **Cookie Solution** — banner consenso GDPR al primo accesso (script iubenda)
- [ ] **Preferenze Cookie** — pulsante gestione nel footer (sostituisce `#preferenze`)
- [ ] Footer: sostituire link stub (`#privacy`, `#cookie`, `#preferenze`, `#termini`) con URL iubenda reali

#### Cloudflare
- [ ] DNS dominio `allevamentobarboncinimaatilayla.it` puntato a Cloudflare
- [ ] SSL/TLS in modalità Full (strict) — certificato attivo
- [ ] Cache statico attivato (immagini, JS, CSS — TTL 1 mese)
- [ ] Regola Page Rule: `www.` → redirect 301 a dominio apex (o viceversa, scegliere canonical)
- [ ] Firewall: rate limiting su `/` (protezione base DDoS)
- [ ] Speed: Minify HTML/CSS/JS attivato
- [ ] Verifica .htaccess compatibile con Cloudflare (header già presenti)

#### Google Search Console
- [ ] Dominio già verificato — verificare che la verifica sia ancora attiva dopo migrazione
- [ ] Inviare nuova sitemap `https://allevamentobarboncinimaatilayla.it/sitemap.xml`
- [ ] Richiedere indicizzazione homepage manuale (Ispeziona URL → Indicizza)

#### Test Completo Pre-Lancio
- [ ] Test tutti i **link interni** (menu, CTA, footer — 52 link verificati in Phase 3, ricontrollare dopo pagine interne Phase 4)
- [ ] Test tutti i **link esterni** (ENCI, FCI, Google Maps, WhatsApp, social)
- [ ] Test **form contatti** — invio reale con email di test
- [ ] Test **newsletter** — iscrizione reale su tutte e 3 le entry point (sezione homepage, footer, pagina contatti)
- [ ] Test **cross-browser**: Chrome, Safari, Firefox, Edge (desktop)
- [ ] Test **cross-device**: iPhone (Safari), Android (Chrome), tablet
- [ ] Verifica **nessun console.error** in produzione (DevTools → Console)
- [ ] Verifica **.htaccess** funzionante su Apache Siteground (SPA routing, compression, cache)
- [ ] Build produzione finale pulita (`npm run build` zero errori)

### Phase 7 — Deploy su Siteground

**Goal:** Sito live sul dominio reale

- [ ] Build ottimizzata finale (`npm run build`)
- [ ] Ottimizzazione logo ENCI (430KB → max 60KB WebP/PNG compressa)
- [ ] Upload `dist/` su Siteground via FTP/SFTP → `public_html/`
- [ ] Verifica sito live su `https://allevamentobarboncinimaatilayla.it`
- [ ] Test SSL attivo (lucchetto verde, redirect HTTP→HTTPS)
- [ ] Verifica Cloudflare proxy attivo (arancione) su tutti i record DNS

### Phase 8 — SEO & Ottimizzazione

**Goal:** Massimizzare visibilità organica e performance Core Web Vitals

- [ ] Lighthouse audit (target 90+ su tutte le categorie)
- [ ] Ottimizzazione Core Web Vitals (LCP, CLS, INP)
- [ ] Meta description e titoli ottimizzati per keyword principali
- [ ] Sitemap.xml dinamica (include tutte le pagine e lingue)
- [ ] Schema markup aggiuntivo (DogBreeder, FAQ, BreadcrumbList)
- [ ] Test OG tags (Facebook, WhatsApp, Telegram preview)
- [ ] Robots.txt ottimizzato per crawler

### Phase 9 — Internazionalizzazione (IT · EN · FR · ES)

> Fase gia' pianificata — il language switcher (IT|EN|FR|ES) e' gia' presente come stub nel footer

**Goal:** Sito accessibile in 4 lingue, SEO multilingua, switcher in UI

**Decisioni architetturali:**

- Libreria: `react-i18next` (standard de facto, lazy loading namespace)
- URL strategy: prefisso path `/en/`, `/fr/`, `/es/` — italiano default senza prefisso
- Rilevamento automatico: `i18next-browser-languagedetector` (navigator.language → redirect)
- Routing: `<LanguageWrapper>` layout route che imposta lingua da URL param

**Struttura file:**

```
src/i18n/
  index.ts          ← setup i18next
  locales/
    it.json         ← italiano (master)
    en.json
    fr.json
    es.json
```

**Task:**

- [ ] Installazione: `react-i18next`, `i18next`, `i18next-browser-languagedetector`
- [ ] Setup `src/i18n/index.ts` con lazy loading namespace
- [ ] Routing multilingua con React Router v7 (prefisso /en, /fr, /es)
- [ ] Language switcher in Navbar (bandiere o codice ISO: IT | EN | FR | ES)
- [ ] Language switcher in Footer (bottom bar)
- [ ] Traduzione: Navbar (tutti i link e CTA)
- [ ] Traduzione: Footer (tutti i testi, note legali, copyright)
- [ ] Traduzione: Homepage (hero, sezioni, newsletter, CTA)
- [ ] Traduzione: Chi Siamo
- [ ] Traduzione: Blog (titoli, UI; articoli in IT + EN a priorità)
- [ ] Traduzione: Galleria (didascalie)
- [ ] Traduzione: F.A.Q. (domande e risposte — tutte le 4 lingue)
- [ ] Traduzione: Contatti (form, testi, placeholder)
- [ ] SEO: `<link rel="alternate" hreflang="...">` su ogni pagina per ogni lingua
- [ ] SEO: Open Graph locale per ogni lingua (og:locale:alternate)
- [ ] Sitemap.xml: voci per ogni pagina × 4 lingue con hreflang
- [ ] Test: cambio lingua preserva pagina corrente
- [ ] Test: lingua OS → redirect automatico corretto

### Phase 10 — Blog CMS (post-lancio)

**Goal:** Blog aggiornabile senza toccare codice, gestione multilingua

- [ ] Valutazione headless CMS (Contentful vs Sanity vs Decap CMS)
  - Decap (ex Netlify CMS): open source, git-based, self-hosted → ideale per Siteground
  - Contentful: free tier 25k record, API-first, ottimo per multilingua
  - Sanity: real-time, ottimo developer experience, free tier generoso
- [ ] Integrazione CMS con pagina Blog (fetch articoli via API o filesystem)
- [ ] Pannello admin per scrivere/modificare articoli (senza deploy)
- [ ] Gestione immagini articoli via CMS
- [ ] Articoli in più lingue (linked translations)
- [ ] RSS feed (IT + EN)
- [ ] Preview articoli in bozza
