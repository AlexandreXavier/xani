import { g as getCollection } from '../../../chunks/_astro_content_0Yb5BH96.mjs';
import { a as generateOgImageForPost } from '../../../chunks/generateOgImages_XlR_0TLJ.mjs';
import { s as slugifyStr } from '../../../chunks/slugify_Bbr6UVgA.mjs';
export { renderers } from '../../../renderers.mjs';

async function getStaticPaths() {
  const posts = await getCollection("blog").then(
    (p) => p.filter(({ data }) => !data.draft && !data.ogImage)
  );
  return posts.map((post) => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post
  }));
}
const GET = async ({ props }) => {
  const buffer = await generateOgImageForPost(props);
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": buffer.length.toString(),
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
