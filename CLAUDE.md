# Maatilayla — Project Instructions

## Language
- All UI text, comments, and commit messages: **Italian** (unless technical terms)
- Code identifiers (variables, functions, components): **English**

## Design System

### Colors (defined in `src/index.css` @theme)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | #C8614A | CTA, links, accents |
| `--color-primary-light` | #E8845A | Hover states |
| `--color-primary-pale` | #FAE0D0 | Backgrounds, badges |
| `--color-secondary` | #C4956A | Caramel accents |
| `--color-accent` | #D4B896 | Sand beige |
| `--color-cream` | #FDF6EE | Section backgrounds |
| `--color-warm-white` | #FFFAF5 | Body background |
| `--color-text` | #1a1008 | Primary text |
| `--color-text-muted` | #6B5040 | Secondary text |

### Fonts
- **Heading**: Playfair Display (serif) — `var(--font-heading)`
- **Body**: Poppins (sans-serif) — `var(--font-body)`
- **Logo**: Great Vibes (cursive) — `var(--font-logo)`

### Spacing & Radius
- Card radius: `var(--radius-card)` = 1.5rem
- Hero radius: `var(--radius-hero)` = 1.875rem
- Button radius: `var(--radius-btn)` = 3rem

## Component Patterns

### Responsive
- **CSS media queries only** for layout responsive (no JS `isMobile` for positioning)
- `useMediaQuery` hook only for structural changes (hamburger menu, content toggle)
- Breakpoints: `768px` (tablet), `1024px` (desktop), `1440px` (widescreen)
- Mobile-first approach

### Glass Effect
- Desktop: `.liquid-glass` (blur 28px, low opacity)
- Mobile hero: `.hero-card` with lighter glass (blur 16px, higher opacity)
- Follow Apple HIG materials pattern (blur + specular highlight + rim lighting)

### Animations
- GSAP for entrance animations
- Always check `prefers-reduced-motion` before animating
- Framer Motion for interactive UI (hover, tap)
- Lenis for smooth scroll

### Hero Section
- Reusable via CSS classes: `.hero-section`, `.hero-bg`, `.hero-overlay`, `.hero-card`, `.hero-cta`
- Background image via inline `style={{ backgroundImage }}` for per-page customization
- Scrollbar compensation: `margin-right: calc(Xpx - 100vw + 100%)`

## File Structure
```
src/
  components/
    layout/     → Layout, Navbar, Footer
    sections/   → HeroSection, feature sections
    ui/         → Reusable UI components (buttons, cards)
  pages/        → Home, ChiSiamo, Blog, Galleria, Faq, Contatti
  hooks/        → useMediaQuery, useAnalytics
  lib/          → Utilities
  data/         → Static data, config
content/        → Scraped WordPress content, blog posts
public/content/ → Images, logos
.planning/      → PROJECT.md, ROADMAP.md
.claude/agents/ → AI agent prompts
```

## Conventions
- No emoji in code or UI text
- Prefer editing existing files over creating new ones
- Use `clamp()` for fluid typography
- Use CSS custom properties from `@theme` — never hardcode colors
- SEO: every page must have `<Helmet>` with Italian title + meta description
- Accessibility: all interactive elements must have visible focus styles

## Commands
- `npm run dev` — development server
- `npm run build` — production build (must pass clean)
- `npm run kanban` — Vibe Kanban board
