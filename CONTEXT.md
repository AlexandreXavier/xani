# CONTEXT

Glossary for Xani. Defines terms whose meaning isn't obvious from the code alone, or that have collided with other terms in past discussions.

## Navigation

### Lab dropdown
The dropdown menu in the top nav labeled "Lab". Lives in `src/components/Header.astro`. Its items are nav targets to standalone lab pages (e.g. `/tempo`, `/pdf`) and external mini-apps. Distinct from — and unrelated to — the `/link` page.

### Lab menu item
An entry in the Lab dropdown. Two kinds:
- **Lab link** — terminal item; clicking navigates somewhere (internal route or external URL).
- **Lab group** — parent item that holds children, forming a one-level submenu. Groups exist to organise related Lab links as the dropdown grows; a group cannot itself contain another group.

### `/link` page bookmarks
Curated bookmarks shown on the `/link` page. Each is a `LinkItem` (see `src/types.ts`) belonging to a `LinkCategory`. These are unrelated to the Lab dropdown: a URL appearing in the Lab dropdown does **not** appear on `/link`, and vice versa.

## Themes

A **theme** is a single domain concept that surfaces in more than one place in the nav. The same theme name applies to *both* surfaces; the URLs across those surfaces stay disjoint (no URL appears on more than one surface).

### Vela
The sailing/sea theme. Surfaces in two places, with disjoint URLs:
- **`/link` page**, under `LinkCategory.VELA` — third-party reference sites (federations, regattas, charts).
- **Vela dropdown** in the top nav — Alexandre's own sailing-adjacent mini-apps (e.g. `mare`).

A URL belongs to at most one of these surfaces. If a third-party sailing site exists, it goes under `/link`; if it's one of Alexandre's apps, it goes in the dropdown.

## Flagged ambiguities

- "Vela" previously referred only to the `LinkCategory` on `/link`. It now also names a top-level dropdown. Resolved: same theme, two surfaces, disjoint URLs (mirrors the Lab vs. `/link` rule).
