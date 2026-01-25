import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_ywHERWku.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://xani.me/");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const currentUrlPath = Astro2.url.pathname.replace(/\/+$/, "");
  const breadcrumbList = currentUrlPath.split("/").slice(1);
  breadcrumbList[0] === "posts" && breadcrumbList.splice(0, 2, `Posts (page ${breadcrumbList[1] || 1})`);
  breadcrumbList[0] === "tags" && !isNaN(Number(breadcrumbList[2])) && breadcrumbList.splice(
    1,
    3,
    `${breadcrumbList[1]} ${Number(breadcrumbList[2]) === 1 ? "" : "(page " + breadcrumbList[2] + ")"}`
  );
  return renderTemplate`${maybeRenderHead()}<nav class="breadcrumb astro-ilhxcym7" aria-label="breadcrumb"> <ul class="astro-ilhxcym7"> <li class="astro-ilhxcym7"> <a href="/" class="astro-ilhxcym7">Home</a> <span aria-hidden="true" class="astro-ilhxcym7">&raquo;</span> </li> ${breadcrumbList.map(
    (breadcrumb, index) => index + 1 === breadcrumbList.length ? renderTemplate`<li class="astro-ilhxcym7"> <span${addAttribute((`${index > 0 ? "lowercase" : "capitalize"}` ?? "") + " astro-ilhxcym7", "class")} aria-current="page">  ${decodeURIComponent(breadcrumb)} </span> </li>` : renderTemplate`<li class="astro-ilhxcym7"> <a${addAttribute(`/${breadcrumb}/`, "href")} class="astro-ilhxcym7">${breadcrumb}</a> <span aria-hidden="true" class="astro-ilhxcym7">&raquo;</span> </li>`
  )} </ul> </nav> `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
