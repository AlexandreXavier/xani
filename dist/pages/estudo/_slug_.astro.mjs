import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { g as getCollection } from '../../chunks/_astro_content_0Yb5BH96.mjs';
import { $ as $$Layout, a as $$Header, c as $$Footer } from '../../chunks/Footer_CF2xFEDh.mjs';
import { $ as $$Main } from '../../chunks/Main_DMd37Tef.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://xani.me/");
async function getStaticPaths() {
  const estudoEntries = await getCollection("estudo");
  return estudoEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${entry.data.title} | Estudo`, "class": "astro-vsxfgdeh" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "estudo", "class": "astro-vsxfgdeh" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": entry.data.title, "pageDesc": entry.data.description || "Conte\xFAdo de estudo", "class": "astro-vsxfgdeh" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<article class="estudo-content astro-vsxfgdeh"> <div class="estudo-meta astro-vsxfgdeh"> ${entry.data.category && renderTemplate`<span class="category astro-vsxfgdeh">${entry.data.category}</span>`} <div class="tags astro-vsxfgdeh"> ${entry.data.tags.map((tag) => renderTemplate`<span class="tag astro-vsxfgdeh">${tag}</span>`)} </div> </div> <div class="content prose astro-vsxfgdeh"> ${renderComponent($$result3, "Content", Content, { "class": "astro-vsxfgdeh" })} </div> </article> ` })} ${renderComponent($$result2, "Footer", $$Footer, { "class": "astro-vsxfgdeh" })} ` })} `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/estudo/[slug].astro", void 0);

const $$file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/estudo/[slug].astro";
const $$url = "/estudo/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
