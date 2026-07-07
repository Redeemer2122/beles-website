# BELES Engineering Playbook v1.1 — Hybrid Art Asset System

> Purpose: Define a safe, reusable workflow for matching visually complex references without turning the website into hardcoded layouts or fragile decorative code.

---

## 1. What This System Is

The Hybrid Art Asset System separates a section into two layers:

1. **Live interface layer** — semantic HTML, content, CTAs, links, proof points, layout, i18n, accessibility, SEO.
2. **Art-directed visual layer** — complex renders, glass objects, lighting, blur, embossing, diagonal panels, atmospheric depth, and other details that are expensive or brittle to reproduce with pure CSS.

This is not a shortcut for building a whole section as an image.

The rule is:

```text
content and interaction stay in code
complex visual art can become a managed asset
```

For the BELES National OEM section, this means the headline, body text, CTA, proof rail, layout, and responsive structure remain HTML/CSS. The right-side glass 3D composition can become a controlled asset package.

---

## 2. Why BELES Needs It

Some reference visuals behave more like rendered product art than normal UI:

- glass surfaces;
- soft blur;
- light ribs;
- translucent diagonal panels;
- shadows and reflections;
- embossed or refracted logos;
- depth that depends on subtle opacity and material effects.

Pure CSS can imitate these, but matching a reference closely may require many decorative elements, filters, blend modes, pseudo-elements, and viewport-specific tweaks. That can become harder to maintain than a well-managed asset.

The hybrid approach keeps the website modular while allowing high visual fidelity.

---

## 3. What It Is Not

Do not use this system to:

- export the whole section as a flat screenshot;
- place real text inside images;
- position HTML text with random absolute values over a background;
- hide semantic content behind decorative art;
- solve normal layout problems with image hacks;
- avoid responsive design;
- avoid accessibility or performance work.

If removing the art asset makes the section unreadable or unusable, the implementation is wrong.

---

## 4. Core Architecture

Recommended structure:

```text
src/
  components/
    sections/
      NationalOEMSection.astro
public/
  assets/
    national-oem/
      visual-desktop.avif
      visual-desktop.webp
      visual-mobile.webp
      visual-fallback.png
      manifest.json
tests/
  visual/
    national-oem.spec.mjs
    national-oem-responsive.spec.mjs
```

The component owns the section.  
The asset folder owns only the art layer.  
The tests own visual verification.

---

## 5. Asset Package Contract

Each complex visual should be treated as a small package, not a loose image.

Minimum files:

```text
visual-desktop.avif
visual-desktop.webp
visual-fallback.png
manifest.json
```

Optional files:

```text
visual-tablet.webp
visual-mobile.webp
visual-reference.png
visual-mask.png
visual-notes.md
```

Recommended `manifest.json` shape:

```json
{
  "name": "national-oem-visual",
  "sourceReference": "National OEM reference frame",
  "referenceViewport": {
    "width": 1672,
    "height": 941
  },
  "artboard": {
    "width": 980,
    "height": 760
  },
  "safeArea": {
    "x": 80,
    "y": 60,
    "width": 840,
    "height": 640
  },
  "anchors": {
    "desktop": {
      "right": "clamp(-40px, -2vw, 20px)",
      "top": "clamp(40px, 7vw, 92px)",
      "width": "min(58vw, 920px)"
    },
    "mobile": {
      "width": "min(112vw, 520px)",
      "position": "below-copy"
    }
  },
  "notes": [
    "Decorative art only. Do not place readable text in this asset.",
    "Live HTML content must remain accessible if this asset fails to load."
  ]
}
```

The manifest documents intent. It prevents future developers from guessing why an asset is sized or cropped a certain way.

---

## 6. Component Usage Pattern

Use `<picture>` for the art layer:

```astro
<picture class="national-visual__art" aria-hidden="true">
  <source srcset="/assets/national-oem/visual-desktop.avif" type="image/avif" />
  <source srcset="/assets/national-oem/visual-desktop.webp" type="image/webp" />
  <img
    src="/assets/national-oem/visual-fallback.png"
    alt=""
    width="980"
    height="760"
    loading="eager"
    decoding="async"
  />
</picture>
```

Rules:

