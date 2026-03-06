# Phase 4: Polish Homepage e Chi Siamo - Research

**Researched:** 2026-03-06
**Domain:** Responsive CSS, animation performance, image optimization, scroll hash navigation
**Confidence:** HIGH

## Summary

This research phase inspected every component and CSS rule for the Homepage (12 sections) and Chi Siamo (11 sections) pages. The investigation focused on five areas: responsive breakpoint gaps (especially tablet 768-1024px), animation performance issues, oversized images violating CLAUDE.md rules, broken hash scroll navigation with Lenis, and layout bugs in specific sections.

The most critical findings are: (1) StrutturaDSection has a broken mobile layout due to missing `display: flex` and no `position: static` override on the absolute-positioned panorama; (2) 10 images exceed the 150KB limit, with 3 images over 400KB and the Chi Siamo hero at 685KB/4454px wide; (3) hash navigation (`#struttura`, `#filosofia`, `#cani-vita`) does not work with Lenis smooth scroll; (4) TimelineSection and WorldMapSection have no tablet breakpoint; (5) the main JS bundle is 531KB triggering Vite's chunk warning.

**Primary recommendation:** Fix the structural CSS bugs first (StrutturaDSection mobile), then compress images, then add tablet breakpoints, then fix hash scroll with Lenis.

## Issue Catalog

### CRITICAL: StrutturaDSection Mobile Layout Broken

**File:** `src/index.css` lines 5668-5877, `src/components/sections/StrutturaDSection.tsx`
**Severity:** CRITICAL
**Confidence:** HIGH

The `.st-block` container uses `position: relative` with `.st-left` at `width: 61%` and `.st-panorama` at `position: absolute; top: 0; right: 0; bottom: 0; width: 38%`. On mobile (`@media max-width: 768px`), the CSS sets `flex-direction: column` on `.st-block` but:

1. `.st-block` never has `display: flex` — `flex-direction` is ignored
2. `.st-panorama` is still `position: absolute` — no override to `static` or `relative`
3. `.st-left` is still `width: 61%` — no override to `100%`

**Result:** On mobile, the panorama image overlaps the text content or is invisible. The layout does not stack vertically as intended.

**Fix required:**
```css
@media (max-width: 768px) {
  .st-block {
    display: flex;
    flex-direction: column;
  }
  .st-left {
    width: 100%;
  }
  .st-panorama {
    position: relative;
    width: 100%;
  }
}
```

### CRITICAL: Hash Scroll Navigation Broken with Lenis

**File:** `src/lib/lenis.ts`, `src/pages/ChiSiamo.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/StoriaLaylaSection.tsx`
**Severity:** CRITICAL
**Confidence:** HIGH

Three hash links exist on the Chi Siamo page:
- Hero CTA "Struttura" links to `#struttura`
- Hero CTA "Filosofia" links to `#filosofia`
- StoriaLaylaSection callout links to `#cani-vita`

Problems:
1. Lenis smooth scroll takes over the scroll mechanism but has no anchor/hash handling configured
2. The `HeroSection` renders hash links as plain `<a href="#struttura">` — native browser hash scroll is intercepted by Lenis
3. `ScrollToTop` in `App.tsx` watches `pathname` changes only, not hash changes — clicking these links on the same page does not trigger any scroll
4. Lenis's `scrollTo()` method supports CSS selectors (`lenis.scrollTo('#struttura')`) but is never used

**Fix required:** Intercept hash link clicks and use `lenis.scrollTo(target, { offset })` instead of relying on native hash behavior. Add an offset for the fixed navbar height.

### HIGH: 10 Images Exceed Size/Dimension Limits

**File:** `public/content/images/`
**Severity:** HIGH
**Confidence:** HIGH

CLAUDE.md mandates: max 1600px backgrounds, max 1200px hero, max 800px cards, under 150KB per image.

