# BELES Engineering Playbook v1.0 — Technical Implementation

> Purpose: Define how the BELES website should be implemented in Astro with a clean, scalable, and performance-first architecture.

---

## 1. Current Stack

The project foundation currently includes:

- Astro
- TypeScript strict mode
- Tailwind CSS v4
- ESLint
- Prettier
- EditorConfig
- Native Astro i18n
- Clean production baseline

This is a strong foundation.  
Do not add dependencies until they solve a current, specific problem.

---

## 2. Architecture Principles

### 2.1 Keep the architecture simple

The project should remain understandable.

Avoid:

- unnecessary folders;
- unused abstractions;
- “future-proof” code that solves no current problem;
- large configuration files before they are needed.

### 2.2 One responsibility per component

A component should do one clear job.

Good:

- `ProjectCard.astro`
- `SectionShell.astro`
- `PageHero.astro`

Bad:

- `UniversalSuperSection.astro`
- `DynamicEverythingRenderer.astro`
- `MegaLayoutController.astro`

### 2.3 Data before CMS

Before adding CMS, define stable content shapes locally.  
CMS should replace the content source later, not redesign the frontend.

---

## 3. Recommended Project Structure

Current structure is good. Recommended long-term structure:

```text
src/
  components/
    layout/
    sections/
    shared/
    ui/
  content/
  i18n/
  layouts/
  lib/
  pages/
  styles/
  types/
  utils/
public/
  fonts/
  icons/
  img/
  videos/
  locales/
docs/
```

Do not add new top-level folders unless there is a real need.

---

## 4. Astro Implementation Rules

### 4.1 Pages

Pages should stay thin.

A page should:

- import layout;
- import page sections;
- pass content/data;
- define metadata;
- avoid complex logic.

### 4.2 Layouts

Layouts should handle:

- HTML shell;
- metadata;
- global structure;
- header/footer;
- language attributes;
- SEO defaults.

Layouts should not contain page-specific scene logic.

### 4.3 Components

Components should be grouped by purpose.

- `layout/` — header, footer, navigation.
- `sections/` — large page sections.
- `shared/` — reusable cross-page patterns.
- `ui/` — small primitives.

### 4.4 Utilities

Utilities should be small and boring.

Examples:

- locale helpers;
- class name helpers if needed;
- metadata helpers;
- content formatters.

Do not create utilities for every small operation.

---

## 5. i18n Strategy

The project uses native Astro i18n.

Current languages:

- `en` default
- `ru`
- `zh`
- `ky`

Routing strategy:

```text
/       English
/ru/    Russian
/zh/    Chinese
/ky/    Kyrgyz
```

### 5.1 Translation source

Current translation files:

```text
src/i18n/locales/en.ts
src/i18n/locales/ru.ts
src/i18n/locales/zh.ts
src/i18n/locales/ky.ts
```

Keep translation objects typed and consistent.

### 5.2 Language switching

Language switcher should:

- preserve current page when possible;
- fall back safely;
- display language names clearly;
- be accessible by keyboard.

Do not create the switcher until routes and page structure are stable.

---

## 6. Styling Strategy

### 6.1 Global CSS

`src/styles/global.css` should remain controlled.

It may contain:

- Tailwind import;
- design tokens;
- base document styles;
- accessibility helpers if needed.

It should not become a dumping ground.

### 6.2 Tailwind usage

Use Tailwind for layout and utility styling.

Avoid:

- extremely long unreadable class lists;
- repeated complex combinations;
- arbitrary values everywhere;
- hardcoded colors after tokens exist.

### 6.3 Design tokens

Tokens should be defined before serious UI work.

Recommended token groups:

- color;
- typography;
- spacing;
- radius;
- shadow;
- motion duration;
- easing;
- z-index.

Example direction:

```css
:root {
  --color-bg: ;
  --color-text: ;
  --color-muted: ;
  --color-accent: ;

  --font-display: ;
  --font-body: ;

  --ease-out: ;
  --duration-fast: ;
  --duration-medium: ;
}
```

Do not fill tokens randomly.  
Tokens must come from the approved Design DNA.

---

## 7. Content Modeling

Before CMS, content can live in typed local data files or Astro content collections.

Potential content models:

### 7.1 Project

```ts
type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description?: string;
  facts?: {
    label: string;
    value: string;
  }[];
  image?: string;
  featured?: boolean;
};
```

### 7.2 Capability

```ts
type Capability = {
  title: string;
  summary: string;
  description?: string;
  icon?: string;
};
```

### 7.3 Navigation item

```ts
type NavItem = {
  label: string;
  href: string;
};
```

Keep content models small at first.  
Expand only when actual content requires it.

---

## 8. SEO Strategy

SEO should be built into the architecture, not added at the end.

### 8.1 Required SEO basics

Each page should eventually include:

- title;
- description;
- canonical URL;
- Open Graph title;
- Open Graph description;
- Open Graph image;
- language alternates;
- structured headings;
- semantic HTML.

### 8.2 Page titles

