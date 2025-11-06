import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const episodeFilter = ({ data }: CollectionEntry<"episode">) => {
  if (!data.pubDate) return false;
  
  const publishTime = new Date(data.pubDate).getTime();
  const isPublishTimePassed = 
    Date.now() > publishTime - SITE.scheduledPostMargin;
    
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default episodeFilter;
