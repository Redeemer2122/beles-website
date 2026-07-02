## Development

When starting the dev server, use background mode:

```bash
npm run dev
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## BELES Engineering Playbook

`docs/` is the project source of truth. Read only the document relevant to the current task:

- For strategy, IA, homepage scenes, page structure, and content direction: read `docs/01-Strategy-Experience.md`.
- For public UI, visual design, motion, media, GSAP, and polishing: read `docs/02-Design-Motion-Media.md`.
- For Astro architecture, i18n, SEO, accessibility, performance, CMS, and packages: read `docs/03-Technical-Implementation.md`.
- For small mechanical edits, formatting, typo fixes, or isolated code fixes: do not read the full docs unless needed.

Core principles:

- Public BELES website: GSAP, custom components, and a disciplined design system.
- Admin / CMS: shadcn/ui, simple forms, tables, and CMS workflow.
- Polishing: Taste Skill + Impeccable.
- Documentation and current API reference: Context7.
- MCP and skills are helpers, not designers. They must not define the BELES style. The BELES style comes from the playbook.

## Implementation Discipline

- Every task must stay within the requested scope.
- Scope discipline must not reduce creative ambition.
- Do not make the public website visually generic, overly minimal, or boring just to avoid complexity.
- The BELES public website is allowed to use advanced motion, cinematic layouts, scroll storytelling, WebGL, smooth scrolling, and complex visual systems when they serve the approved experience direction.
- Use native Astro, TypeScript, CSS, and Tailwind for ordinary structure, layout, styling, and basic interactions.
- Use specialized libraries intentionally when the experience requires them.
- Do not add dependencies "just in case".
- Do not create folders, components, utilities, abstractions, or configuration files "for later".
- Public website UI must follow the BELES Engineering Playbook.
- Complexity is allowed when it directly supports the approved design, motion, media, or storytelling direction.
- Complexity is not allowed when it is decorative, copied from a library, unrelated to the task, or added only because it looks impressive.
- For code changes, run `npm run lint`, `npm run format:check`, and `npm run build`.
- If a task is documentation-only, do not run build unless code or config changed.

## Astro Reference

Use Astro documentation only when relevant to the task: https://docs.astro.build
