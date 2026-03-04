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
- Desktop: `.liquid-glass` (blur 10px, low opacity)
- Mobile hero: `.hero-card` with lighter glass (blur 10px, higher opacity)
- Navbar: max `blur(10px)` on fixed elements (higher blur causes scroll jank)
- Follow Apple HIG materials pattern (blur + specular highlight + rim lighting)

### Animations
- CSS transitions + IntersectionObserver for entrance animations (compositor thread, no jank)
- GSAP only for scrub/parallax effects (no entrance animations, no per-frame callbacks)
- Always check `prefers-reduced-motion` before animating
- Framer Motion for interactive UI (hover, tap)
- Lenis for smooth scroll (`syncTouch: false`, `autoRaf: false`)
- Max ~3 simultaneous CSS transitions per entrance (avoid stagger on 10+ elements)

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

## Images — MANDATORY processing

Every image added to the project MUST be processed before use:

### Format & Compression
- **All images must be `.webp`** — convert from jpg/png/etc using `sharp`
- **Max width**: 800px for card/thumbnail images, 1200px for hero/full-width, 1600px for backgrounds
- **Quality**: 72-75 for cards, 78-80 for hero/full-width
- **Target size**: under 150KB per image (cards under 80KB)
- Use `sharp` (dev dependency) with `resize({ width, withoutEnlargement: true }).webp({ quality })`

### File naming
- Format: `maatilayla-[soggetto]-[contesto].webp`
- Lowercase, hyphens, no spaces, no special characters
- Descriptive: `maatilayla-cucciolo-barboncino-toy-rosso-prato.webp`
- Location: `public/content/images/`

### Alt text
- Italian, descriptive, includes "barboncino toy" or "Maatilayla" for SEO
- Describes the subject and context: `"Cucciolo di barboncino toy rosso nel prato dell'allevamento Maatilayla"`
- No "foto di" or "immagine di" prefixes

### HTML attributes
- Always include: `loading="lazy"` + `decoding="async"` (except hero above-the-fold images)
- Hero/above-fold images: `fetchpriority="high"`, no `loading="lazy"`

### Performance rules
- `contain: layout style paint` on card containers with images
- No `transform: scale()` hover on images larger than 100KB
- No `backdrop-filter` above `blur(10px)` on fixed/sticky elements

## Conventions
- No emoji in code or UI text
- Prefer editing existing files over creating new ones
- Use `clamp()` for fluid typography
- Use CSS custom properties from `@theme` — never hardcode colors
- SEO: every page must have `<Helmet>` with Italian title + meta description + Open Graph tags
- Accessibility: all interactive elements must have visible focus styles

### Open Graph (every page)
```tsx
<Helmet>
  <title>Pagina — Maatilayla</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="Pagina — Maatilayla" />
  <meta property="og:description" content="..." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/pagina" />
  <meta property="og:image" content="https://allevamentobarboncinimaatilayla.it/content/images/..." />
  <meta property="og:locale" content="it_IT" />
  <meta property="og:site_name" content="Maatilayla" />
</Helmet>
```

### GSAP + CSS positioning
- Use CSS `translate` property (not `transform: translateY()`) for element positioning
- GSAP's `y`/`scale` properties set inline `transform` — this conflicts with CSS `transform`
- After GSAP animation, use `clearProps: 'transform'` to return control to CSS
```tsx
const tl = gsap.timeline({
  defaults: { ease: 'power3.out' },
  onComplete: () => refs.forEach(r => r.current && gsap.set(r.current, { clearProps: 'transform' })),
})
```

## Browser Support
- Chrome/Edge: 90+
- Safari: 14+
- Firefox: 88+
- Mobile: iOS 14+, Android 10+
- Required features: `backdrop-filter`, `clamp()`, `aspect-ratio`, CSS `translate`

## Commands
- `npm run dev` — development server
- `npm run build` — production build (must pass clean)
- `npm run preview` — preview production build
- `npm run lint` / `npm run lint:fix` — ESLint check/fix
- `npm run format` / `npm run format:check` — Prettier format/check
- `npm run kanban` — Vibe Kanban board
