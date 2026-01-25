import { S as SITE } from '../chunks/config_o6LvftIS.mjs';
export { renderers } from '../renderers.mjs';

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
`.trim();
const GET = () => new Response(robots, {
  headers: { "Content-Type": "text/plain" }
});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
