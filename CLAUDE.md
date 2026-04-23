# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Xani is a personal blog and portfolio website built with Astro 5, featuring type-safe content collections, multi-language support (pt/en), and dynamic OG image generation.

## Build & Development Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # astro check (types) + astro build
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npm run format       # Prettier format all files
npm run format:check # Check formatting without modifying
npm run sync         # Regenerate Astro TypeScript types
npm run cz           # Commitizen conventional-commit prompt
```

Note: `@divriots/jampack` is installed as a devDependency but is not wired into any npm script. If optimization is needed, run `npx jampack ./dist` after `npm run build`.

No test suite is configured.

## Architecture

### Content Collections (src/content/)
Type-safe markdown content with Zod schemas defined in `src/content/config.ts`:
- **blog/** - Blog posts: title, pubDatetime, modDatetime?, description, tags, language (pt/en, default en), draft, featured, ogImage (enforced ≥ 1200×630)
- **estudo/** - Study materials: title, category, tags (default `["direito"]`), language (default pt), draft
- **code/** - Code-focused notes: same shape as `estudo` with default tag `["code"]`

When adding a new collection, update `src/content/config.ts`, add a matching route under `src/pages/`, and run `npm run sync` to regenerate types before using the new schema.

### Key Directories
- **src/components/** - Astro (static) and React (interactive) components
- **src/layouts/** - Page templates (Layout.astro is the main HTML wrapper; PostDetails, Posts, TagPosts, AboutLayout, Main)
- **src/pages/** - File-based routing. Top-level routes: `/` (index), `/about`, `/search`, `/404`, plus content sections `/posts`, `/estudo`, `/code`, `/tags`, and standalone features `/link`, `/pdf`, `/tempo`. Endpoints: `og.png.ts`, `robots.txt.ts`, `rss.xml.ts`
- **src/utils/** - Post/episode filtering, sorting, pagination, tag aggregation, OG image generation (`og-templates/` holds JSX templates consumed by Satori)
- **src/config.ts** - `SITE` (website, author, postPerPage, scheduledPostMargin), `LOCALE`, `LOGO_IMAGE`, `SOCIALS`
- **src/types.ts** - Shared `Site` / `SocialObjects` types consumed by config
- **src/constants/** - Static data (e.g. `links.ts` powering `/link`)
- **src/workers/**, **src/scripts/**, **src/helpers/** - Browser workers, client scripts, and JSON helpers (e.g. `themes.json`)
- **src/styles/base.css** - Tailwind directives and CSS custom properties for theming
- **public/** - Static assets served as-is (favicon, `toggle-theme.js`, `robots.txt` fallback)

### Path Aliases
Declared in both `tsconfig.json` (for the type checker) and `astro.config.ts` under `vite.resolve.alias` (for the bundler) — keep them in sync when adding a new alias: `@components/*`, `@utils/*`, `@layouts/*`, `@content/*`, `@config`, `@assets/*`, `@styles/*`, `@/types`, `@contexts/*`, `@constants/*`, `@pages/*`.

### Component Patterns
- Astro components (.astro) for static content - preferred when no interactivity needed
- React components (.tsx) for interactive features (Search, LinkManager, Card, etc.)
- Props defined with TypeScript interfaces

### Content Processing
- `postFilter.ts` / `episodeFilter.ts` - Excludes drafts and future posts (15-min margin configured in `SITE.scheduledPostMargin`). Any new listing page must apply one of these filters to avoid leaking drafts/scheduled items.
- `getSortedPosts.ts` / `getSortedEpisode.ts` - Filters and sorts content by date
- Dynamic OG images generated via Satori + Resvg in `src/utils/generateOgImages.tsx`, served at `/og.png` (site) and `/posts/[slug]/index.png` (per-post). `@resvg/resvg-js` is excluded from Vite `optimizeDeps` because it ships native bindings.
- Markdown pipeline (configured in `astro.config.ts`): `remark-toc` + `remark-collapse` (collapses under "Table of contents"), Shiki theme `one-dark-pro` with wrap enabled.

## Theming

CSS custom properties in `src/styles/base.css` control colors via RGB values:
- Light mode: blue accent (0, 108, 172)
- Dark mode: orange accent (255, 107, 1)
- Theme data available in `src/helpers/themes.json`

## Environment Variables

```bash
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

## Git Workflow

- Husky + lint-staged runs Prettier on commit
- Use `npm run cz` for conventional commits via commitizen
