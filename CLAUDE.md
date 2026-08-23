# BENNI OS — SOVEREIGN AUTONOMY FILM

Read this entire file before changing any code.

## WHAT YOU ARE BUILDING

A single-file cinematic scroll website for BENNI·OS.

It is a film controlled by scroll.
It is not a dashboard, a SaaS landing page, a component library,
a technical demo, an AI-template website, or a React application.

Everything must exist in one file: `index.html`.

No React.
No Vite.
No npm.
No package.json.
No build tool.
No canvas.
No Three.js.
No WebGL.
No server-side code.

Serve locally with:

python -m http.server 8080

Deploy as a static site to Vercel.

## PRIMARY GOAL

The official Benni OS website must be stable, fast, legible and deployable.
The hero is one pre-encoded local MP4 scrubbed by scroll.

The visitor must understand this exact idea:

BENNI·OS is the sovereign autonomy system.
It lets organizations remember, reason, govern, and execute.
Benjamin thinks. Adam moves. You decide.

## HARD RULES — NEVER BREAK

1. ONE FILE ONLY: `index.html`.

2. The hero uses exactly one `<video id="source-video">`:
   `benni-os-hero.mp4`.

3. Video scrubbing uses `getBoundingClientRect()`.
   Never use `window.scrollY` by itself.

4. Attach both event listeners:
   ```js
   window.addEventListener("scroll", requestTick, { passive: true });
   lenis.on("scroll", requestTick);
   ```

5. Do not animate the pinned hero container itself.
   Animate only children inside it.

6. Do not use `position: sticky` and `ScrollTrigger pin: true`
   on the same element.

7. Never apply `transform`, `translateZ(0)`, or `will-change`
   to `#source-video`.

8. No Canvas, WebGL, Three.js, R3F, particles, 3D orbs,
   glowing nodes, starfields, generic tech grids, or shader effects.

9. No rounded card grids.
   No icon circles.
   No gradient buttons.
   No global video blend modes.
   No glassmorphism except the Menu overlay.

10. One video maximum may play at any time outside the hero.
    Every card/inside video must use `muted autoplay loop playsinline`
    and pause outside its active section with IntersectionObserver.

11. Do not alter paths, extensions, filenames or media behavior
    without explicitly verifying that file exists.

12. No stock copy. Use the exact copy specified in the build prompt.

13. Do not claim complete until:
    - all media visibly loads;
    - no console errors exist;
    - the hero scrubs correctly;
    - desktop 1440px and mobile 390px work;
    - `ScrollTrigger.refresh()` runs as the last script statement.

## REQUIRED CDN ORDER

```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wdth,wght@75..100,400..700&display=swap" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.3.23/dist/lenis.min.js"></script>
```

## DESIGN TOKENS

```css
:root {
  --obsidian: #09090b;
  --graphite: #17181b;
  --bone: #e8e1d5;
  --smoke: #8c9198;
  --cobalt: #426bff;
  --oxide: #c7683d;
  --gold: #c9a45c;
  --cyan: #39e7d0;
  --ember: #b94a38;

  --display: "DM Serif Display", Georgia, serif;
  --body: "Instrument Sans", Arial, sans-serif;
  --mono: "IBM Plex Mono", monospace;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Typography:
- Display text: DM Serif Display only.
- Body: Instrument Sans only.
- Metadata: IBM Plex Mono only.
- Body font minimum: 16px.
- Metadata font minimum: 12px.
- Do not use Inter.
- Do not put every heading in all caps.

## LENIS SETUP

```js
const lenis = new Lenis({
  lerp: 0.075,
  smoothWheel: true,
  syncTouch: false
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

## HERO SCRUB — EXACT REQUIREMENTS

- `.hero-scroll-track` has height: `700vh`.
- `.hero-sticky` has position: sticky; top: 0; height: 100svh.
- The sticky viewport holds source video, vignette, nav, progress and overlays.
- Source video uses object-fit: cover.
- Hero scrub logic uses only `getBoundingClientRect()`.
- Text overlays must be phase-controlled with the `progress` value.
- Never animate the source video with CSS transforms.

## ALWAYS END SCRIPT WITH

```js
ScrollTrigger.refresh();
```