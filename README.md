# patilkunals.github.io

Personal portfolio site for **Kunal Patil** — Associate Distinguished Engineer, Solution Architect, and GenAI Architect.

Live at: **[https://patilkunals.github.io](https://patilkunals.github.io)**

---

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) (static output) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + custom glassmorphism CSS |
| Fonts | Space Grotesk + IBM Plex Mono (Google Fonts) |
| Deployment | GitHub Actions → GitHub Pages |

---

## Site Structure

| Route | Source | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Home landing page |
| `/portfolio` | `portfolio/**/*.md` | Architecture, AI, patterns, and technology cards |
| `/resume` | `resume/**/*.md` | Resume rendered from markdown sections |
| `/linkedin-posts` | `LinkedInPosts/*.pdf` + optional `.md` sidecars | PDF-extracted post cards |

---

## Content Layout

```
/portfolio/          → Markdown files for portfolio cards (projects, patterns, AI, technologies, principles)
/resume/             → Markdown files rendered as resume sections
/webpages/           → Markdown for other site pages (about, index, etc.)
/LinkedInPosts/      → PDF files (one per LinkedIn post) + optional sidecar .md overrides
/public/             → Static assets (favicon, optional resume.pdf)
/src/
  components/        → SiteHeader, PortfolioCard, LinkedInPostCard
  layouts/           → Layout.astro (shared shell with OG meta)
  pages/             → index, portfolio, resume, linkedin-posts
  styles/            → global.css (Tailwind + glassmorphism tokens)
  data/              → linkedin-posts.generated.json (auto-generated at build time)
  content.config.ts  → Astro content collection schemas
/scripts/
  generate-linkedin-posts.mjs   → Build-time PDF metadata extractor
/.github/workflows/
  deploy.yml         → GitHub Actions build + deploy pipeline
```

---

## LinkedIn Post Cards — Sidecar Fallback

At build time, `scripts/generate-linkedin-posts.mjs` processes every PDF in `/LinkedInPosts/` and derives a title, excerpt, and date.

To override garbled or incomplete extractions, add a sidecar markdown file alongside the PDF:

```
LinkedInPosts/
  my-post.pdf
  my-post.md          ← sidecar (exact same slug as the PDF)
```

Sidecar frontmatter (any combination):

```yaml
---
title: Your clean post title
excerpt: A short 1–2 sentence summary of the post.
date: 2024-06-20
---
```

If a sidecar exists, its values take precedence over PDF extraction. The card shows a **"Sidecar override"** badge when active.

---

## Development

```sh
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:4321
npm run build        # production build → dist/
npm run preview      # serve dist/ locally before deploying
```

The `generate:linkedin-posts` script runs automatically as part of `npm run build` via the `prebuild` hook.

---

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which:

1. Runs `npm ci`
2. Runs `npm run build` (includes LinkedIn metadata generation)
3. Uploads `dist/` as a Pages artifact
4. Deploys via `actions/deploy-pages`

**Pre-requisite:** In your GitHub repo → Settings → Pages → Source, set it to **"GitHub Actions"**.

---

## Optional: Resume PDF Download

Place a `resume.pdf` file in the `/public/` folder. The resume page will automatically show a **Download PDF** button. Without it, a placeholder notice is shown instead.

---

## Portfolio Links

Portfolio card "Open Link" buttons are populated from the `links:` frontmatter field. Technology, pattern, AI, and architecture principle files already have canonical reference URLs set. Project files (private client work) intentionally have no external links.

To add a link to any card:

```yaml
---
title: My Portfolio Item
links: [https://example.com/docs]
---
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