Recommended pattern:

```text
Home: BELES — Engineering Mobility for Central Asia
Story: Story — BELES
Projects: Projects — BELES
Capabilities: Capabilities — BELES
About: About — BELES
Contact: Contact — BELES
```

Final wording can change after content writing.

### 8.3 Headings

Each page should have one `h1`.

Do not use headings only for visual size.  
Use semantic order:

```text
h1
h2
h3
```

### 8.4 Images

Images should have meaningful alt text.

Bad:

```text
image
bus photo
```

Good:

```text
BELES commercial vehicle shown in front three-quarter view.
```

Decorative images can use empty alt if truly decorative.

---

## 9. Accessibility Rules

Accessibility is not optional.

### 9.1 Keyboard

All interactive elements must be reachable and usable by keyboard.

### 9.2 Focus

Focus states must be visible.

Do not remove outlines unless replaced with a clear alternative.

### 9.3 Motion

Respect `prefers-reduced-motion`.

Content must not depend on animation to become visible.

### 9.4 Contrast

Important text and controls must have strong contrast.

### 9.5 Semantic HTML

Use semantic elements:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`
- `button`
- `a`

Do not use `div` for everything.

---

## 10. Performance Strategy

Performance is part of the design.

### 10.1 Keep pages light

Avoid:

- heavy JS before needed;
- unnecessary libraries;
- autoplay video without strategy;
- huge unoptimized images.

### 10.2 Images

Images should be:

- compressed;
- responsive;
- correctly sized;
- lazy-loaded where appropriate;
- not larger than needed.

### 10.3 JavaScript

Astro should ship minimal JS by default.

Only hydrate interactive components that need client-side behavior.

### 10.4 Motion performance

Animate:

- opacity;
- transform.

Avoid layout-heavy animation.

---

## 11. Security and Reliability

### 11.1 Dependencies

Before adding any package, ask:

- What problem does it solve now?
- Can native Astro/CSS solve it?
- Is it maintained?
- Does it increase bundle size?
- Does it add security risk?

### 11.2 Forms

Contact forms should eventually include:

- validation;
- spam protection;
- safe server handling;
- clear success/error states.

Do not expose secrets in frontend code.

### 11.3 CMS future

CMS should be added after content structure is stable.

CMS requirements:

- easy project editing;
- multilingual content support;
- image/media management;
- draft/publish workflow if needed;
- simple admin experience.

Do not integrate CMS too early.

---

## 12. Motion Implementation Plan

Do not add GSAP immediately.

Add it when building actual homepage scenes.

Suggested order:

1. Build static layout.
2. Confirm responsive design.
3. Add CSS transitions.
4. Add simple reveal system.
5. Add GSAP only for scroll scenes.
6. Add reduced-motion support.
7. Test mobile performance.

---

## 13. Development Workflow with Codex

Every Codex task should be narrow.

Prompt structure:

```text
Context
Goal
Scope
Allowed changes
Forbidden changes
Acceptance criteria
Output
No scope creep
```

Do not ask Codex:

```text
Make it beautiful.
```

Ask:

```text
Create the SectionShell component with container width, vertical spacing, semantic section element, and no visual styling beyond layout.
```

### 13.1 Good task example

```text
Create src/components/shared/SectionShell.astro.