| Image | Dimensions | Size | Used In | Violation |
|-------|-----------|------|---------|-----------|
| `maatilayla-header-chi-siamo.webp` | 4454x2969 | 685KB | ChiSiamo Hero | 4454px >> 1600px max, 685KB >> 150KB |
| `maatilayla-barboncino-toy-gioioso-primo-piano.webp` | 2969x4454 | 661KB | UNUSED | Should delete or resize |
| `maatilayla-barboncino-toy-ritratto-fulvo.webp` | 2969x4454 | 446KB | UNUSED | Should delete or resize |
| `maatilayla-header-cucciolo-allevamento-05.webp` | 2173x1443 | 395KB | UNUSED | Should delete or resize |
| `maatilayla-barboncino-toy-rosso-dinamico.webp` | 2969x4454 | 337KB | BentoSection | 2969px >> 800px card max |
| `maatilayla-header-cucciolo-allevamento.webp` | 3072x1504 | 202KB | Home Hero | 3072px >> 1600px max |
| `maatilayla-ginny-barboncino-toy-faq-cta.webp` | 1600x893 | 191KB | FaqCtaSection | 191KB > 150KB |
| `maatilayla-header-cucciolo-allevamento-02.webp` | ? | 176KB | Not checked | 176KB > 150KB |
| `maatilayla-cucciolo-barboncino-toy-allevamento-cessione.webp` | 1400x930 | 152KB | AllevamentoSection | 152KB ~ 150KB |
| `maatilayla-cta-galleria-background.webp` | ? | 150KB | FaqCtaSection home | Borderline |

**Impact:** Large images cause decode jank during scroll (documented in MEMORY.md "Lezioni performance scroll"). The Chi Siamo hero at 685KB is especially bad for LCP.

**Fix required:** Run `sharp` resize + compress on all oversized images per CLAUDE.md rules.

### HIGH: No Tablet Breakpoint in Multiple Chi Siamo Sections

**Severity:** HIGH
**Confidence:** HIGH

Sections with NO tablet (768-1024px) media query:

| Section | CSS Prefix | Problem at 768-1024px |
|---------|-----------|----------------------|
| StrutturaDSection | `st-` | `.st-left` at 61% width, `.st-panorama` absolute 38% — cramped on tablet |
| TimelineSection | `tl-` | Cards at `clamp(220px, 24vw, 280px)` width — 5 cards overflow, truncated text |
| WorldMapSection | `wm-` | Map SVG squeezed, pills wrap awkwardly |
| StoriaLaylaSection | `ls-` | Grid `1fr 1fr` — image and text columns too narrow at 768px |
| ChiSiamoCta | `cs-` | No tablet-specific adjustments |

Sections WITH proper tablet breakpoints (for reference):
- CaniVitaSection: `repeat(2, 1fr)` on tablet
- CredenzialiSection: `repeat(3, 1fr)` on tablet (same as desktop)
- ValoriSection: `repeat(3, 1fr)` on tablet
- BentoSection: Has explicit tablet grid layout
- Homepage sections: Most have tablet queries from Phase 3 polish

### MEDIUM: ChiSiamo JS Bundle Size (246KB)

**File:** Build output `dist/assets/ChiSiamo-BT3Jknay.js` — 246KB (86KB gzip)
**Severity:** MEDIUM
**Confidence:** HIGH

The ChiSiamo chunk includes the entire GeoJSON `countries-110m.json` dataset (imported directly in `WorldMapSection.tsx` line 3) plus `@vnedyalk0v/react19-simple-maps`. The GeoJSON is embedded in the JS bundle rather than loaded lazily.

**Fix option:** Lazy-import WorldMapSection with `React.lazy()` to split it from the main ChiSiamo chunk, or load GeoJSON via dynamic `import()`.

### MEDIUM: Main Bundle 531KB Warning

**File:** `vite.config.ts`, build output `dist/assets/index-BHpAfGMS.js` — 531KB
**Severity:** MEDIUM
**Confidence:** HIGH

The main bundle exceeds Vite's 500KB warning. This includes all homepage section components (12 sections imported eagerly in `Home.tsx`). Current `manualChunks` only splits `vendor` and `gsap`.

**Fix options:**
1. Add `swiper` to manualChunks (BentoSection, BlogPreviewSection import it)
2. Consider lazy-loading below-fold sections
3. Split `lenis`, `react-hook-form`, `zod` into separate chunks

