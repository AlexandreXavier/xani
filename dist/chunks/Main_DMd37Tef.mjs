import { b as createAstro, c as createComponent, r as renderComponent, m as maybeRenderHead, d as renderSlot, e as addAttribute, f as renderTransition, a as renderTemplate } from './astro/server_ywHERWku.mjs';
import 'piccolore';
import { $ as $$Breadcrumbs } from './Breadcrumbs_BfiIKnkN.mjs';
/* empty css                         */
/* empty css                         */

const $$Astro = createAstro("https://xani.me/");
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Main;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, { "class": "astro-hsp6otuf" })} ${maybeRenderHead()}<main id="main-content" class="astro-hsp6otuf"> ${"titleTransition" in props ? renderTemplate`<h1 class="astro-hsp6otuf"> ${props.pageTitle[0]} <span class="astro-hsp6otuf"${addAttribute(renderTransition($$result, "hn2qarie", "", props.titleTransition), "data-astro-transition-scope")}> ${props.pageTitle[1]} </span> </h1>` : renderTemplate`<h1 class="astro-hsp6otuf">${props.pageTitle}</h1>`} <p class="astro-hsp6otuf">${props.pageDesc}</p> ${renderSlot($$result, $$slots["default"])} </main> `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/layouts/Main.astro", "self");

export { $$Main as $ };
