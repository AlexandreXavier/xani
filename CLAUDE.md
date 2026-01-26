# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Xani is a personal blog and portfolio website built with Astro 5, featuring type-safe content collections, multi-language support (pt/en), and dynamic OG image generation.

## Build & Development Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # TypeScript check + Astro build + Jampack optimization
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npm run format       # Prettier format all files
npm run format:check # Check formatting without modifying
npm run sync         # Regenerate Astro TypeScript types
```

## Architecture

### Content Collections (src/content/)
Type-safe markdown content with Zod schemas defined in `src/content/config.ts`:
- **blog/** - Blog posts with title, pubDatetime, tags, language (pt/en), draft status, featured flag
- **estudo/** - Study materials with category and tags (defaults to Portuguese)

### Key Directories
- **src/components/** - Astro (static) and React (interactive) components
- **src/layouts/** - Page templates (Layout.astro is the main HTML wrapper)
- **src/pages/** - File-based routing (Astro pages and API endpoints)
- **src/utils/** - Post filtering, sorting, pagination, OG image generation
- **src/config.ts** - Site metadata, social links, pagination settings (postPerPage, scheduledPostMargin)
- **src/styles/base.css** - Tailwind directives and CSS custom properties for theming

### Path Aliases
Configured in tsconfig.json: `@components/*`, `@utils/*`, `@layouts/*`, `@content/*`, `@config`, `@assets/*`, `@styles/*`, `@/types`, `@contexts/*`, `@constants/*`, `@pages/*`

### Component Patterns
- Astro components (.astro) for static content - preferred when no interactivity needed
- React components (.tsx) only for interactive features (Search, LinkManager)
- Props defined with TypeScript interfaces

### Content Processing
- `postFilter.ts` - Excludes drafts and future posts (15-min margin configured in SITE.scheduledPostMargin)
- `getSortedPosts.ts` - Filters and sorts posts by date
- Dynamic OG images generated via Satori + Resvg at `/posts/[slug]/index.png`

## Theming

CSS custom properties in `src/styles/base.css` control colors:
- Light mode: blue accent (#006CAC)
- Dark mode: orange accent (#FF6B01)
- Additional DaisyUI themes available in `src/helpers/themes.json`

## Environment Variables

```bash
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

## Git Workflow

- Husky + lint-staged runs Prettier on commit
- Use `npm run cz` for conventional commits via commitizen
