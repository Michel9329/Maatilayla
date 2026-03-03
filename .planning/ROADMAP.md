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

- [ ] Lenis smooth scroll (scroll fluido su tutto il sito)
- [ ] Sezione "Perché Maatilayla" (features/valori con icone)
- [ ] Sezione cuccioli disponibili (cards con foto, sesso, disponibilità)
- [ ] Galleria preview (Swiper carosello, link a pagina Galleria)
- [ ] Testimonials (citazioni con nome e foto)
- [ ] CTA finale (sezione richiamo contatti)
- [ ] **Newsletter — scelta provider** (Mailchimp vs Brevo vs ConvertKit: valutare piano gratuito, API disponibile, GDPR ready)
- [ ] **Newsletter — sezione homepage** (titolo, sottotitolo, campo email, CTA)
- [ ] **Newsletter — form** (react-hook-form + Zod, validazione email)
- [ ] **Newsletter — integrazione API provider** (subscribe endpoint, gestione double opt-in lato provider)
- [ ] **Newsletter — stati UI** (idle → loading → success / error)
- [ ] **Newsletter — GDPR** (checkbox consenso con link Privacy Policy, testo obbligatorio)
- [ ] **Newsletter — footer** (versione compatta inline nel footer, sopra la bottom bar)

### Phase 4 — Pagine Interne
**Goal:** Tutte le pagine del menu completate

- [ ] Chi Siamo (storia, valori, foto allevamento)
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

### Phase 6 — Deploy & Compliance GDPR
**Goal:** Sito live su Siteground, conforme GDPR con iubenda

- [ ] Build ottimizzata (immagini WebP, font self-hosted GDPR)
- [ ] Ottimizzazione logo ENCI (430KB → max 60KB WebP/PNG compressa)
- [ ] Deploy su Siteground (FTP/SFTP dist/ → public_html/)
- [ ] SSL + DNS configurati
- [ ] Test cross-browser + mobile (Chrome, Safari, Firefox, Edge)
- [ ] Verifica .htaccess su Apache Siteground
- [ ] **iubenda — Privacy Policy** (generata e integrata, link nel footer)
- [ ] **iubenda — Cookie Policy** (generata e integrata, link nel footer)
- [ ] **iubenda — Termini e Condizioni** (generati e integrati, link nel footer)
- [ ] **iubenda — Cookie Solution** (banner consenso GDPR al primo accesso, consent database)
- [ ] **iubenda — Preferenze Cookie** (pulsante gestione preferenze nel footer)
- [ ] Footer: link legali aggiornati con URL iubenda reali (sostituire #privacy, #cookie, #preferenze, #termini)

### Phase 7 — SEO & Ottimizzazione
**Goal:** Massimizzare visibilità e performance

- [ ] Lighthouse audit (target 90+ su tutte le categorie)
- [ ] Structured data JSON-LD (LocalBusiness, DogBreeder, FAQ, BreadcrumbList)
- [ ] Google Search Console configurato + sitemap inviata
- [ ] Google Analytics GA4 configurato (con consenso cookie)
- [ ] Ottimizzazione Core Web Vitals (LCP, CLS, INP)
- [ ] Meta description e titoli ottimizzati per keyword principali
- [ ] Sitemap.xml dinamica (include tutte le pagine e lingue)
- [ ] Schema markup Organization + breed-specific
- [ ] Test OG tags (Facebook, WhatsApp, Telegram preview)
- [ ] Robots.txt ottimizzato per crawler

### Phase 8 — Internazionalizzazione (IT · EN · FR · ES)
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

### Phase 9 — Blog CMS (post-lancio)
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
