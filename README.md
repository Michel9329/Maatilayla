# Maatilayla — Allevamento Barboncini Toy

Sito web dell'allevamento amatoriale di barboncini toy fulvi Maatilayla, riconosciuto ENCI-FCI.

Rebuild completo da WordPress a React SPA moderna.

## Stack

- **React 19** + TypeScript + Vite 7
- **Tailwind CSS v4** (via @tailwindcss/vite)
- **React Router v7** (SPA routing)
- **GSAP 3** (animazioni)
- **React Hook Form** + Zod (form validation)
- **EmailJS** (invio form senza backend)
- **react-helmet-async** (SEO meta tags)

## Setup

```bash
npm install
cp .env.example .env.local   # configura le variabili d'ambiente
npm run dev                   # avvia dev server
```

## Script

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Dev server con HMR |
| `npm run build` | TypeScript check + build produzione |
| `npm run preview` | Preview della build |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format |
| `npm run format:check` | Prettier check |

## Struttura

```
src/
  components/
    layout/     Navbar, Footer, Layout
    sections/   HeroSection, ...
    ui/         Componenti riusabili
  pages/        Home, ChiSiamo, Blog, Galleria, Faq, Contatti
  hooks/        useMediaQuery, useAnalytics
  lib/          Utilities (cn helper)
  data/         Dati statici
public/
  content/      Immagini, loghi
```

## Deployment

Build per hosting Apache (Siteground):

```bash
npm run build
# Upload contenuto di dist/ in public_html/
# .htaccess incluso per SPA routing
```

## Convenzioni

Vedi [CLAUDE.md](./CLAUDE.md) per le convenzioni di progetto complete.
