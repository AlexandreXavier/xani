import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_ywHERWku.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header, c as $$Footer } from './Footer_CF2xFEDh.mjs';
import { $ as $$Main } from './Main_DMd37Tef.mjs';
import { $ as $$Pagination } from './getPagination_CF6YqAcK.mjs';
import { C as Card } from './Card_xYmP1YOP.mjs';
import { S as SITE } from './config_o6LvftIS.mjs';

const $$Astro = createAstro("https://xani.me/");
const $$Posts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Posts;
  const { currentPage, totalPages, paginatedPosts } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Posts | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "posts" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "...", "pageDesc": "" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<ul> ${paginatedPosts.map(({ data, slug }) => renderTemplate`${renderComponent($$result3, "Card", Card, { "href": `/posts/${slug}/`, "frontmatter": data })}`)} </ul> ` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "prevUrl": `/posts${currentPage - 1 !== 1 ? "/" + (currentPage - 1) : ""}/`, "nextUrl": `/posts/${currentPage + 1}/` })} ${renderComponent($$result2, "Footer", $$Footer, { "noMarginTop": totalPages > 1 })} ` })}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/layouts/Posts.astro", void 0);

export { $$Posts as $ };