- use empty `alt` for purely decorative art;
- do not put product claims, proof, or body copy inside the image;
- use explicit `width` and `height` to reduce layout shift;
- use `loading="eager"` only for first-viewport hero art;
- use `loading="lazy"` for lower-page art;
- keep the semantic content outside the art layer.

---

## 7. CSS Control Layer

The CSS should control composition through named variables:

```css
.national-visual {
  --art-width: min(58vw, 920px);
  --art-top: clamp(40px, 7vw, 92px);
  --art-right: clamp(-40px, -2vw, 20px);

  position: relative;
}

.national-visual__art {
  position: absolute;
  top: var(--art-top);
  right: var(--art-right);
  width: var(--art-width);
  aspect-ratio: 980 / 760;
  pointer-events: none;
}

.national-visual__art img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

Avoid scattering magic numbers across multiple selectors. If a value matters for art direction, name it.

---

## 8. Responsive Strategy

Use three responsive modes:

1. **Desktop**
   Full art asset, positioned to match the reference.

2. **Tablet**
   Same asset with adjusted width, opacity, and position. Keep it decorative and non-blocking.

3. **Mobile**
   Use one of these:
   - a mobile-specific crop;
   - a simplified asset;
   - a reduced-opacity decorative block below the CTA;
   - hide the art if it competes with content.

Mobile should be designed intentionally. It should not be a crushed desktop render.

---

## 9. Anti-Hardcoding Rules

This system stays healthy only if these rules are followed.

### 9.1 Allowed

- CSS variables for visual placement.
- Named breakpoint rules.
- Fixed intrinsic image dimensions.
- Asset manifests documenting reference size and anchors.
- Section-specific art packages.
- Screenshot-based visual checks.

### 9.2 Not Allowed

- Whole-section screenshot backgrounds.
- Real text inside decorative images.
- Random absolute positioning for content.
- One-off pixel nudges without a named variable.
- Hidden dependencies between unrelated sections.
- Global CSS overrides for one art asset.
- Asset paths duplicated across many files.

### 9.3 Safety Test

Temporarily remove the art asset.

The section should still:

- show the headline;
- show the body copy;
- show CTA links;
- keep correct spacing;
- avoid horizontal overflow;
- remain readable on mobile.

If this fails, the art layer has taken over the interface layer and must be refactored.

---

## 10. Tools And Mechanisms

Use the smallest tool that solves the current problem.

### 10.1 Image Formats

Use:

- AVIF for best compression where supported;
- WebP as the primary fallback;
- PNG only as a final fallback or source reference;
- SVG only for vector-clean graphics, masks, or simple layered shapes.

### 10.2 Optimization

Before shipping:

- compress large art files;
- keep desktop hero art sized near its rendered dimensions;
- avoid shipping huge source PNGs to production;
- keep reference/source files out of the critical runtime path.

### 10.3 Visual QA

Use Playwright screenshots for:

- desktop reference comparison;
- mobile overflow checks;
- first-viewport composition;
- smoke checks after CSS edits.

Use `pixelmatch`, BackstopJS, Percy, or similar tools later if the project needs a formal approval workflow.

Current BELES baseline:

```bash
npm run visual:oem
npm run visual:oem:responsive
```

Standard verification before handoff:

```bash
npm run format:check
npm run lint
npm run build
```

---

## 11. Workflow For Creating A New Hybrid Asset

1. **Classify the visual**
   Confirm that the target is genuinely art-directed and difficult to maintain as CSS.

2. **Choose the live/content boundary**
   Decide what remains HTML and what becomes decorative art.

3. **Create the asset package**
   Export desktop and fallback formats. Add a manifest.

4. **Integrate with `<picture>`**
   Use correct dimensions, empty alt for decorative art, and responsive sources where useful.

5. **Control placement through variables**
   Add named CSS variables for width, position, opacity, and crop behavior.

6. **Design mobile intentionally**
   Use a mobile crop, simplified asset, or hide the art if needed.

7. **Run visual QA**
   Capture screenshots and check for overflow, clipping, overlap, and blank assets.

8. **Document decisions**
   Update the manifest or nearby docs when changing the crop, anchor, or responsive behavior.

---

## 12. When To Use Pure CSS Instead

Use pure CSS when the visual is:

- simple;
- geometric;
- token-driven;
- repeated across many components;
- interactive in a way that requires live DOM;
- easy to express with gradients, borders, masks, or transforms.

Examples:

- button states;
- cards;
- section backgrounds;
- simple panels;
- grids;
- reusable glow accents;
- technical lines and dividers.

Do not create a bitmap asset for ordinary UI.

---

## 13. When To Use SVG

Use SVG when the visual needs:

- crisp scaling;
- editable vector paths;
- masks;
- simple gradients;
- icons;
- line art;
- diagrams;
- small file size with clean geometry.

Do not force SVG for painterly lighting, realistic blur, or glass material if a compressed bitmap is more accurate and simpler.

---

## 14. When To Use Canvas Or WebGL

Use Canvas, Three.js, or WebGL only when the visual must be:

- interactive;
- animated in 3D;
- generated from data;
- responsive to pointer movement;
- materially different from a static render.

Do not add a rendering engine for a static hero plate.

For BELES, a static or lightly layered image is safer for the National OEM plate unless future requirements call for real interaction.

---

## 15. Performance Rules

The art layer must not make the site feel heavy.

Rules:

- keep first-viewport art optimized;
- use explicit image dimensions;
- avoid unnecessary JavaScript;
- prefer CSS transforms and opacity for any motion;
- avoid animating expensive filters;
- test mobile network and viewport behavior;
- do not load desktop-only art on mobile if a smaller version exists.

The visual layer should improve perceived quality without harming page speed.

---

## 16. Accessibility Rules

Decorative art should use:

```html
alt="" aria-hidden="true"
```

Important content must remain in HTML:

- company name;
- claims;
- metrics;
- buttons;
- links;
- headings;
- proof points.

Never rely on an image for content that a screen reader, search engine, translator, or CMS must understand.

---

## 17. Maintenance Rules

When changing an art asset:

- update the asset package, not unrelated component code;
- update `manifest.json` if dimensions, crop, or anchors change;
- run responsive screenshot checks;
- check mobile separately;
- remove unused old asset variants;
- keep naming stable and predictable.

Good asset names:

```text
visual-desktop.avif
visual-desktop.webp
visual-mobile.webp
visual-fallback.png
```

Bad asset names:

```text
new-final-2.png
glass-thing-latest.webp
copy-of-copy-render.png
```

---

## 18. Portability To Other Projects

This system can be reused beyond BELES.

It is useful for:

- product websites;
- automotive and industrial websites;
- architecture and real estate pages;
- premium landing pages;
- cinematic hero sections;
- event pages;
- campaigns with strong art direction.

To reuse it, rename the concept from BELES-specific to project-specific:

```text
Hybrid Art Asset System
  asset package
  live interface layer
  art visual layer
  manifest
  CSS control variables
  responsive variants
  visual QA
