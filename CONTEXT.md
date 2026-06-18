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
The sailing/sea theme. Surfaces in three places, with disjoint URLs:
- **`/link` page**, under `LinkCategory.VELA` — third-party reference sites (federations, regattas, charts).
- **Vela dropdown** in the top nav — Alexandre's own sailing surfaces: external mini-apps (e.g. `mare`) and internal tools (the **Calendario** board at `/vela/calendario` and the **Resultados** board at `/vela/resultados`).
- **`/vela` content collection** — Alexandre's own sailing *notes* (prose). Reached via the **Lesson** dropdown, not the Vela dropdown.

A URL belongs to at most one of these surfaces. Third-party sailing sites go under `/link`; Alexandre's own apps/tools go in the Vela dropdown; his written notes are the `/vela` collection.

### Calendario
The interactive sailing-race board at `/vela/calendario`, listed in the Vela dropdown. Shows the year's regattas (filter by region/class/status, free-text search). Its source of truth is a typed constants file, **not** the `/vela` content collection — see ADR.

### Regata
A single sailing race/event in the Calendario. Each Regata is one entry regardless of how many regional tables it appeared in originally (the source markdown listed some races more than once; the board holds each once).

### Resultados
The race-results board at `/vela/resultados`, listed in the Vela dropdown. Shows the season's *finished* events with their podium standings per class (filter by region/class, free-text boat search). Its source of truth is a typed constants file (`src/constants/resultados2026.ts`), mirroring Calendario. Independent of the Calendario board: it has its own data and does **not** share a key with `Regata`, even though the same race may appear in both boards (worded slightly differently). An event here lists podium **rows** (boat, skipper, club) grouped by **class**; an event with no published standings is marked **pending**.

## Flagged ambiguities

- "Vela" previously referred only to the `LinkCategory` on `/link`. It now also names a top-level dropdown. Resolved: same theme, two surfaces, disjoint URLs (mirrors the Lab vs. `/link` rule).
