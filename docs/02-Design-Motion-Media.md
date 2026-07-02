# BELES Engineering Playbook v1.0 — Design, Motion & Media

> Purpose: Define the visual language, motion system, and media strategy for the BELES website.  
> This document should guide design decisions before implementation.

---

## 1. Creative Direction

The BELES website should combine three qualities:

1. **Industrial seriousness** — production, engineering, physical scale.
2. **Editorial confidence** — strong typography, whitespace, restrained layouts.
3. **Future mobility energy** — progress, technology, clean movement.

The result should not copy any reference.  
The references are used as strategic inputs, not visual templates.

---

## 2. Reference Translation

### 2.1 Oil Stain Lab

Use as inspiration for:

- cinematic pacing;
- scenes instead of blocks;
- hero object as a visual anchor;
- large type;
- minimal UI;
- strong rhythm between silence and impact.

Do not copy:

- lifestyle tone;
- car-culture attitude;
- excessive theatricality;
- low-accessibility contrast choices.

### 2.2 Rimac / Nevera

Use as inspiration for:

- engineering credibility;
- technical explanation;
- product storytelling;
- high contrast;
- structured information;
- premium product detail.

Do not copy:

- hypercar luxury language;
- overly expensive sports-car feeling;
- too much product worship.

### 2.3 Longbow

Use as inspiration for:

- editorial composition;
- type-led layouts;
- black/white discipline;
- large visual rhythm;
- minimal palette.

Do not copy:

- experimental typography that hurts readability;
- layout complexity without content purpose.

---

## 3. Design Personality

The BELES interface should feel:

- precise;
- serious;
- modern;
- calm;
- cinematic;
- engineered;
- confident.

It should not feel:

- childish;
- flashy;
- decorative;
- startup-generic;
- template-based;
- overloaded.

---

## 4. Visual System

### 4.1 Color direction

The color system should be restrained.  
A good starting direction:

- deep industrial dark;
- clean white / off-white;
- steel gray;
- technical blue or electric accent;
- optional warm industrial accent only if brand material supports it.

Do not choose colors only because they look “cool”.  
Every color must have a role.

### 4.2 Recommended token categories

```css
:root {
  --color-bg-primary: ;
  --color-bg-secondary: ;
  --color-text-primary: ;
  --color-text-secondary: ;
  --color-border-subtle: ;
  --color-accent-primary: ;
  --color-accent-secondary: ;

  --space-section-y: ;
  --space-container-x: ;
  --radius-card: ;
  --radius-large: ;

  --font-display: ;
  --font-body: ;
  --font-mono: ;
}
```

Do not fill these tokens until the visual direction is approved.

### 4.3 Contrast rule

The site should prioritize readability.  
Awwwards-style visuals are not an excuse for low contrast.

Use low contrast only for decorative secondary text, never for important navigation, CTAs, or body content.

---

## 5. Typography Direction

Typography should carry much of the premium feeling.

### 5.1 Display typography

Display type should be:

- large;
- architectural;
- confident;
- readable in English and Cyrillic;
- not overly decorative.

The display system must support:

- English;
- Russian;
- Kyrgyz;
- Chinese fallback.

### 5.2 Body typography

Body text should be highly readable.  
Engineering credibility depends on clean paragraphs, not just huge headlines.

Body type should feel:

- neutral;
- precise;
- modern;
- stable.

### 5.3 Typography rules

- Keep line length controlled.
- Use large headings sparingly.
- Avoid too many font weights.
- Avoid tiny low-contrast captions.
- Use type as composition, not decoration.

---

## 6. Layout Principles

### 6.1 Grid

Use a simple, strong grid:

- centered container;
- generous gutters;
- large vertical rhythm;
- clear alignment;
- flexible editorial compositions.

Avoid:

- too many columns;
- random offsets;
- inconsistent spacing.

### 6.2 Whitespace

Whitespace is not empty.  
It creates seriousness.

Use whitespace to:

- isolate important statements;
- make vehicles feel monumental;
- slow the user down;
- separate proof from emotion.

### 6.3 Cards

Cards should be minimal and content-driven.

Good card contents:

- title;
- short description;
- category;
- key fact;
- optional image;
- clear link.

Avoid decorative glassmorphism unless it serves the industrial identity.

---

## 7. Component Design Principles

Components should be designed as primitives, not one-off decorations.

Recommended component families:

- `SiteHeader`
- `SiteFooter`
- `PageHero`
- `SectionShell`
- `SceneTitle`
- `ProjectCard`
- `CapabilityCard`
- `MediaFrame`
- `KpiRow`
- `CTASection`
- `LanguageSwitcher`

Each component should have a clear responsibility.  
Do not create complex abstractions before real content exists.

---

## 8. Motion Philosophy

Motion should feel engineered, not magical.

### 8.1 Motion qualities

Use motion that feels:

- heavy when revealing industrial scale;
- precise when showing technical content;
- smooth when transitioning scenes;
- restrained when revealing text;
- responsive to user input.

Avoid motion that feels:

