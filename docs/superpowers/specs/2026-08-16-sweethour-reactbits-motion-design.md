# SweetHour ReactBits Motion Design

## Goal

Give the SweetHour storefront a more expressive visual identity without making ordering, scanning, or mobile use harder.

## Selected Components

1. `SplitText` treatment for the active hero title. Each line enters with a staggered motion when the slide changes.
2. `SpotlightCard` treatment for product cards. Pointer-driven light is enabled only on fine-pointer devices; cards retain their existing static presentation on touch devices.
3. `ShinyText` treatment for the promotion headline. The sheen remains subtle and does not obscure promotional details.

## Constraints

- Preserve current product, cart, search, and slider behavior.
- Keep the existing warm SweetHour palette.
- Avoid WebGL or permanent full-screen motion.
- Respect `prefers-reduced-motion`.
- Verify with lint, production build, desktop/mobile browser checks, and the published GitHub Pages site.

## Testing

- Hero still changes through arrows, dots, auto-play, and drag.
- Product card buttons and favorite controls remain clickable.
- No horizontal overflow at a 390px viewport.
- No browser console errors or Vite error overlay.
