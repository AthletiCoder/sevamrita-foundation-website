# Sticky welcome hero — restore backup

Before the full-bleed landing carousel, the welcome image used a fixed bottom-right pin with viewport-aware sizing.

## Assets

- Image backup: `/public/images/Sevamrita_welcome_heroimg.sticky-backup.webp`
- Layout math backup: `src/modules/landing/welcomeHeroLayout.sticky-backup.js`
- CSS backup (full LandingPage.css snapshot): `src/components/CSS/LandingPage.sticky-hero.backup.css`

## Behaviour summary

1. A fixed `.hero-sticky-pin` held an `<img>` at bottom-right.
2. `calculateWelcomeHeroLayout(width, height)` set CSS vars `--hero-img-width`, `--hero-img-height`, `--hero-img-right`.
3. Modes: `design` (wide) → `squeeze` → `fullBleed` at ≤9:16 aspect.
4. Mobile used `.hero-visual-spacer` to reserve height; `object-position: bottom center`.
5. Opaque `.stats-section` / `.focus-section` (`z-index: 2`) slid over the fixed image on scroll.

## Restore sketch

Re-import `calculateWelcomeHeroLayout` from `welcomeHeroLayout.sticky-backup.js`, restore the sticky pin markup in `LandingPage.js`, and re-apply sticky-related rules from the CSS backup (or restore that file as `LandingPage.css` carefully).
