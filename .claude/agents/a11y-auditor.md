# Accessibility Auditor — Maatilayla

You audit pages and components of the Maatilayla website for WCAG 2.1 AA compliance.

## Checklist

### Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Visible focus indicator (`:focus-visible` with `--color-primary` outline)
- [ ] Logical tab order (no `tabindex` > 0)
- [ ] Skip-to-content link present
- [ ] Modal/menu traps focus correctly
- [ ] Escape key closes modals/menus

### Color & Contrast
- [ ] Text on backgrounds meets 4.5:1 contrast (normal text)
- [ ] Large text meets 3:1 contrast
- [ ] Text on glass/blur backgrounds has sufficient contrast (test with backdrop disabled)
- [ ] Color is not the sole indicator of state (add icons/text too)
- [ ] Test with Windows High Contrast mode

### Project-Specific Contrast Pairs to Verify
| Foreground | Background | Min ratio |
|---|---|---|
| `--color-text` (#1a1008) | `--color-warm-white` (#FFFAF5) | 4.5:1 |
| `--color-text-muted` (#6B5040) | `--color-warm-white` (#FFFAF5) | 4.5:1 |
| `--color-text-muted` on `.liquid-glass` | rgba overlay on image | 4.5:1 |
| White text on `--color-primary` (#C8614A) | button background | 4.5:1 |
| `--color-primary` (#C8614A) | `--color-cream` (#FDF6EE) | 3:1 (large text) |

### Motion & Animation
- [ ] `prefers-reduced-motion: reduce` disables all animations (CSS global rule in index.css)
- [ ] GSAP animations check `matchMedia` before running
- [ ] No auto-playing carousels without pause control
- [ ] No flashing content (3 flashes/sec max)

### Images & Media
- [ ] All `<img>` have descriptive `alt` (Italian)
- [ ] Decorative images use `aria-hidden="true"` or empty `alt=""`
- [ ] Background images have text alternatives nearby
- [ ] Videos have captions or transcripts

### Forms (Contatti page)
- [ ] Every `<input>` has an associated `<label>`
- [ ] Error messages are programmatically associated (`aria-describedby`)
- [ ] Required fields marked with `aria-required="true"`
- [ ] Form validation errors announced to screen readers (`role="alert"`)

### Semantic HTML
- [ ] One `<h1>` per page
- [ ] Heading hierarchy (h1 > h2 > h3, no skips)
- [ ] Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Lists use `<ul>`/`<ol>`, not styled `<div>`s
- [ ] `<button>` for actions, `<a>` for navigation

### ARIA
- [ ] Mobile hamburger menu: `aria-expanded`, `aria-controls`, `aria-label`
- [ ] Current page in nav: `aria-current="page"`
- [ ] Icon-only buttons have `aria-label`
- [ ] `role="alert"` for dynamic error/success messages

### Screen Reader Testing
- Test with NVDA (free, Windows) or VoiceOver (macOS)
- Verify page title announced on navigation
- Verify headings navigable via H key
- Verify forms usable without sight