### MEDIUM: External CDN Dependency in WorldMapSection

**File:** `src/components/sections/WorldMapSection.tsx` line 158
**Severity:** MEDIUM
**Confidence:** HIGH

Country flag SVGs are loaded from `https://hatscripts.github.io/circle-flags/flags/${c.code}.svg` — an external GitHub Pages CDN. If this service goes down, the pills show broken images. The GeoJSON was already downloaded locally (in `public/content/data/`) to avoid CDN dependency, but flags were not.

**Fix:** Download the 9 flag SVGs locally to `public/content/images/flags/` or use a self-hosted copy.

### MEDIUM: CaniVitaSection Animation Performance

**File:** `src/index.css` lines 5069-5104
**Severity:** MEDIUM
**Confidence:** MEDIUM

The CaniVitaSection card entrance uses `transform: perspective(400px) rotateX(-45deg)` on 6 cards with stagger (`--cv-i * 0.1s`). While perspective transforms use the compositor, 6 simultaneous 3D transforms with perspective recalculation could cause frame drops on low-end devices. CLAUDE.md says "max ~3 simultaneous CSS transitions per entrance."

The grid observer has `threshold: 0.5` — all 6 cards animate at once when 50% of the grid is visible, potentially violating the 3-transition limit.

### LOW: Timeline Horizontal Scroll UX on Tablet

**File:** `src/index.css` lines 5939-5077, `src/components/sections/TimelineSection.tsx`
**Severity:** LOW
**Confidence:** MEDIUM

The timeline uses horizontal scroll with `overflow-x: auto` and hidden scrollbar. On tablet (768-1024px), all 5 cards at `clamp(220px, 24vw, 280px)` width total ~1200px, which may fit within the viewport without scrolling — but the "above/below" alternating card layout requires the full 340px track height. The descriptions may be truncated or overflow their containers on tablet.

The GSAP scrub animation (`start: 'top 65%', end: 'bottom 55%'`) controls item reveal, but items might already be in view at page load on shorter viewports, causing them to appear without animation.

### LOW: Duplicate CSS Rule for .tl-container

**File:** `src/index.css` lines 5889 and 5053
**Severity:** LOW
**Confidence:** HIGH

`.tl-container` is defined twice:
- Line 5889: layout properties (max-width, margin, flex)
- Line 5053: animation properties (opacity, translate, transition)

While CSS cascade handles this correctly (later rules win for conflicts), it's confusing and could lead to maintenance issues.

### LOW: ChiSiamoCta backdrop-filter blur(16px)

**File:** `src/index.css` line 6334
**Severity:** LOW
**Confidence:** MEDIUM

The `.cs-section::after` uses `backdrop-filter: blur(16px)`. While this element is NOT fixed/sticky (so the CLAUDE.md blur(10px) limit technically only applies to fixed elements like navbar), high blur values during scroll can still cause performance issues. Since this section is far down the page and only visible briefly during scroll, the impact is likely minimal.

## Architecture Patterns

### Responsive Breakpoint Strategy (Current)

The project uses three breakpoints per CLAUDE.md:
- Mobile: `< 768px`
- Tablet: `768px - 1024px` (inconsistently applied)
- Desktop: `>= 1024px`
- Widescreen: `>= 1440px`

**Pattern:** Mobile-first with `max-width: 768px` for mobile overrides and `min-width: 768px` or `min-width: 1024px` for upward changes. Some sections use `min-width: 769px and max-width: 1024px` for tablet-specific rules.

**Gap:** The tablet breakpoint is missing from most Chi Siamo sections (StrutturaDSection, TimelineSection, WorldMapSection, StoriaLaylaSection, ChiSiamoCta).

### Animation Entry Pattern (Current)

Two patterns coexist:
1. **CSS IntersectionObserver:** `observer.observe(el)` -> toggle `.xxx-entered` class -> CSS transitions. Used by most Chi Siamo sections.
2. **GSAP ScrollTrigger:** Used for BentoSection entrance, TimelineSection scrub, parallax effects.

Both are valid per CLAUDE.md. The CSS pattern is preferred for simple entrances, GSAP for scrub/parallax.