It should:
- render a semantic <section>
- accept class prop
- provide consistent container width
- provide responsive vertical spacing
- not include colors, typography, or animation
```

### 13.2 Bad task example

```text
Create the whole homepage with cool animations like Oil Stain Lab.
```

---

## 14. AI / MCP / Skills Usage Rules

MCP servers, AI tools, and skills are assistants. They do not define the BELES style.

The project direction is defined by:

1. Strategy & Experience
2. Design DNA
3. Motion Architecture
4. Technical Architecture
5. Real project requirements

Tools may accelerate research, implementation, checking, and polishing, but they must not replace creative direction or engineering judgment.

### 14.1 Public Website Rule

For the public BELES website, use:

```text
GSAP + custom components + disciplined design system
```

This means:

- public pages should be custom-built;
- motion should be designed specifically for BELES;
- components should support the brand experience;
- no generic UI kit should define the public-facing style;
- visual language must come from the BELES Design DNA, not from component libraries.

Use GSAP when building:

- homepage scene choreography;
- scroll-driven storytelling;
- pinned narrative sequences;
- coordinated reveal timelines;
- advanced motion that CSS alone cannot handle cleanly.

Do not use GSAP for:

- basic hover states;
- simple fades;
- static layout;
- anything that can be done with CSS cleanly.

### 14.2 Admin / CMS Rule

For admin interfaces, use:

```text
shadcn/ui + simple forms + tables + CMS workflow
```

The admin area has a different goal than the public website.

Public website goal:

- emotion;
- storytelling;
- brand;
- motion;
- premium experience.

Admin goal:

- clarity;
- speed;
- reliability;
- content editing;
- predictable forms;
- clean tables.

Therefore shadcn/ui is appropriate for future admin/CMS screens, but not as the visual foundation of the public BELES website.

Good admin use cases:

- project editor;
- media manager;
- contact inquiry dashboard;
- content status table;
- language content forms;
- login/admin shell if required.

Avoid using admin components for public-facing sections unless they are heavily customized and justified.

### 14.3 Polishing Rule

For polishing, use:

```text
Taste Skill + Impeccable
```

These tools should be used after a page or component already has a clear direction.

Use them for:

- spacing audit;
- typography refinement;
- hierarchy critique;
- visual consistency review;
- interaction polish;
- anti-slop review;
- final design QA.

Do not use them to decide the core style of BELES.

Correct use:

```text
Review this homepage scene against the BELES Design DNA and identify spacing, hierarchy, motion, and composition issues.
```

Incorrect use:

```text
Design the BELES website style for me.
```

### 14.4 Documentation Rule

For documentation and up-to-date implementation references, use:

```text
Context7
```

Use Context7 for:

- Astro documentation;
- Tailwind CSS v4 documentation;
- GSAP documentation;
- shadcn/ui documentation;
- library usage patterns;
- current API details;
- version-specific examples.

Context7 should answer implementation questions, not brand questions.

Good use:

```text
Check the current Astro i18n API and confirm the correct config shape.
```

Bad use:

```text
Tell me what BELES should look like.
```

### 14.5 Magic UI / React Bits Rule

Magic UI and React Bits may be used only as inspiration or for very selective implementation ideas.

They must not become the design system.

Allowed:

- studying interaction patterns;
- using a small idea as reference;
- adapting a concept into custom BELES code.

Forbidden:

- dropping many prebuilt effects into the public website;
- making the site look like a component showcase;
- using flashy effects without narrative purpose.

### 14.6 Tool Decision Matrix

| Tool / Skill | Use For                                                             | Do Not Use For                              |
| ------------ | ------------------------------------------------------------------- | ------------------------------------------- |
| GSAP MCP     | Motion research, timeline planning, scroll animation implementation | Basic CSS effects, deciding visual identity |
| Context7     | Current docs and version-specific implementation details            | Creative direction                          |
| shadcn/ui    | Future admin/CMS UI, forms, tables, dashboards                      | Public website visual system                |
| Magic UI     | Selective inspiration for interaction ideas                         | Full public UI system                       |
| React Bits   | Selective inspiration for effects                                   | Replacing custom BELES components           |
| Taste Skill  | Design critique and polish                                          | Defining the initial brand style            |
| Impeccable   | Final visual refinement and anti-slop review                        | Replacing design judgment                   |

### 14.7 Required Prompt Pattern When Using Tools

When asking Codex or another assistant to use tools, prompts should specify the role of the tool.

Good:

```text
Use Context7 only to verify the current Astro i18n configuration API.
Do not change architecture beyond the requested config.
```

Good:

```text
Use GSAP MCP only to check recommended ScrollTrigger patterns.
Implement only the minimal homepage reveal timeline described in the Motion Architecture.
```

Bad:

```text
Use all MCPs and make the site amazing.
```

Bad:

```text
Use Magic UI and React Bits to create cool sections.
```

### 14.8 Final Rule

MCP and skills are helpers, not designers.

The style of BELES must come from the project documents and the approved creative direction.

If a tool suggests something that conflicts with the BELES playbook, the playbook wins.

---

## 15. QA Checklist Before Each Commit

Run:

```bash
npm run lint
npm run format:check
npm run build
```

Check:

- no console errors;
- no broken layout on mobile;
- no horizontal overflow;
- no unused files;
- no unnecessary dependencies;
- no placeholder text in production sections.

---

## 16. Suggested Implementation Roadmap

### Phase 1 — Foundation Completed

- project structure;
- code quality;
- Tailwind;
- cleanup;
- i18n.

### Phase 2 — Brand Foundation

- design tokens;
- typography decision;
- base layout;
- header/footer;
- page shell.

### Phase 3 — Static Homepage

- build homepage scenes without advanced animation;
- validate content hierarchy;
- validate mobile.

### Phase 4 — Motion Layer

- add reveal system;
- add homepage timeline;
- add reduced-motion behavior;
- test performance.

### Phase 5 — Inner Pages

- Story;
- Projects;
- Capabilities;
- About;
- Contact.

### Phase 6 — CMS Preparation

- content models;
- admin/CMS decision;
- migration from local data.

---

## 17. Engineering Red Lines

Do not:

- install packages “for later”;
- create CMS before content structure is known;
- create global CSS chaos;
- hardcode important content inside complex components;
- animate content that is not accessible without JS;
- ignore mobile until the end;
- build decorative features before core pages work.

---

## 18. Definition of Done

A feature is done when:

- it works on desktop and mobile;
- it passes lint, format check, and build;
- it is accessible by keyboard if interactive;
- it does not create layout shift;
- it does not add unnecessary JS;
- it follows the design and experience direction;
- it can be understood by another developer later.

The project should always remain simple enough to maintain.
