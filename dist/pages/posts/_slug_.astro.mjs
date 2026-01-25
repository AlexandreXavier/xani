import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, f as renderTransition } from '../../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { g as getCollection } from '../../chunks/_astro_content_0Yb5BH96.mjs';
import { $ as $$Posts } from '../../chunks/Posts_BqKle7Ru.mjs';
import { b as $$LinkButton, s as socialIcons, $ as $$Layout, a as $$Header, c as $$Footer } from '../../chunks/Footer_CF2xFEDh.mjs';
import { $ as $$Tag } from '../../chunks/Tag_Dx4rvEkq.mjs';
import { D as Datetime } from '../../chunks/Card_xYmP1YOP.mjs';
import { s as slugifyStr } from '../../chunks/slugify_Bbr6UVgA.mjs';
/* empty css                                    */
import { S as SITE } from '../../chunks/config_o6LvftIS.mjs';
/* empty css                                    */
import { g as getSortedPosts } from '../../chunks/getSortedPosts__M8VjlcS.mjs';
import { g as getPagination, a as getPageNumbers } from '../../chunks/getPagination_CF6YqAcK.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro("https://xani.me/");
const $$ShareLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ShareLinks;
  const URL = Astro2.url;
  const shareLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/?text=",
      linkTitle: `Share this post via WhatsApp`
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/sharer.php?u=",
      linkTitle: `Share this post on Facebook`
    },
    {
      name: "Twitter",
      href: "https://twitter.com/intent/tweet?url=",
      linkTitle: `Tweet this post`
    },
    {
      name: "Telegram",
      href: "https://t.me/share/url?url=",
      linkTitle: `Share this post via Telegram`
    },
    {
      name: "Pinterest",
      href: "https://pinterest.com/pin/create/button/?url=",
      linkTitle: `Share this post on Pinterest`
    },
    {
      name: "Mail",
      href: "mailto:?subject=See%20this%20post&body=",
      linkTitle: `Share this post via email`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`social-icons astro-wkojbtzc`, "class")}> <span class="italic astro-wkojbtzc">Share this post on:</span> <div class="text-center astro-wkojbtzc"> ${shareLinks.map((social) => renderTemplate`${renderComponent($$result, "LinkButton", $$LinkButton, { "href": `${social.href + URL}`, "className": "link-button astro-wkojbtzc", "title": social.linkTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(socialIcons[social.name])}` })} <span class="sr-only astro-wkojbtzc">${social.linkTitle}</span> ` })}`)} </div> </div> `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/ShareLinks.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://xani.me/");
const $$PostDetails = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostDetails;
  const { post } = Astro2.props;
  const {
    title,
    author,
    description,
    ogImage,
    canonicalURL,
    pubDatetime,
    modDatetime,
    tags
  } = post.data;
  const { Content } = await post.render();
  const ogImageUrl = typeof ogImage === "string" ? ogImage : ogImage?.src;
  const ogUrl = new URL(
    ogImageUrl ?? `/posts/${slugifyStr(title)}.png`,
    Astro2.url.origin
  ).href;
  const layoutProps = {
    title: `${title} | ${SITE.title}`,
    author,
    description,
    pubDatetime,
    modDatetime,
    canonicalURL,
    ogImage: ogUrl,
    scrollSmooth: true
  };
  return renderTemplate(_a || (_a = __template(["", '  <script>\n  /** Create a progress indicator\n   *  at the top */\n  function createProgressBar() {\n    // Create the main container div\n    const progressContainer = document.createElement("div");\n    progressContainer.className =\n      "progress-container fixed top-0 z-10 h-1 w-full bg-skin-fill";\n\n    // Create the progress bar div\n    const progressBar = document.createElement("div");\n    progressBar.className = "progress-bar h-1 w-0 bg-skin-accent";\n    progressBar.id = "myBar";\n\n    // Append the progress bar to the progress container\n    progressContainer.appendChild(progressBar);\n\n    // Append the progress container to the document body or any other desired parent element\n    document.body.appendChild(progressContainer);\n  }\n  createProgressBar();\n\n  /** Update the progress bar\n   *  when user scrolls */\n  function updateScrollProgress() {\n    const winScroll =\n      document.body.scrollTop || document.documentElement.scrollTop;\n    const height =\n      document.documentElement.scrollHeight -\n      document.documentElement.clientHeight;\n    const scrolled = (winScroll / height) * 100;\n    if (document) {\n      const myBar = document.getElementById("myBar");\n      if (myBar) {\n        myBar.style.width = scrolled + "%";\n      }\n    }\n  }\n  document.addEventListener("scroll", updateScrollProgress);\n\n  /** Attaches links to headings in the document,\n   *  allowing sharing of sections easily */\n  function addHeadingLinks() {\n    let headings = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));\n    for (let heading of headings) {\n      heading.classList.add("group");\n      let link = document.createElement("a");\n      link.innerText = "#";\n      link.className = "heading-link hidden group-hover:inline-block ml-2";\n      link.href = "#" + heading.id;\n      link.ariaHidden = "true";\n      heading.appendChild(link);\n    }\n  }\n  addHeadingLinks();\n\n  /** Attaches copy buttons to code blocks in the document,\n   * allowing users to copy code easily. */\n  function attachCopyButtons() {\n    let copyButtonLabel = "Copy";\n    let codeBlocks = Array.from(document.querySelectorAll("pre"));\n\n    for (let codeBlock of codeBlocks) {\n      let wrapper = document.createElement("div");\n      wrapper.style.position = "relative";\n\n      let copyButton = document.createElement("button");\n      copyButton.className =\n        "copy-code absolute right-3 -top-3 rounded bg-skin-card px-2 py-1 text-xs leading-4 text-skin-base font-medium";\n      copyButton.innerHTML = copyButtonLabel;\n      codeBlock.setAttribute("tabindex", "0");\n      codeBlock.appendChild(copyButton);\n\n      // wrap codebock with relative parent element\n      codeBlock?.parentNode?.insertBefore(wrapper, codeBlock);\n      wrapper.appendChild(codeBlock);\n\n      copyButton.addEventListener("click", async () => {\n        await copyCode(codeBlock, copyButton);\n      });\n    }\n\n    async function copyCode(block, button) {\n      let code = block.querySelector("code");\n      let text = code?.innerText;\n\n      await navigator.clipboard.writeText(text ?? "");\n\n      // visual feedback that task is completed\n      button.innerText = "Copied";\n\n      setTimeout(() => {\n        button.innerText = copyButtonLabel;\n      }, 700);\n    }\n  }\n  attachCopyButtons();\n\n  /** Scrolls the document to the top when\n   * the "Back to Top" button is clicked. */\n  function backToTop() {\n    document.querySelector("#back-to-top")?.addEventListener("click", () => {\n      document.body.scrollTop = 0; // For Safari\n      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera\n    });\n  }\n  backToTop();\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, { ...layoutProps, "class": "astro-vj4tpspi" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "class": "astro-vj4tpspi" })}  ${maybeRenderHead()}<div class="mx-auto flex w-full max-w-3xl justify-start px-2 astro-vj4tpspi"> <button class="focus-outline mb-2 mt-8 flex hover:opacity-75 astro-vj4tpspi" onclick="(() => (history.length === 1) ? window.location = '/' : history.back())()"> <svg xmlns="http://www.w3.org/2000/svg" class="astro-vj4tpspi"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" class="astro-vj4tpspi"></path> </svg><span class="astro-vj4tpspi">Go back</span> </button> </div> <main id="main-content" class="astro-vj4tpspi"> <h1 class="post-title astro-vj4tpspi"${addAttribute(renderTransition($$result2, "ti6a3mbw", "", slugifyStr(title)), "data-astro-transition-scope")}>${title}</h1> ${renderComponent($$result2, "Datetime", Datetime, { "pubDatetime": pubDatetime, "modDatetime": modDatetime, "size": "lg", "className": "my-2 astro-vj4tpspi" })} <article id="article" role="article" class="prose mx-auto mt-8 max-w-3xl astro-vj4tpspi"> ${renderComponent($$result2, "Content", Content, { "class": "astro-vj4tpspi" })} </article> <ul class="my-8 astro-vj4tpspi"> ${tags.map((tag) => renderTemplate`${renderComponent($$result2, "Tag", $$Tag, { "tag": slugifyStr(tag), "class": "astro-vj4tpspi" })}`)} </ul> <div class="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row-reverse sm:items-end sm:gap-4 astro-vj4tpspi"> <button id="back-to-top" class="focus-outline whitespace-nowrap py-1 hover:opacity-75 astro-vj4tpspi"> <svg xmlns="http://www.w3.org/2000/svg" class="rotate-90 astro-vj4tpspi"> <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" class="astro-vj4tpspi"></path> </svg> <span class="astro-vj4tpspi">Back to Top</span> </button> ${renderComponent($$result2, "ShareLinks", $$ShareLinks, { "class": "astro-vj4tpspi" })} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "class": "astro-vj4tpspi" })} ` }));
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/layouts/PostDetails.astro", "self");

const $$Astro = createAstro("https://xani.me/");
async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const postResult = posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
  const pagePaths = getPageNumbers(posts.length).map((pageNum) => ({
    params: { slug: String(pageNum) }
  }));
  return [...postResult, ...pagePaths];
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { slug } = Astro2.params;
  const { post } = Astro2.props;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  const pagination = getPagination({
    posts: sortedPosts,
    page: slug
  });
  return renderTemplate`${post ? renderTemplate`${renderComponent($$result, "PostDetails", $$PostDetails, { "post": post })}` : renderTemplate`${renderComponent($$result, "Posts", $$Posts, { ...pagination })}`}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/posts/[slug]/index.astro", void 0);

const $$file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/posts/[slug]/index.astro";
const $$url = "/posts/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
