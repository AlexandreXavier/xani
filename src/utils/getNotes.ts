import { getCollection, type CollectionEntry } from "astro:content";
import type { NoteCollection } from "@constants/noteCollections";
import { isNoteVisible } from "./noteVisibility";

/**
 * Load the visible entries of a Note collection (estudo/code/vela), applying
 * the single draft-visibility rule (see `isNoteVisible`). Default order is
 * preserved. Use this in BOTH the listing page and the detail `getStaticPaths`
 * so drafts never leak.
 */
const getNotes = async <T extends NoteCollection>(
  collection: T
): Promise<CollectionEntry<T>[]> => {
  return await getCollection(collection, ({ data }) =>
    isNoteVisible(data, { dev: import.meta.env.DEV })
  );
};

export default getNotes;
