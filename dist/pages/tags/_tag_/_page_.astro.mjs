import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from '../../../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { g as getCollection } from '../../../chunks/_astro_content_0Yb5BH96.mjs';
import { g as getPostsByTag, $ as $$TagPosts } from '../../../chunks/getPostsByTag_tU_mqJH5.mjs';
import { g as getUniqueTags } from '../../../chunks/getUniqueTags_ASshXPOE.mjs';
import { g as getPagination, a as getPageNumbers } from '../../../chunks/getPagination_CF6YqAcK.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://xani.me/");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  const tags = getUniqueTags(posts);
  return tags.flatMap(({ tag, tagName }) => {
    const tagPosts = getPostsByTag(posts, tag);
    const totalPages = getPageNumbers(tagPosts.length);
    return totalPages.map((page) => ({
      params: { tag, page },
      props: { tag, tagName }
    }));
  });
}
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { page } = Astro2.params;
  const { tag, tagName } = Astro2.props;
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const postsByTag = getPostsByTag(posts, tag);
  const pagination = getPagination({
    posts: postsByTag,
    page
  });
  return renderTemplate`${renderComponent($$result, "TagPosts", $$TagPosts, { ...pagination, "tag": tag, "tagName": tagName })}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/tags/[tag]/[page].astro", void 0);

const $$file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/tags/[tag]/[page].astro";
const $$url = "/tags/[tag]/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
