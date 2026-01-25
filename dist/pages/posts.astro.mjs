import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_0Yb5BH96.mjs';
import { $ as $$Posts } from '../chunks/Posts_BqKle7Ru.mjs';
import { g as getSortedPosts } from '../chunks/getSortedPosts__M8VjlcS.mjs';
import { g as getPagination } from '../chunks/getPagination_CF6YqAcK.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  const pagination = getPagination({
    posts: sortedPosts,
    page: 1,
    isIndex: true
  });
  return renderTemplate`${renderComponent($$result, "Posts", $$Posts, { ...pagination })}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/posts/index.astro", void 0);

const $$file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/posts/index.astro";
const $$url = "/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
