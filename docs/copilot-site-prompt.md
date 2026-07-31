# Prompt for GitHub Copilot (VS Code, Agent Mode)

Paste this into Copilot Chat in Agent mode, in the root of your repo.

---

## Context

I'm building a personal site to be hosted free on **GitHub Pages**. Repo structure (already exists):

```
/portfolio/       → .md files for portfolio content
/resume/          → .md files for resume content
/webpages/         → .md content for other site pages (about, contact, etc.)
/LinkedInPosts/    → PDF files, one per LinkedIn post
```

## Stack & Deployment

- Framework: **Astro** (static output, content collections for `.md` parsing)
- Styling: Tailwind CSS (utility-first, keeps glassmorphism CSS manageable)
- Deployment: **GitHub Actions** → GitHub Pages via `actions/deploy-pages`
  - Set `output: 'static'` in `astro.config.mjs`
  - Set correct `site` and `base` config for `https://<username>.github.io/<repo>`
  - Workflow triggers on push to `main`, builds with `astro build`, deploys `dist/`

## Site Structure (3 sections, single-page or multi-route — your call, propose one)

1. **Portfolio** — grid of project cards from `/portfolio/*.md` (use frontmatter: title, description, tags, links, cover image)
2. **Resume** — render `/resume/*.md` as a styled page; include a "Download PDF" button (generate/export resume as PDF at build time, or link to a static PDF if I provide one)
3. **LinkedIn Posts** — card grid, one card per PDF in `/LinkedInPosts/`:
   - Card shows: extracted title + short excerpt, post date if available, "View full post (PDF)" download/link button
   - Build-time extraction: use `pdf-parse` (or similar) in an Astro build script to pull text from each PDF, derive a title (first line / first sentence) and excerpt (~200 chars)
   - **Fallback**: if a PDF has no `.md` sidecar file, use extracted text. If a sidecar file exists (e.g. `LinkedInPosts/post-name.md` with `title` and `excerpt` frontmatter), prefer that over extraction — this avoids garbled cards for PDFs with bad text layers or "…see more" truncation. Implement this fallback logic explicitly.

## Design Direction

- **Ultra modern, glassmorphism**: frosted-glass cards (`backdrop-filter: blur`), soft translucent panels over a gradient or dark background, subtle borders/glow
- Subtle animations: scroll-reveal on cards, hover-lift + blur intensification on hover, smooth section transitions — keep performance-conscious (CSS transitions/`@astrojs/motion` or lightweight JS, no heavy animation libraries)
- Fully responsive (mobile-first), accessible (semantic HTML, alt text, keyboard nav, sufficient contrast against glass backgrounds — this is the usual glassmorphism accessibility risk, double-check contrast ratios)
- Include: sticky nav, favicon, meta tags/OpenGraph for SEO, light/dark toggle optional

## Build Steps (do these in order, confirm with me before moving to the next)

1. Scaffold Astro project + Tailwind, confirm `astro.config.mjs` Pages settings with me (need my GitHub username/repo name)
2. Set up content collections for `portfolio`, `resume`, `webpages`
3. Build PDF-parsing build script for LinkedIn posts + sidecar fallback logic
4. Build page layouts/components per section above
5. Apply glassmorphism theme + animations
6. Write GitHub Actions workflow for Pages deployment
7. Test build locally (`astro build && astro preview`) before I push

## Constraints

- Do not hallucinate my content — pull only from the provided `.md`/PDF files; use placeholder text only where I haven't provided content, and flag those placeholders clearly
- Ask me before installing any dependency I haven't mentioned
- No server-side code — must be fully static-exportable
