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
- [x] Accessibility: focus-visible, prefers-reduced-motion
- [x] SEO base: Helmet su tutte le pagine stub
- [x] Build production pulita (zero errori TS)
- [x] Hook useMediaQuery riusabile

### Phase 1 — Scraping Contenuti Sito Attuale ✅
**Goal:** Estrarre tutti i testi dal sito WordPress per riutilizzarli

- [x] Homepage — testi hero, sezioni, CTA
- [x] Chi Siamo — testo completo
- [x] Blog — 15 articoli estratti via WordPress REST API
- [x] Galleria — didascalie e descrizioni
- [x] F.A.Q. — domande e risposte
- [x] Contatti — testi, indirizzi, info
- [x] Contenuti salvati in `content/testi-sito-attuale/` (7 pagine + 15 blog + index)

### Phase 2 — Header, Hero Section & Footer
**Goal:** Componenti riusabili per header (navbar), hero section e footer — utilizzati su tutte le pagine

- [x] Navbar floating pill (logo, links, CTA, glass effect, hamburger mobile)
- [x] Hero section con glass card Apple-style
- [x] Responsive fluido CSS (mobile → tablet → desktop → ultrawide)
- [x] Liquid glass material (blur, specular highlight, rim lighting)
- [x] GSAP entrance animations con prefers-reduced-motion
- [x] Scrollbar compensation per simmetria margini
- [ ] Hero riusabile con props (immagine, titolo, descrizione, CTA)
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

### Phase 5 — Deploy & SEO
**Goal:** Sito live su Siteground

- [ ] Build ottimizzata
- [ ] .htaccess per SPA routing
- [ ] sitemap.xml + robots.txt
- [ ] Open Graph / meta tags
- [ ] Test cross-browser + mobile
