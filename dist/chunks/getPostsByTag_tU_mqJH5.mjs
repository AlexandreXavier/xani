import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, e as addAttribute, f as renderTransition, m as maybeRenderHead } from './astro/server_ywHERWku.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header, c as $$Footer } from './Footer_CF2xFEDh.mjs';
import { $ as $$Main } from './Main_DMd37Tef.mjs';
import { C as Card } from './Card_xYmP1YOP.mjs';
import { $ as $$Pagination } from './getPagination_CF6YqAcK.mjs';
import { S as SITE } from './config_o6LvftIS.mjs';
/* empty css                         */
import { g as getSortedPosts } from './getSortedPosts__M8VjlcS.mjs';
import { a as slugifyAll } from './slugify_Bbr6UVgA.mjs';

const $$Astro = createAstro("https://xani.me/");
const $$TagPosts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TagPosts;
  const { currentPage, totalPages, paginatedPosts, tag, tagName } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Tag: ${tagName} | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "tags" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": [`Tag:`, `${tagName}`], "titleTransition": tag, "pageDesc": `All the articles with the tag "${tagName}".` }, { "default": ($$result3) => renderTemplate`  ${maybeRenderHead()}<ul> ${paginatedPosts.map(({ data, slug }) => renderTemplate`${renderComponent($$result3, "Card", Card, { "href": `/posts/${slug}/`, "frontmatter": data })}`)} </ul> `, "title": ($$result3) => renderTemplate`<h1${addAttribute(renderTransition($$result3, "vfrq7tp3", "", tag), "data-astro-transition-scope")}>${`Tag:${tag}`}</h1>` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "prevUrl": `/tags/${tag}${currentPage - 1 !== 1 ? "/" + (currentPage - 1) : ""}/`, "nextUrl": `/tags/${tag}/${currentPage + 1}/` })} ${renderComponent($$result2, "Footer", $$Footer, { "noMarginTop": totalPages > 1 })} ` })}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/layouts/TagPosts.astro", "self");

const getPostsByTag = (posts, tag) => getSortedPosts(
  posts.filter((post) => slugifyAll(post.data.tags).includes(tag))
);

export { $$TagPosts as $, getPostsByTag as g };
