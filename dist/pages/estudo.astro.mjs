import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { S as SITE } from '../chunks/config_o6LvftIS.mjs';
import { $ as $$Layout, a as $$Header, c as $$Footer } from '../chunks/Footer_CF2xFEDh.mjs';
import { $ as $$Main } from '../chunks/Main_DMd37Tef.mjs';
import { g as getCollection } from '../chunks/_astro_content_0Yb5BH96.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const estudoEntries = await getCollection("estudo");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Estudo | ${SITE.title}`, "class": "astro-hcfbynrz" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "estudo", "class": "astro-hcfbynrz" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Estudo", "pageDesc": "Conte\xFAdo de estudos sobre Direito e materiais jur\xEDdicos.", "class": "astro-hcfbynrz" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="estudo-container astro-hcfbynrz"> <div class="estudo-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 astro-hcfbynrz"> ${estudoEntries.map((entry) => renderTemplate`<article class="estudo-card astro-hcfbynrz"> <a${addAttribute(`/estudo/${entry.slug}/`, "href")} class="estudo-link astro-hcfbynrz"> <h2 class="estudo-title astro-hcfbynrz">${entry.data.title}</h2> ${entry.data.description && renderTemplate`<p class="estudo-description astro-hcfbynrz">${entry.data.description}</p>`} ${entry.data.category && renderTemplate`<span class="estudo-category astro-hcfbynrz">${entry.data.category}</span>`} <div class="estudo-tags astro-hcfbynrz"> ${entry.data.tags.map((tag) => renderTemplate`<span class="tag astro-hcfbynrz">${tag}</span>`)} </div> </a> </article>`)} </div> ${estudoEntries.length === 0 && renderTemplate`<div class="empty-state astro-hcfbynrz"> <p class="astro-hcfbynrz">Nenhum conteúdo de estudo encontrado.</p> </div>`} </div> ` })} ${renderComponent($$result2, "Footer", $$Footer, { "class": "astro-hcfbynrz" })} ` })} `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/estudo/index.astro", void 0);

const $$file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/estudo/index.astro";
const $$url = "/estudo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
