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

A **theme** is a single domain concept that surfaces in more than one place in the nav. The same theme name applies to _both_ surfaces; the URLs across those surfaces stay disjoint (no URL appears on more than one surface).

### Vela

The sailing/sea theme. Surfaces in three places, with disjoint URLs:

- **`/link` page**, under `LinkCategory.VELA` — third-party reference sites (federations, regattas, charts).
- **Vela dropdown** in the top nav — Alexandre's own sailing surfaces: external mini-apps (e.g. `mare`) and internal tools (the **Calendario** board at `/vela/calendario` and the **Resultados** board at `/vela/resultados`).
- **`/vela` content collection** — Alexandre's own sailing _notes_ (prose). Reached via the **Lesson** dropdown, not the Vela dropdown.

A URL belongs to at most one of these surfaces. Third-party sailing sites go under `/link`; Alexandre's own apps/tools go in the Vela dropdown; his written notes are the `/vela` collection.

### Calendario

The interactive sailing-race board at `/vela/calendario`, listed in the Vela dropdown. Shows the year's regattas (filter by region/class/status, free-text search). Its source of truth is a typed constants file, **not** the `/vela` content collection — see ADR.

### Regata

A single sailing race/event in the Calendario. Each Regata is one entry regardless of how many regional tables it appeared in originally (the source markdown listed some races more than once; the board holds each once).

### Resultados

The race-results board at `/vela/resultados`, listed in the Vela dropdown. Shows the season's _finished_ events with their podium standings per class (filter by region/class, free-text boat search). Its source of truth is a typed constants file (`src/constants/resultados2026.ts`), mirroring Calendario. Independent of the Calendario board: it has its own data and does **not** share a key with `Regata`, even though the same race may appear in both boards (worded slightly differently). An event here lists podium **rows** (boat, skipper, club) grouped by **class**; an event with no published standings is marked **pending**.

## Content

### Note collection

The family of markdown collections that share one shape (title / description / category / tags / language / draft) and one listing UI: **estudo** (labeled "Law" in the nav), **code**, and **vela** (sailing notes). All three are reached via the **Lesson dropdown** and rendered by the shared `NoteListing` / `NoteArticle` components fed by `getNotes()`; their per-section display copy lives in `src/constants/noteCollections.ts`.

The **blog** collection is deliberately **not** a Note collection — a blog entry is a **Post** (with `pubDatetime`, `ogImage`, and an optional **Narração**) and has its own listing, sorting, and detail layout. Draft notes are hidden in production and shown only in dev; `getNotes` (via the pure `isNoteVisible` rule) owns that contract for **both** the index and the detail pages, so a draft never leaks a card or a built page.

## Audio

### Narração

The spoken-word version of a blog **Post**: an audio file synthesized from the post's text in Alexandre's cloned voice, played from the **Ouvir control** on the post's date line. Pre-generated when the post is published/edited and served as a static file; not produced at read time. _Avoid_: podcast, audiobook, gravação.

### Voz clonada

Alexandre's voice reproduced by a voice-cloning model — the single voice that reads every **Narração**, in both pt and en. Currently synthesized by a local [Voicebox](https://github.com/jamiepine/voicebox) instance, reached behind a swappable adapter, so "Voz clonada" names the voice, not any one engine. _Avoid_: gravação (implies a hand-recorded human take, which this is not).

### Ouvir control

The compact play/pause button shown inline on a blog post's date line that plays the post's **Narração**. Present only when a Narração exists for that post.

## Relationships

- A blog **Post** has at most one **Narração**; the `estudo`, `code`, and `vela` collections have none (no date line, no Narração).
- Every **Narração** is produced by the same **Voz clonada**.
- The **Ouvir control** plays exactly one **Narração** — the one for the Post it sits on.

## Flagged ambiguities

- "biblioteca de voz" / "gravei a minha voz" was first read as hand-recorded audio files, one per article. Resolved: it means a **Voz clonada** (voice samples → a TTS model that reads any text); there is no per-article human recording. The synthesized output is a **Narração**.
- "Vela" previously referred only to the `LinkCategory` on `/link`. It now also names a top-level dropdown. Resolved: same theme, two surfaces, disjoint URLs (mirrors the Lab vs. `/link` rule).
