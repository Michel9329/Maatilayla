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
- [ ] Footer completo (info, links, social, copyright)
- [ ] Test cross-device finale

### Phase 3 — Homepage Sezioni
**Goal:** Tutte le sezioni della homepage completate

- [ ] Sezione "Perché Maatilayla" (features/valori)
- [ ] Sezione cuccioli disponibili (cards)
- [ ] Galleria preview (Swiper)
- [ ] Testimonials
- [ ] CTA finale

### Phase 4 — Pagine Interne
**Goal:** Tutte le pagine del menu completate

- [ ] Chi Siamo
- [ ] Blog (lista articoli + singolo)
- [ ] Galleria (lightbox YARL)
- [ ] F.A.Q. (accordion)
- [ ] Contatti (form EmailJS)

### Phase 5 — Deploy
**Goal:** Sito live su Siteground

- [ ] Build ottimizzata (immagini WebP, font self-hosted GDPR)
- [ ] Deploy su Siteground (FTP/SFTP dist/ → public_html/)
- [ ] SSL + DNS configurati
- [ ] Test cross-browser + mobile

### Phase 6 — SEO & Ottimizzazione
**Goal:** Massimizzare visibilità e performance

- [ ] Lighthouse audit (target 90+ su tutte le categorie)
- [ ] Structured data (LocalBusiness, FAQ schema)
- [ ] Google Search Console + Analytics GA4
- [ ] Ottimizzazione Core Web Vitals (LCP, CLS, INP)
- [ ] Meta description e titoli ottimizzati per keyword
- [ ] Sitemap.xml dinamica
- [ ] Schema markup per allevamento (Organization, Product)
- [ ] Test OG tags (Facebook, WhatsApp, Telegram preview)

### Phase 7 — Blog CMS (post-lancio)
**Goal:** Blog aggiornabile senza toccare codice

- [ ] Valutazione headless CMS (Contentful vs Sanity vs Decap)
- [ ] Integrazione CMS con pagina Blog
- [ ] Pannello admin per scrivere/modificare articoli
- [ ] Immagini articoli gestite dal CMS
- [ ] RSS feed
