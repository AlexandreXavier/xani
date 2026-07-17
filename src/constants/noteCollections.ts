/**
 * Note collection — the estudo/code/vela family of markdown collections that
 * share one shape (title/description/category/tags/language/draft) and one
 * listing UI, all reached via the **Lesson dropdown**. The `blog` collection
 * is deliberately NOT a Note collection (it has dates, ogImage, and a
 * Narração, with its own listing/sorting/detail layout). See CONTEXT.md.
 *
 * Source of truth for each section's display copy, mirroring the typed-table
 * pattern of links.ts / labMenu.ts. Adding a new note section = register the
 * collection in src/content/config.ts, add a row here, and add the two thin
 * route files under src/pages/<name>/ (index.astro + [slug].astro).
 */
export type NoteCollection = "estudo" | "code" | "vela";

export interface NoteMeta {
  /** Display name — page heading and the `<title>` suffix. */
  label: string;
  /** Listing-page description (Main `pageDesc`). */
  listDesc: string;
  /** Shown when the collection has no visible notes. */
  empty: string;
  /** Fallback description for a note detail page with no own description. */
  detailFallback: string;
}

export const NOTE_COLLECTIONS: Record<NoteCollection, NoteMeta> = {
  estudo: {
    label: "Estudo",
    listDesc: "Conteúdo de estudos sobre Direito e materiais jurídicos.",
    empty: "Nenhum conteúdo de estudo encontrado.",
    detailFallback: "Conteúdo de estudo",
  },
  code: {
    label: "Code",
    listDesc: "Conteúdo sobre programação e desenvolvimento de software.",
    empty: "Nenhum conteúdo de código encontrado.",
    detailFallback: "Conteúdo de código",
  },
  vela: {
    label: "Vela",
    listDesc: "Conteúdo sobre vela, navegação e mar.",
    empty: "Nenhum conteúdo de vela encontrado.",
    detailFallback: "Conteúdo de vela",
  },
};
