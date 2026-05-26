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
