import { g as generateOgImageForSite } from '../chunks/generateOgImages_XlR_0TLJ.mjs';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const buffer = await generateOgImageForSite();
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": buffer.length.toString(),
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
