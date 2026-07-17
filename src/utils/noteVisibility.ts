/**
 * The single note-visibility rule, kept as a pure predicate so it is the
 * testable interface for the "drafts never leak" contract (no astro:content
 * import, so it runs under vitest). `getNotes` wires it to `getCollection`.
 *
 * Drafts are hidden in production but shown in dev for preview — mirroring how
 * `postFilter` treats the blog collection. Applied by BOTH the listing and the
 * detail `getStaticPaths`, so a draft note can never leak a card or a built
 * page in production.
 */
export const isNoteVisible = (
  data: { draft?: boolean },
  { dev }: { dev: boolean }
): boolean => dev || !data.draft;