- bouncy;
- playful;
- random;
- decorative;
- slow without purpose.

### 8.2 Motion hierarchy

Every scene should have one dominant motion idea.

Examples:

- Hero: slow reveal + depth.
- Engineering: layered technical reveal.
- Projects: editorial card progression.
- Capabilities: clean stagger.
- CTA: simple fade / slide.

Do not animate every element independently.

---

## 9. Motion Patterns

### 9.1 Text reveal

Use for:

- main headlines;
- section titles;
- key statements.

Pattern:

- opacity 0 → 1;
- slight translate;
- optional mask reveal;
- short delay between lines.

Avoid letter-by-letter animation for serious engineering content unless used very selectively.

### 9.2 Image reveal

Use for:

- vehicle imagery;
- factory photos;
- technical details.

Pattern:

- clip-path / mask reveal;
- opacity;
- subtle scale;
- no aggressive zoom.

### 9.3 Scroll scenes

Use for homepage storytelling only where it adds value.

Rules:

- scroll should guide, not trap;
- avoid long pinned sections on mobile;
- always test touch devices;
- reduced motion must remain usable.

### 9.4 KPI reveal

Use for numerical proof.

Pattern:

- count-up only if it is subtle;
- do not exaggerate;
- numbers must be real and verifiable.

### 9.5 Navigation motion

Navigation should be fast and predictable.

Avoid:

- complex menu animations;
- delayed interaction;
- motion that blocks navigation.

---

## 10. GSAP Usage Rules

GSAP should be introduced only when needed.

Use GSAP for:

- scroll-driven sequences;
- pinned scenes;
- timeline coordination;
- complex reveal choreography.

Do not use GSAP for:

- simple hover states;
- basic CSS transitions;
- static layout;
- anything that Tailwind/CSS can do cleanly.

### 10.1 Reduced motion

Every GSAP timeline must respect `prefers-reduced-motion`.

Reduced motion behavior:

- skip long sequences;
- show final state immediately;
- keep page usable;
- do not hide content behind animations.

### 10.2 Performance

Prefer animating:

- `transform`;
- `opacity`.

Avoid animating:

- width;
- height;
- top;
- left;
- expensive filters;
- layout-heavy properties.

---

## 11. Media Strategy

The project cannot depend on perfect studio assets.  
The design must work even if the client only provides limited images and presentation materials.

### 11.1 Asset categories

Use these asset categories:

1. Real company photos
2. Vehicle photos
3. Production / assembly photos
4. Technical drawings
5. Generated hero visuals
6. Abstract engineering graphics
7. Icons / diagrams
8. Map / route abstractions

### 11.2 Real assets

Real assets are best for credibility.  
Even imperfect real images can be valuable if treated with strong art direction.

Use techniques:

- crop aggressively;
- convert weak photos into editorial compositions;
- use monochrome or duotone if needed;
- pair images with strong typography;
- avoid showing low-quality images too large.

### 11.3 Generated imagery

Generated imagery may be used when real assets are missing, but it must not create false claims.

Good use:

- atmospheric hero visuals;
- abstract industrial compositions;
- conceptual future mobility imagery;
- background detail.

Bad use:

- fake factory proof;
- fake team photos;
- fake project evidence;
- unrealistic vehicle claims.

### 11.4 Technical graphics

Technical graphics can make the site feel premium without needing many photos.

Use:

- blueprint grids;
- exploded detail lines;
- specification panels;
- route lines;
- manufacturing process diagrams;
- subtle data overlays.

Keep them restrained.

---

## 12. Image Treatment

Recommended treatments:

- high contrast black/white;
- controlled desaturation;
- clean crop;
- strong negative space;
- subtle grain only if intentional;
- no random filters.

Avoid:

- stock-photo look;
- excessive glow;
- neon sci-fi unless justified;
- generic corporate gradients.

---

## 13. Mobile Design Rules

Mobile should be simpler, not weaker.

### 13.1 Mobile typography

- strong opening headline;
- fewer words per screen;
- short paragraphs;
- clear CTA spacing.

### 13.2 Mobile motion

- shorter timelines;
- no long pinned sequences;
- fewer parallax layers;
- fast reveal;
- touch-safe controls.

### 13.3 Mobile navigation

- simple menu;
- clear language switcher;
- no hidden critical routes;
- fast close/open behavior.

---

## 14. Design QA Checklist

Before approving a page:

- Does the first screen communicate BELES clearly?
- Is the layout strong without animation?
- Does motion improve understanding?
- Is the mobile version designed, not just adapted?
- Are CTAs visible and clear?
- Is text readable?
- Is spacing consistent?
- Is the page free of decorative noise?
- Does it feel like BELES, not a copied reference?

---

## 15. Creative Red Lines

Do not:

- build a generic corporate website;
- use motion as decoration;
- overload pages with cards;
- copy reference sites directly;
- use fake proof;
- rely on assets that do not exist;
- create a dark sci-fi interface without industrial grounding;
- sacrifice readability for style.

The final website should feel like a serious engineering company with cinematic confidence.
