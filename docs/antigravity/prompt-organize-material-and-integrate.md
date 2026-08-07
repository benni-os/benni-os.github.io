# Antigravity — Asset Organization and Ecosystem Integration Protocol

Workspace local: `C:\Users\T-GAMER\Documents\Projects\benni-os.github.io`
Input assets: `material/`
Repository: `https://github.com/benni-os/benni-os.github.io`

## Mission

Organize every video, image, poster, 3D model, logo, code file and document in `material/`, rename files professionally, integrate them into the Benni OS Ecosystem Atlas, validate locally and prepare a safe commit. Do not publish until build, tests, visual checks and secret scanning pass.

## Safety first

1. Run `git status --short` and confirm the repository and branch.
2. Create `material/_inventory/asset-inventory.json` before moving anything.
3. Record original path, filename, extension, MIME, bytes, dimensions, duration, codec and SHA-256.
4. Never commit `.env`, secrets, tokens, private keys, credentials, dumps or files containing API keys.
5. Preserve originals under `material/_source/`; never delete the source files.
6. If a name collision exists, stop and place the file in `material/_review/`.

## Naming rules

Use lowercase kebab-case, no spaces, accents or generic names.

Videos:
- `benni-ecosystem-hero-desktop.webm`
- `benni-ecosystem-hero-desktop.mp4`
- `benni-ecosystem-hero-mobile.mp4`
- `benni-intent-to-evidence.webm`
- `benni-ecosystem-atlas-flythrough.webm`
- `benni-agent-mesh-activation.webm`
- `benni-evidence-return.webm`

Posters:
- `benni-ecosystem-hero-poster.webp`
- `benni-ecosystem-atlas-poster.webp`
- `benni-intent-to-evidence-poster.webp`
- `benni-agent-mesh-poster.webp`
- `benni-evidence-return-poster.webp`

Images:
- `benni-ecosystem-core.webp`
- `benni-ecosystem-atlas.webp`
- `benni-command-plane.webp`
- `benni-memory-fabric.webp`
- `benni-agent-mesh.webp`
- `benni-evidence-layer.webp`
- `benni-open-source-constellation.webp`
- `benni-mobile-hero.webp`

Models:
- `benni-ecosystem-atlas.glb`
- `benni-command-plane.glb`
- `benni-agent-mesh.glb`

## Destination folders

- hero videos → `public/motion/hero/`
- motion sequences → `public/motion/sequences/`
- posters → `public/posters/`
- GLB models → `public/models/`
- ecosystem visuals → `public/images/ecosystem/`
- project visuals → `public/images/projects/`
- system visuals → `public/images/systems/`
- logos → `public/logos/`
- manifests → `public/data/`

Copy with hash verification and preserve the source masters outside production assets. Optimize web images to WebP/AVIF where safe, produce video WebM/MP4 variants, posters and a mobile fallback. Do not block first paint with heavy assets.

## Required manifests

Create:

- `public/data/asset-inventory.json`
- `public/data/motion-manifest.json`
- `public/data/ecosystem-projects.json`
- `public/data/asset-credits.json`

Only use real repository metadata. Mark private projects as `private`; never present them as open source. Do not invent stars, uptime, users, latency or status.

## Frontend integration

Audit whether the public page is served by root `index.html`, Next export or both. The public artifact must be updated, not only `app/page.tsx`.

Implement:

1. cinematic hero with video, poster and mobile fallback;
2. Ecosystem Atlas with GLB when available and accessible 2D fallback;
3. scroll story: `Intent → Plan → Agents → Execution → Evidence`;
4. project cards driven by `ecosystem-projects.json`;
5. real relationships between Intelligence, Control, Execution, Developer Infrastructure and Community;
6. keyboard navigation, visible focus, ARIA labels and `prefers-reduced-motion`;
7. lazy loading for non-critical videos, models and images;
8. no text or fake logos rendered inside generated images or videos.

## Validation

Run:

```powershell
npm install
npm run build
npm test
npm run lint
git diff --check
git status --short
```

Start a local preview and check desktop 1440px, tablet 1024px, mobile 390px and reduced motion. Verify hero, video fallback, GLB fallback, links, console errors, accessibility and asset loading. Capture screenshots or equivalent evidence.

## Git and NEMESIS

Work first on `feat/ecosystem-atlas-motion`. Before commit, show the diff and scan for secrets. Create one canonical payload containing owner, repo, path, branch, current SHA, message and full content. Register approval in NEMESIS and execute with the exact same payload; never trim, reformat, compact or rewrite content between approval and execution. Never force-push.

Suggested commit:

```text
feat: ship cinematic ecosystem atlas and asset system
```

## Final report

Return:

- total assets and categories;
- original filename → final filename → destination;
- conflicts and files sent to review;
- ignored secrets;
- before/after sizes;
- build, test, lint and visual results;
- branch, commit SHA and payload hash;
- preview URL;
- remaining risks.

If the result looks like a generic portfolio or a static gallery, reject it and improve it before requesting publication.