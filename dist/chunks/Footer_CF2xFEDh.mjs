import { b as createAstro, c as createComponent, e as addAttribute, g as renderScript, a as renderTemplate, r as renderComponent, d as renderSlot, k as renderHead, m as maybeRenderHead, F as Fragment, u as unescapeHTML } from './astro/server_ywHERWku.mjs';
import 'piccolore';
import { S as SITE, L as LOCALE, a as SOCIALS } from './config_o6LvftIS.mjs';
/* empty css                         */
import 'clsx';

const $$Astro$7 = createAstro("https://xani.me/");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$6 = createAstro("https://xani.me/");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$5 = createAstro("https://xani.me/");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Layout;
  const googleSiteVerification = undefined                                               ;
  const {
    title = SITE.title,
    author = SITE.author,
    description = SITE.desc,
    ogImage = SITE.ogImage,
    canonicalURL = new URL(Astro2.url.pathname, Astro2.site).href,
    pubDatetime,
    modDatetime,
    scrollSmooth = false
  } = Astro2.props;
  const socialImageURL = new URL(
    ogImage ?? SITE.ogImage ?? "og.png",
    Astro2.url.origin
  ).href;
  return renderTemplate(
    _a || (_a = __template(["<html", "", '> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical"', '><meta name="generator"', "><!-- General Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="author"', '><link rel="sitemap" href="/sitemap-index.xml"><!-- Open Graph / Facebook --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', "><!-- Article Published/Modified time -->", "", '<!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- Google Font --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet"><meta name="theme-color" content="">', "", '<script src="/toggle-theme.js"></script>', "", "</head> <body> ", " </body></html>"])),
    addAttribute(`${LOCALE.lang}`, "lang"),
    addAttribute(`${scrollSmooth && "scroll-smooth"}`, "class"),
    addAttribute(canonicalURL, "href"),
    addAttribute(Astro2.generator, "content"),
    title,
    addAttribute(title, "content"),
    addAttribute(description, "content"),
    addAttribute(author, "content"),
    addAttribute(title, "content"),
    addAttribute(description, "content"),
    addAttribute(canonicalURL, "content"),
    addAttribute(socialImageURL, "content"),
    pubDatetime && renderTemplate`<meta property="article:published_time"${addAttribute(pubDatetime.toISOString(), "content")}>`,
    modDatetime && renderTemplate`<meta property="article:modified_time"${addAttribute(modDatetime.toISOString(), "content")}>`,
    addAttribute(canonicalURL, "content"),
    addAttribute(title, "content"),
    addAttribute(description, "content"),
    addAttribute(socialImageURL, "content"),
    // If PUBLIC_GOOGLE_SITE_VERIFICATION is set in the environment variable,
    // include google-site-verification tag in the heading
    // Learn more: https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag
    googleSiteVerification,
    renderComponent($$result, "ViewTransitions", $$ClientRouter, {}),
    renderComponent($$result, "Analytics", $$Index, {}),
    renderHead(),
    renderSlot($$result, $$slots["default"])
  );
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/layouts/Layout.astro", void 0);

const $$Astro$4 = createAstro("https://xani.me/");
const $$Hr = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Hr;
  const { noPadding = false, ariaHidden = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`max-w-3xl mx-auto ${noPadding ? "px-0" : "px-4"}`, "class")}> <hr class="border-skin-line"${addAttribute(ariaHidden, "aria-hidden")}> </div>`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/Hr.astro", void 0);

const $$Astro$3 = createAstro("https://xani.me/");
const $$LinkButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LinkButton;
  const { href, className, ariaLabel, title, disabled = false } = Astro2.props;
  return renderTemplate`${disabled ? renderTemplate`${maybeRenderHead()}<span${addAttribute(`group inline-block ${className}`, "class")}${addAttribute(ariaLabel, "aria-label")}${addAttribute(title, "title")}${addAttribute(disabled, "aria-disabled")}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`group inline-block hover:text-skin-accent ${className}`, "class")}${addAttribute(ariaLabel, "aria-label")}${addAttribute(title, "title")}>${renderSlot($$result, $$slots["default"])}</a>`}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/LinkButton.astro", void 0);

const $$Astro$2 = createAstro("https://xani.me/");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { activeNav } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="astro-3ef6ksr2"> <a id="skip-to-content" href="#main-content" class="astro-3ef6ksr2">Skip to content</a> <div class="nav-container astro-3ef6ksr2"> <div class="top-nav-wrap astro-3ef6ksr2"> <a href="/" class="logo whitespace-nowrap astro-3ef6ksr2"> ${SITE.title} </a> <nav id="nav-menu" class="astro-3ef6ksr2"> <button class="hamburger-menu focus-outline astro-3ef6ksr2" aria-label="Open Menu" aria-expanded="false" aria-controls="menu-items"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="menu-icon astro-3ef6ksr2"> <line x1="7" y1="12" x2="21" y2="12" class="line astro-3ef6ksr2"></line> <line x1="3" y1="6" x2="21" y2="6" class="line astro-3ef6ksr2"></line> <line x1="12" y1="18" x2="21" y2="18" class="line astro-3ef6ksr2"></line> <line x1="18" y1="6" x2="6" y2="18" class="close astro-3ef6ksr2"></line> <line x1="6" y1="6" x2="18" y2="18" class="close astro-3ef6ksr2"></line> </svg> </button> <ul id="menu-items" class="display-none sm:flex astro-3ef6ksr2"> <li class="astro-3ef6ksr2"> <a href="/posts/"${addAttribute(((activeNav === "posts" ? "active" : "") ?? "") + " astro-3ef6ksr2", "class")}>
Posts
</a> </li> <li class="astro-3ef6ksr2"> <a href="/tags/"${addAttribute(((activeNav === "tags" ? "active" : "") ?? "") + " astro-3ef6ksr2", "class")}>
Tags
</a> </li> <li class="astro-3ef6ksr2"> <a href="/link/"${addAttribute(((activeNav === "link" ? "active" : "") ?? "") + " astro-3ef6ksr2", "class")}>
Link
</a> </li> <li class="astro-3ef6ksr2"> <a href="/estudo/"${addAttribute(((activeNav === "estudo" ? "active" : "") ?? "") + " astro-3ef6ksr2", "class")}>
Estudo
</a> </li> <li class="astro-3ef6ksr2"> <a href="/tempo/"${addAttribute(((activeNav === "tempo" ? "active" : "") ?? "") + " astro-3ef6ksr2", "class")}>
Tempo
</a> </li> <li class="astro-3ef6ksr2"> <a href="/about/"${addAttribute(((activeNav === "about" ? "active" : "") ?? "") + " astro-3ef6ksr2", "class")}>
About
</a> </li> <li class="astro-3ef6ksr2"> ${renderComponent($$result, "LinkButton", $$LinkButton, { "href": "/search/", "className": (`focus-outline p-3 sm:p-1 ${activeNav === "search" ? "active" : ""} flex` ?? "") + " astro-3ef6ksr2", "ariaLabel": "search", "title": "Search" }, { "default": ($$result2) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" class="scale-125 sm:scale-100 astro-3ef6ksr2"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" class="astro-3ef6ksr2"></path> </svg> <span class="sr-only astro-3ef6ksr2">Search</span> ` })} </li> ${renderTemplate`<li class="astro-3ef6ksr2"> <button id="theme-btn" class="focus-outline astro-3ef6ksr2" title="Toggles light & dark" aria-label="auto" aria-live="polite"> <svg xmlns="http://www.w3.org/2000/svg" id="moon-svg" class="astro-3ef6ksr2"> <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" class="astro-3ef6ksr2"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" id="sun-svg" class="astro-3ef6ksr2"> <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" class="astro-3ef6ksr2"></path> </svg> </button> </li>`} </ul> </nav> </div> </div> ${renderComponent($$result, "Hr", $$Hr, { "class": "astro-3ef6ksr2" })} </header>  ${renderScript($$result, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/Header.astro", void 0);

const socialIcons = {
  Github: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon-tabler"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path
      d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
    ></path>
  </svg>`,
  Facebook: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon-tabler"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path
      d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
    ></path>
  </svg>`,
  Instagram: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon-tabler"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <rect x="4" y="4" width="16" height="16" rx="4"></rect>
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
  </svg>`,
  LinkedIn: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon-tabler"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <rect x="4" y="4" width="16" height="16" rx="2"></rect>
    <line x1="8" y1="11" x2="8" y2="16"></line>
    <line x1="8" y1="8" x2="8" y2="8.01"></line>
    <line x1="12" y1="16" x2="12" y2="11"></line>
    <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
  </svg>`,
  Mail: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <polyline points="3 7 12 13 21 7"></polyline>
    </svg>`,
  Twitter: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
    </svg>`,
  Twitch: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
    </svg>`,
  YouTube: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>`,
  WhatsApp: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
      <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1"></path>
    </svg>`,
  Snapchat: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"></path>
    </svg>`,
  Pinterest: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="8" y1="20" x2="12" y2="11"></line>
      <path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7"></path>
      <circle cx="12" cy="12" r="9"></circle>
    </svg>`,
  TikTok: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5"></path>
    </svg>`,
  CodePen: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 15l9 6l9 -6l-9 -6l-9 6"></path>
      <path d="M3 9l9 6l9 -6l-9 -6l-9 6"></path>
      <line x1="3" y1="9" x2="3" y2="15"></line>
      <line x1="21" y1="9" x2="21" y2="15"></line>
      <line x1="12" y1="3" x2="12" y2="9"></line>
      <line x1="12" y1="15" x2="12" y2="21"></line>
    </svg>`,
  Discord: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="9" cy="12" r="1"></circle>
      <circle cx="15" cy="12" r="1"></circle>
      <path d="M7.5 7.5c3.5 -1 5.5 -1 9 0"></path>
      <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
      <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5"></path>
      <path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.428 -11.5c1.388 -1.015 2.782 -1.34 4.237 -1.5l1 2.5"></path>
    </svg>`,
  GitLab: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7z"></path>
    </svg>`,
  Reddit: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z"></path>
      <path d="M12 8l1 -5l6 1"></path>
      <circle cx="19" cy="4" r="1"></circle>
      <circle cx="9" cy="13" r=".5" fill="currentColor"></circle>
      <circle cx="15" cy="13" r=".5" fill="currentColor"></circle>
      <path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5"></path>
    </svg>`,
  Skype: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3a9 9 0 0 1 8.603 11.65a4.5 4.5 0 0 1 -5.953 5.953a9 9 0 0 1 -11.253 -11.253a4.5 4.5 0 0 1 5.953 -5.954a8.987 8.987 0 0 1 2.65 -.396z"></path>
      <path d="M8 14.5c.5 2 2.358 2.5 4 2.5c2.905 0 4 -1.187 4 -2.5c0 -1.503 -1.927 -2.5 -4 -2.5s-4 -.997 -4 -2.5c0 -1.313 1.095 -2.5 4 -2.5c1.642 0 3.5 .5 4 2.5"></path>
    </svg>`,
  Steam: `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon-tabler"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M16.5 5a4.5 4.5 0 1 1 -.653 8.953l-4.347 3.009l0 .038a3 3 0 0 1 -2.824 2.995l-.176 .005a3 3 0 0 1 -2.94 -2.402l-2.56 -1.098v-3.5l3.51 1.755a2.989 2.989 0 0 1 2.834 -.635l2.727 -3.818a4.5 4.5 0 0 1 4.429 -5.302z"></path>
      <circle fill="currentColor" cx="16.5" cy="9.5" r="1"></circle>
    </svg>`,
  Telegram: `<svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon-tabler"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
      </svg>`,
  Mastodon: `<svg class="icon-tabler" viewBox="-10 -5 1034 1034" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    <path fill="currentColor"
  d="M499 112q-93 1 -166 11q-81 11 -128 33l-14 8q-16 10 -32 25q-22 21 -38 47q-21 33 -32 73q-14 47 -14 103v37q0 77 1 119q3 113 18 188q19 95 62 154q50 67 134 89q109 29 210 24q46 -3 88 -12q30 -7 55 -17l19 -8l-4 -75l-22 6q-28 6 -57 10q-41 6 -78 4q-53 -1 -80 -7
  q-43 -8 -67 -30q-29 -25 -35 -72q-2 -14 -2 -29l25 6q31 6 65 10q48 7 93 9q42 2 92 -2q32 -2 88 -9t107 -30q49 -23 81.5 -54.5t38.5 -63.5q9 -45 13 -109q4 -46 5 -97v-41q0 -56 -14 -103q-11 -40 -32 -73q-16 -26 -38 -47q-15 -15 -32 -25q-12 -8 -14 -8
  q-46 -22 -127 -33q-74 -10 -166 -11h-3zM367 267q73 0 109 56l24 39l24 -39q36 -56 109 -56q63 0 101 43t38 117v239h-95v-232q0 -74 -61 -74q-69 0 -69 88v127h-94v-127q0 -88 -69 -88q-61 0 -61 74v232h-95v-239q0 -74 38 -117t101 -43z" />
  </svg>`,
  Soundcloud: `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 54.574 54.574" xml:space="preserve">
<g>
	<g>
		<path d="M46.936,25.127c-0.127-0.013-0.242-0.025-0.346-0.037c-0.766-6.683-6.426-11.804-13.232-11.804
			c-2.409,0-6.142,1.152-7.869,2.182l-0.506,0.301l0.766,25.46L48,41.287c4.115,0,6.574-4.192,6.574-8.246
			C54.574,28.829,51.434,25.575,46.936,25.127z M48.004,39.287L34.047,39.23h-6.357l-0.671-22.315
			c1.62-0.793,4.521-1.628,6.339-1.628c6.021,0,10.987,4.717,11.304,10.738l0.045,0.781l0.768,0.149c0,0,0.395,0.077,1.265,0.163
			c3.436,0.342,5.836,2.778,5.836,5.924C52.574,36.045,50.825,39.287,48.004,39.287z"/>
		<rect x="20" y="19.287" width="2" height="22"/>
		<rect x="15" y="21.287" width="2" height="20"/>
		<rect x="10" y="22.287" width="2" height="19"/>
		<rect x="5" y="26.287" width="2" height="15"/>
		<rect y="29.287" width="2" height="9"/>
	</g>
</g>
</svg>`,
  Linkedin: `<svg xmlns="http://www.w3.org/2000/svg"  
viewBox="10 9 48 48" 
width="90px" 
height="90px">
<path d="M 23.773438 12 C 12.855437 12 12 12.854437 12 23.773438 L 12 40.226562 C 12 51.144563 12.855438 52 23.773438 52 L 40.226562 52 C 51.144563 52 52 51.145563 52 40.226562 L 52 23.773438 C 52 12.854437 51.145563 12 40.226562 12 L 23.773438 12 z M 21.167969 16 L 42.832031 16 C 47.625031 16 48 16.374969 48 21.167969 L 48 42.832031 C 48 47.625031 47.624031 48 42.832031 48 L 21.167969 48 C 16.374969 48 16 47.624031 16 42.832031 L 16 21.167969 C 16 16.374969 16.374969 16 21.167969 16 z M 22.501953 18.503906 C 20.872953 18.503906 19.552734 19.824172 19.552734 21.451172 C 19.552734 23.078172 20.871953 24.400391 22.501953 24.400391 C 24.126953 24.400391 25.447266 23.079172 25.447266 21.451172 C 25.447266 19.826172 24.126953 18.503906 22.501953 18.503906 z M 37.933594 26.322266 C 35.473594 26.322266 33.823437 27.672172 33.148438 28.951172 L 33.078125 28.951172 L 33.078125 26.728516 L 28.228516 26.728516 L 28.228516 43 L 33.28125 43 L 33.28125 34.949219 C 33.28125 32.826219 33.687359 30.771484 36.318359 30.771484 C 38.912359 30.771484 38.945312 33.200891 38.945312 35.087891 L 38.945312 43 L 44 43 L 44 34.074219 C 44 29.692219 43.054594 26.322266 37.933594 26.322266 z M 19.972656 26.728516 L 19.972656 43 L 25.029297 43 L 25.029297 26.728516 L 19.972656 26.728516 z"/>
</svg>`
};

const $$Astro$1 = createAstro("https://xani.me/");
const $$Socials = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Socials;
  const { centered = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute((`social-icons ${centered ? "flex" : ""}` ?? "") + " astro-upu6fzxr", "class")}> ${SOCIALS.filter((social) => social.active).map((social) => renderTemplate`${renderComponent($$result, "LinkButton", $$LinkButton, { "href": social.href, "className": "link-button astro-upu6fzxr", "title": social.linkTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(socialIcons[social.name])}` })} <span class="sr-only astro-upu6fzxr">${social.linkTitle}</span> ` })}`)} </div> `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/Socials.astro", void 0);

const $$Astro = createAstro("https://xani.me/");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const { noMarginTop = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute((`${noMarginTop ? "" : "mt-auto"}` ?? "") + " astro-sz7xmlte", "class")}> ${renderComponent($$result, "Hr", $$Hr, { "noPadding": true, "class": "astro-sz7xmlte" })} <div class="footer-wrapper astro-sz7xmlte"> ${renderComponent($$result, "Socials", $$Socials, { "centered": true, "class": "astro-sz7xmlte" })} <div class="copyright-wrapper astro-sz7xmlte"> <span class="astro-sz7xmlte">Copyright &#169; ${currentYear}</span> <span class="separator astro-sz7xmlte">&nbsp;|&nbsp;</span> <span class="astro-sz7xmlte">All rights reserved.</span> </div> </div> </footer> `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/Footer.astro", void 0);

export { $$Layout as $, $$Header as a, $$LinkButton as b, $$Footer as c, $$Socials as d, $$Hr as e, socialIcons as s };
