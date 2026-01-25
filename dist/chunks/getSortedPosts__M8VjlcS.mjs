import { p as postFilter } from './postFilter_XLhz0Z21.mjs';

const getSortedPosts = (posts) => {
  return posts.filter(postFilter).sort(
    (a, b) => Math.floor(
      new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1e3
    ) - Math.floor(
      new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1e3
    )
  );
};

export { getSortedPosts as g };
