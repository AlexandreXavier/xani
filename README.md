# Xani

Personal blog and portfolio website built with Astro 5.

**Live:** [xani.me](https://xani.me/)

## Features

- Type-safe markdown with Zod schemas
- Multi-language support (PT/EN)
- Dynamic OG image generation (Satori + Resvg)
- Light/dark mode theming
- Fuzzy search (Fuse.js)
- SEO-friendly with sitemap & RSS
- Responsive design
- Accessible (keyboard/screen reader)
- View transitions

## Tech Stack

- **Framework:** [Astro 5](https://astro.build/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [React](https://reactjs.org/) (interactive), Astro (static)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)
- **Search:** [Fuse.js](https://fusejs.io/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Optimization:** [Jampack](https://jampack.divriots.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Project Structure

```text
├── public/              # Static assets (favicon, robots.txt, toggle-theme.js)
├── src/
│   ├── assets/          # Images and social icons
│   ├── components/      # Astro and React components
│   ├── content/
│   │   ├── blog/        # Blog posts (markdown)
│   │   ├── estudo/      # Study materials (markdown)
│   │   └── config.ts    # Content collection schemas
│   ├── layouts/         # Page templates
│   ├── pages/           # File-based routing
│   ├── styles/          # Tailwind config and CSS
│   ├── utils/           # Helpers (filtering, sorting, OG images)
│   └── config.ts        # Site metadata and social links
└── package.json
```

## Commands

| Command              | Description                              |
| :------------------- | :--------------------------------------- |
| `npm install`        | Install dependencies                     |
| `npm run dev`        | Start dev server at `localhost:4321`     |
| `npm run build`      | TypeScript check + build + optimize      |
| `npm run preview`    | Preview production build                 |
| `npm run lint`       | ESLint check                             |
| `npm run format`     | Format with Prettier                     |
| `npm run sync`       | Regenerate Astro TypeScript types        |
| `npm run cz`         | Conventional commit with Commitizen      |

## Environment Variables

```bash
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

## Content

### Blog Posts

Create markdown files in `src/content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
pubDatetime: 2024-01-01T00:00:00Z
description: "Post description"
tags: ["tag1", "tag2"]
language: "pt"  # or "en"
featured: false
draft: false
---
```

### Study Materials

Create markdown files in `src/content/estudo/` with frontmatter:

```yaml
---
title: "Material Title"
pubDatetime: 2024-01-01T00:00:00Z
description: "Description"
category: "Category Name"
tags: ["tag1"]
---
```

## License

MIT License, Copyright © 2024

---

Made by [Alexandre Xavier](https://xani.me/)
