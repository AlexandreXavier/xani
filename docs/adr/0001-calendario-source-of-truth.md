# Calendario board sourced from typed constants, not the markdown content collection

The Calendario board (`/vela/calendario`) was seeded from a hand-consolidated markdown file (`src/content/vela/calendario-nacional-regatas-cruzeiro-2026.md`). We decided the board's source of truth is a typed `Regata[]` in `src/constants/` (mirroring `links.ts`/`labMenu.ts`), and we deleted the markdown — rather than keeping the `.md` as source of truth and parsing it at build time.

## Considered Options

- **Parse the markdown at build time** (literal "source do ficheiro"). Rejected: the source dates are free-text ranges with no year (`"20-21 jun"`, `"25 jul - 2 ago"`), the same race is duplicated across regional tables, and status (`realizada`/`a vir`) is encoded inconsistently (a column in some tables, a section heading in others). Reliable parsing would be fragile.
- **A `type: "data"` content collection** (JSON/YAML). Rejected: heavier setup than the established `src/constants/` pattern for static data tables that drive UI without a collection.
- **Typed constants file** (chosen). Clean ISO dates for sorting/filtering, each race stored once, status computed from date so it never goes stale.

## Consequences

- A future reader sees the data in `src/constants/`, not in `src/content/vela/`, even though the original `.md` looked like the obvious source — hence this record.
- The per-region source URLs from the markdown are preserved as comments in the constants file.
- New race years mean editing/adding the constants file, not adding markdown.
