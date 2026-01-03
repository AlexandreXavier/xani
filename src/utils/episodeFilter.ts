import { SITE } from "@config";

// Define the type for the blog post data
interface BlogPostData {
  data: {
    pubDatetime: Date;
    draft?: boolean;
  };
}

const episodeFilter = ({ data }: BlogPostData) => {
  if (!data.pubDatetime) return false;
  
  const publishTime = new Date(data.pubDatetime).getTime();
  const isPublishTimePassed = 
    Date.now() > publishTime - SITE.scheduledPostMargin;
    
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default episodeFilter;
