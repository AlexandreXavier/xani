import type { CollectionEntry } from "astro:content";
import episodeFilter from "./episodeFilter";

const getSortedPosts = (posts: CollectionEntry<"episode">[]) => {
  return posts
    .filter(episodeFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDate ?? b.data.pubDate).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDate ?? a.data.pubDate).getTime() / 1000
        )
    );
};

export default getSortedPosts;
