import { b as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, e as addAttribute } from './astro/server_ywHERWku.mjs';
import 'piccolore';
import { b as $$LinkButton } from './Footer_CF2xFEDh.mjs';
/* empty css                         */
import { S as SITE } from './config_o6LvftIS.mjs';

const $$Astro = createAstro("https://xani.me/");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, prevUrl, nextUrl } = Astro2.props;
  const prev = currentPage > 1 ? "" : "disabled";
  const next = currentPage < totalPages ? "" : "disabled";
  return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead()}<nav class="pagination-wrapper astro-d776pwuy" aria-label="Pagination">${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": prev === "disabled", "href": prevUrl, "className": (`mr-4 select-none ${prev}` ?? "") + " astro-d776pwuy", "ariaLabel": "Previous" }, { "default": ($$result2) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg"${addAttribute((`${prev}-svg` ?? "") + " astro-d776pwuy", "class")}><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" class="astro-d776pwuy"></path></svg>
Prev
` })}${currentPage} / ${totalPages}${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": next === "disabled", "href": nextUrl, "className": (`ml-4 select-none ${next}` ?? "") + " astro-d776pwuy", "ariaLabel": "Next" }, { "default": ($$result2) => renderTemplate`
Next
<svg xmlns="http://www.w3.org/2000/svg"${addAttribute((`${next}-svg` ?? "") + " astro-d776pwuy", "class")}><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" class="astro-d776pwuy"></path></svg>` })}</nav>`}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/Pagination.astro", void 0);

const getPageNumbers = (numberOfPosts) => {
  const numberOfPages = numberOfPosts / Number(SITE.postPerPage);
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }
  return pageNumbers;
};

const getPagination = ({
  posts,
  page,
  isIndex = false
}) => {
  const totalPagesArray = getPageNumbers(posts.length);
  const totalPages = totalPagesArray.length;
  const currentPage = isIndex ? 1 : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page)) ? Number(page) : 0;
  const lastPost = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage;
  const startPost = isIndex ? 0 : lastPost - SITE.postPerPage;
  const paginatedPosts = posts.slice(startPost, lastPost);
  return {
    totalPages,
    currentPage,
    paginatedPosts
  };
};

export { $$Pagination as $, getPageNumbers as a, getPagination as g };