```

Keep the same boundary:

```text
semantic content in code
complex decorative art as assets
```

This makes the workflow portable without copying BELES styling into other brands.

---

## 19. Decision Matrix

| Need                                            | Best Approach                                |
| ----------------------------------------------- | -------------------------------------------- |
| Text, CTA, proof, SEO, i18n                     | Live HTML/CSS                                |
| Simple panels, cards, layout                    | CSS                                          |
| Icons, diagrams, line art                       | SVG                                          |
| Realistic glass, light, material, render detail | Bitmap asset                                 |
| Interactive 3D object                           | Three.js/WebGL                               |
| Data-driven visual                              | SVG, Canvas, or HTML depending on complexity |
| Reference-matching QA                           | Playwright screenshots and image diff        |

---

## 20. Definition Of Done

A hybrid art asset implementation is done when:

- the live content remains semantic and accessible;
- the asset is isolated in a predictable folder;
- the component has no random visual magic numbers;
- desktop matches the approved reference closely enough;
- mobile is intentionally designed;
- no horizontal overflow exists;
- the page still works if the asset fails;
- asset dimensions are explicit;
- visual screenshots have been generated;
- lint, format check, and build pass.

---

## 21. Final Rule

The art asset supports the section. It does not become the section.

If the art layer makes the code simpler, more stable, and closer to the approved direction, use it.  
If it hides content, breaks responsive behavior, or creates one-off positioning chaos, do not use it.