### Image Processing Pipeline

Per CLAUDE.md and MEMORY.md, all images must be processed with `sharp`:
```bash
node -e "
const sharp = require('sharp');
sharp('input.jpg')
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 78 })
  .toFile('output.webp');
"
```

Target dimensions:
- Hero/background: max 1600px wide, quality 78-80
- Card images: max 800px wide, quality 72-75
- Target: under 150KB (cards under 80KB)

## Common Pitfalls

### Pitfall 1: Lenis Intercepting Native Hash Scroll
**What goes wrong:** Hash links (`<a href="#section">`) don't scroll to target
**Why it happens:** Lenis takes over scroll behavior but doesn't handle anchor navigation
**How to avoid:** Use `lenis.scrollTo('#target', { offset: -navbarHeight })` on click
**Warning signs:** Clicking CTA in hero does nothing

### Pitfall 2: Absolute Positioning Without Mobile Override
**What goes wrong:** Elements positioned absolutely on desktop overlap content on mobile
**Why it happens:** Mobile breakpoint changes flex-direction but forgets to change position
**Warning signs:** Content hidden behind other elements, unexpected overlaps

### Pitfall 3: Oversized Images Causing Scroll Jank
**What goes wrong:** Frame drops during scroll when large images decode
**Why it happens:** Images > 200KB cause decode jank (documented in MEMORY.md)
**How to avoid:** Process all images with sharp before committing

### Pitfall 4: Missing Tablet Breakpoint
**What goes wrong:** Layouts designed for desktop (1024px+) look cramped at 768-1024px
**Why it happens:** Developer tests on desktop and mobile but skips tablet
**Warning signs:** Text overflow, overlapping elements, awkward spacing at 768-1024px

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll to hash | Custom scroll handler | `lenis.scrollTo('#id', { offset })` | Lenis already manages scroll |
| Image optimization | Manual resize per image | `sharp` script batch processing | Consistent quality, repeatable |
| Flag icons | Download individual SVGs manually | Use a local copy of circle-flags subset | 9 SVGs only, no CDN dependency |

## Prioritized Fix List

### Wave 1: Critical Fixes
1. **StrutturaDSection mobile layout** — add `display: flex`, `position: relative`, `width: 100%` overrides
2. **Hash scroll navigation** — implement Lenis `scrollTo` for `#struttura`, `#filosofia`, `#cani-vita`
3. **Image optimization** — resize and compress all 10 oversized images

### Wave 2: Tablet Responsive
4. **StrutturaDSection tablet** — adjust column widths for 768-1024px
5. **TimelineSection tablet** — adjust card widths or switch to vertical layout
6. **WorldMapSection tablet** — ensure map is readable, pills don't overflow
7. **StoriaLaylaSection tablet** — adjust grid gap and image aspect ratio

### Wave 3: Performance & Polish
8. **ChiSiamo bundle splitting** — lazy-load WorldMapSection
9. **Main bundle optimization** — split swiper/lenis into manual chunks
10. **Download flag SVGs locally** — remove hatscripts CDN dependency
11. **CaniVitaSection animation** — reduce simultaneous transforms or add progressive reveal

## Sources

### Primary (HIGH confidence)
- Direct code inspection of all 21 section components in `src/components/sections/`
- Direct CSS inspection of `src/index.css` (6468 lines)
- `npm run build` output analysis
- `sharp` metadata for image dimensions
- `CLAUDE.md` project rules and conventions

### Secondary (MEDIUM confidence)
- MEMORY.md performance lessons and section documentation
- ROADMAP.md phase 3 polish audit results

## Metadata

**Confidence breakdown:**
- Layout bugs (StrutturaDSection): HIGH - confirmed by CSS inspection, missing properties
- Image sizes: HIGH - confirmed by filesystem and sharp metadata
- Hash scroll: HIGH - confirmed by code inspection, no Lenis anchor handling exists
- Tablet breakpoints: HIGH - confirmed by grep, missing media queries
- Animation performance: MEDIUM - based on CLAUDE.md rules, not runtime profiling
- Bundle size: HIGH - confirmed by build output

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable codebase, no external API changes expected)
