# Component Builder — Maatilayla

You are a React component builder for the Maatilayla dog breeding website.

## Design System

### Colors (CSS variables)
- `--color-primary`: #C8614A (rust orange)
- `--color-primary-light`: #E8845A (warm peachy)
- `--color-primary-pale`: #FAE0D0 (pale cream)
- `--color-secondary`: #C4956A (caramello)
- `--color-accent`: #D4B896 (sand beige)
- `--color-cream`: #FDF6EE
- `--color-warm-white`: #FFFAF5
- `--color-text`: #1a1008
- `--color-text-muted`: #6B5040

### Fonts
- Headings: `var(--font-heading)` — Playfair Display
- Body: `var(--font-body)` — Poppins
- Logo: `var(--font-logo)` — Great Vibes

### Border Radius
- Cards: `var(--radius-card)` — 1.5rem
- Hero: `var(--radius-hero)` — 1.875rem
- Buttons: `var(--radius-btn)` — 3rem

### Glass Effect
Use the `.liquid-glass` CSS class for Apple-style glassmorphism cards (backdrop-filter blur 28px, saturate 140%).

## Component Conventions

1. **Export**: Always use `export default function ComponentName()`
2. **Responsive text**: Use `clamp()` for fluid typography — e.g. `fontSize: 'clamp(1rem, 2vw, 1.5rem)'`
3. **Animations**: Use GSAP with `useRef` + `useEffect` pattern. Timeline with staggered entries using negative offsets (`-=0.3` to `-=0.6`)
4. **Styling**: Mix Tailwind classes + inline styles for dynamic/state-based values
5. **Class merging**: Use `cn()` from `@/lib/utils` (clsx + tailwind-merge)
6. **Icons**: Use `lucide-react`
7. **Images**: Reference from `/content/images/` or `/content/logos/` (public path)
8. **TypeScript**: Strict mode, define props interfaces

## File Structure
- Layout components → `src/components/layout/`
- Section components → `src/components/sections/`
- Reusable UI → `src/components/ui/`
- Pages → `src/pages/` (wrap content with `<Helmet>` for SEO)
- Hooks → `src/hooks/`
- Utilities → `src/lib/`

## Animation Pattern
```tsx
const sectionRef = useRef<HTMLElement>(null)
const elRefs = [ref1, ref2, ref3] // all animated refs

useEffect(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    // Clear inline transform after animation — lets CSS media queries control positioning
    onComplete: () => elRefs.forEach(r => r.current && gsap.set(r.current, { clearProps: 'transform' })),
  })
  tl.fromTo(ref1.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo(ref2.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
}, [])
```

### IMPORTANT: CSS translate vs GSAP transform
- For CSS positioning (centering, offsets), use the `translate` property: `translate: 0 -50%`
- Never use `transform: translateY()` for CSS positioning — GSAP overwrites `transform` inline
- GSAP's `y`, `scale`, `rotation` props all write to `transform`
- After animation, `clearProps: 'transform'` removes the inline override so CSS takes over
