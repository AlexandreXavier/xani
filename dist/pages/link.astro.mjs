import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { S as SITE } from '../chunks/config_o6LvftIS.mjs';
import { $ as $$Layout, a as $$Header, c as $$Footer } from '../chunks/Footer_CF2xFEDh.mjs';
import { $ as $$Main } from '../chunks/Main_DMd37Tef.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Wrench, Sparkles, Palette, Music, Lock, Globe, Frame, Coins, Code, Cloud, Bug } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const ICON_COMPONENTS = {
  Bug,
  Cloud,
  Code,
  Coins,
  Frame,
  Globe,
  Lock,
  Music,
  Palette,
  Sparkles,
  Wrench
};
function CategoryButton({ category, selected, onClick }) {
  const Icon = category.iconName ? ICON_COMPONENTS[category.iconName] : null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: `w-full rounded border p-3 text-left transition
        ${selected ? "border-skin-accent bg-skin-accent text-skin-inverted" : "border-skin-line bg-skin-card text-skin-base hover:border-skin-accent hover:bg-skin-card-muted"}
        focus-outline`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          Icon ? /* @__PURE__ */ jsx(Icon, { className: "size-5", "aria-hidden": "true" }) : /* @__PURE__ */ jsx("span", { className: "size-5", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: category.name })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `text-sm ${selected ? "text-skin-inverted opacity-80" : "text-skin-base opacity-60"}`, children: category.count })
      ] })
    }
  );
}

const parseUrl = (url, removeSubdomain = false) => {
  const cleaned = url.replace(/^https?:\/\//i, "").replace(/\/+$/g, "");
  const [rawHost, ...pathParts] = cleaned.split("/");
  let host = rawHost;
  host = host.replace(/^www\./i, "");
  if (removeSubdomain) {
    const segments = host.split(".");
    if (segments.length > 2) {
      host = segments.slice(-2).join(".");
    }
  }
  const path = pathParts.join("/");
  return path ? `${host}/${path}` : host;
};
function LinkCard({ link }) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: link.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex gap-4 w-full items-center rounded border border-skin-line\n        bg-skin-card p-4 transition hover:border-skin-accent\n        hover:bg-skin-card-muted focus-outline",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: `https://www.google.com/s2/favicons?domain=${parseUrl(
              link.url,
              true
            )}&sz=128`,
            alt: `${link.name}'s favicon`,
            width: 24,
            height: 24,
            className: "size-6 rounded-sm shrink-0"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:gap-2 sm:items-baseline", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-medium text-skin-base truncate", children: link.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-skin-base opacity-60 truncate", children: parseUrl(link.url) })
          ] }),
          link.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-skin-base opacity-70 line-clamp-2", children: link.description })
        ] })
      ]
    }
  );
}

function LinkManager({ links, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredLinks = selectedCategory === "all" ? links : links.filter((link) => link.category === selectedCategory);
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 sm:flex-row", children: [
    /* @__PURE__ */ jsx("aside", { className: "hidden w-60 shrink-0 sm:block", children: /* @__PURE__ */ jsx("div", { className: "space-y-2", children: categories.map((category) => /* @__PURE__ */ jsx(
      CategoryButton,
      {
        category,
        selected: selectedCategory === category.id,
        onClick: () => setSelectedCategory(category.id)
      },
      category.id
    )) }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 sm:hidden", children: /* @__PURE__ */ jsx(
        "select",
        {
          value: selectedCategory,
          onChange: (e) => setSelectedCategory(e.target.value),
          className: "w-full rounded border border-skin-line bg-skin-card\n                p-3 text-skin-base focus-outline",
          children: categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: `${cat.name} (${cat.count})` }, cat.id))
        }
      ) }),
      filteredLinks.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredLinks.map((link) => /* @__PURE__ */ jsx(LinkCard, { link }, link.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-skin-base opacity-70", children: "No links in this category yet." })
    ] })
  ] }) });
}

var LinkCategory = /* @__PURE__ */ ((LinkCategory2) => {
  LinkCategory2["DESIGN"] = "design";
  LinkCategory2["TOOL"] = "tool";
  LinkCategory2["CLOUD"] = "cloud";
  LinkCategory2["UI"] = "ui";
  LinkCategory2["WEB"] = "web";
  LinkCategory2["CODE"] = "code";
  LinkCategory2["SOUND"] = "sound";
  LinkCategory2["SCRAPY"] = "scrapy";
  LinkCategory2["FINTECH"] = "fintech";
  LinkCategory2["CRYPT"] = "crypt";
  LinkCategory2["INSPIRE"] = "inspire";
  return LinkCategory2;
})(LinkCategory || {});

const CATEGORY_CONFIG = {
  [LinkCategory.DESIGN]: {
    name: "Design",
    iconName: "Palette",
    iconColorClassname: "text-rose-300"
  },
  [LinkCategory.TOOL]: {
    name: "Tool",
    iconName: "Wrench",
    iconColorClassname: "text-sky-300"
  },
  [LinkCategory.CLOUD]: {
    name: "Cloud",
    iconName: "Cloud",
    iconColorClassname: "text-amber-400"
  },
  [LinkCategory.UI]: {
    name: "UI",
    iconName: "Frame",
    iconColorClassname: "text-violet-300"
  },
  [LinkCategory.WEB]: {
    name: "Web",
    iconName: "Globe",
    iconColorClassname: "text-emerald-300"
  },
  [LinkCategory.CODE]: {
    name: "Code",
    iconName: "Code",
    iconColorClassname: "text-indigo-300"
  },
  [LinkCategory.SOUND]: {
    name: "Sound",
    iconName: "Music",
    iconColorClassname: "text-cyan-300"
  },
  [LinkCategory.SCRAPY]: {
    name: "Scraping",
    iconName: "Bug",
    iconColorClassname: "text-lime-300"
  },
  [LinkCategory.FINTECH]: {
    name: "Fintech",
    iconName: "Coins",
    iconColorClassname: "text-amber-500"
  },
  [LinkCategory.CRYPT]: {
    name: "Crypt",
    iconName: "Lock",
    iconColorClassname: "text-purple-400"
  },
  [LinkCategory.INSPIRE]: {
    name: "Inspire",
    iconName: "Sparkles",
    iconColorClassname: "text-pink-300"
  }
};
const LINK_CATEGORIES = [
  {
    id: "all",
    name: "All",
    iconName: null
  },
  ...Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
    id,
    ...config
  }))
];
const LINKS = [
  // Design
  {
    id: "animations-on-the-web",
    name: "Animations on the Web",
    url: "https://animations.dev/learn",
    category: LinkCategory.DESIGN
  },
  {
    id: "devouring-details",
    name: "Devouring Details",
    url: "https://devouringdetails.com",
    category: LinkCategory.DESIGN
  },
  {
    id: "mobbin",
    name: "Mobbin",
    url: "https://mobbin.com",
    category: LinkCategory.DESIGN
  },
  {
    id: "layers",
    name: "Layers",
    url: "https://layers.to",
    category: LinkCategory.DESIGN
  },
  {
    id: "dribbble",
    name: "Dribbble",
    url: "https://dribbble.com",
    category: LinkCategory.DESIGN
  },
  {
    id: "emil-kowalski",
    name: "Emil Kowalski",
    url: "https://emilkowal.ski",
    category: LinkCategory.DESIGN
  },
  {
    id: "uilabs",
    name: "uilabs",
    url: "https://uilabs.dev",
    category: LinkCategory.DESIGN
  },
  {
    id: "vercel-design",
    name: "Vercel Design",
    url: "https://vercel.com/design",
    category: LinkCategory.DESIGN
  },
  {
    id: "coolors",
    name: "Coolors",
    url: "https://coolors.co/palettes",
    category: LinkCategory.DESIGN
  },
  {
    id: "pigment",
    name: "Pigment",
    url: "https://pigment.shapefactory.co",
    category: LinkCategory.DESIGN
  },
  {
    id: "web-gradients",
    name: "WebGradients",
    url: "https://webgradients.com",
    category: LinkCategory.DESIGN
  },
  {
    id: "eggradients",
    name: "Eggradients",
    url: "https://eggradients.com",
    category: LinkCategory.DESIGN
  },
  {
    id: "svg-generator",
    name: "SVG generator",
    url: "https://fffuel.co",
    category: LinkCategory.DESIGN
  },
  {
    id: "magic-pattern",
    name: "MagicPattern",
    url: "https://www.magicpattern.design",
    category: LinkCategory.DESIGN
  },
  {
    id: "making-software",
    name: "Making Software",
    url: "https://www.makingsoftware.com",
    category: LinkCategory.DESIGN
  },
  {
    id: "ezgif",
    name: "EZGIF",
    url: "https://ezgif.com/",
    category: LinkCategory.DESIGN
  },
  {
    id: "reve",
    name: "Reve",
    url: "https://app.reve.com/",
    category: LinkCategory.DESIGN
  },
  // Tool
  {
    id: "clawd",
    name: "Clawd",
    url: "https://clawd.bot/",
    category: LinkCategory.TOOL
  },
  {
    id: "v0",
    name: "v0",
    url: "https://v0.dev",
    category: LinkCategory.TOOL
  },
  {
    id: "grep",
    name: "Grep",
    url: "https://grep.app",
    category: LinkCategory.TOOL
  },
  {
    id: "tailwind-play",
    name: "Tailwind Play",
    url: "https://play.tailwindcss.com",
    category: LinkCategory.TOOL
  },
  {
    id: "code-pen",
    name: "CodePen",
    url: "https://codepen.io",
    category: LinkCategory.TOOL
  },
  {
    id: "json-crack",
    name: "JSON Crack",
    url: "https://jsoncrack.com",
    category: LinkCategory.TOOL
  },
  {
    id: "animate-code",
    name: "AnimateCode",
    url: "https://www.animate-code.com",
    category: LinkCategory.TOOL
  },
  {
    id: "github-star-history",
    name: "GitHub Star History",
    url: "https://www.star-history.com",
    category: LinkCategory.TOOL
  },
  {
    id: "svgl",
    name: "svgl",
    url: "https://svgl.app",
    category: LinkCategory.TOOL
  },
  {
    id: "snappify",
    name: "snappify",
    url: "https://snappify.com",
    category: LinkCategory.TOOL
  },
  {
    id: "ray-so",
    name: "ray.so",
    url: "https://ray.so",
    category: LinkCategory.TOOL
  },
  {
    id: "teachable-machine",
    name: "Teachable Machine",
    url: "https://teachablemachine.withgoogle.com",
    category: LinkCategory.TOOL
  },
  {
    id: "replit",
    name: "Replit",
    url: "https://replit.com",
    category: LinkCategory.TOOL
  },
  {
    id: "hero-patterns",
    name: "Hero Patterns",
    url: "https://heropatterns.com",
    category: LinkCategory.TOOL
  },
  {
    id: "lucide",
    name: "Lucide",
    url: "https://lucide.dev",
    category: LinkCategory.TOOL
  },
  {
    id: "crontab-guru",
    name: "crontab guru",
    url: "https://crontab.guru",
    category: LinkCategory.TOOL
  },
  {
    id: "css-hd-gradients",
    name: "CSS HD Gradients",
    url: "https://gradient.style",
    category: LinkCategory.TOOL
  },
  {
    id: "tailwind-css-cheat-sheet",
    name: "Tailwind CSS Cheat Sheet",
    url: "https://nerdcave.com/tailwind-cheat-sheet",
    category: LinkCategory.TOOL
  },
  {
    id: "tree",
    name: "Tree",
    url: "https://tree.nathanfriend.com",
    category: LinkCategory.TOOL
  },
  {
    id: "page-speed-insights",
    name: "PageSpeed Insights",
    url: "https://pagespeed.web.dev",
    category: LinkCategory.TOOL
  },
  {
    id: "video-transcriber",
    name: "Video Transcriber",
    url: "https://videotranscriber.ai",
    category: LinkCategory.TOOL
  },
  {
    id: "dub",
    name: "Dub",
    url: "https://app.dub.co/login?next=%2Fcasadocanto%2Flinks",
    category: LinkCategory.TOOL
  },
  {
    id: "ramp",
    name: "Ramp",
    url: "https://labs.ramp.com/sheets",
    category: LinkCategory.TOOL
  },
  {
    id: "clarity",
    name: "Clarity",
    url: "https://clarity.rahul.gs/",
    category: LinkCategory.TOOL
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    url: "https://excalidraw.com/",
    category: LinkCategory.TOOL
  },
  {
    id: "t3-chat",
    name: "T3 Chat",
    url: "https://t3.chat/",
    category: LinkCategory.TOOL
  },
  // Cloud
  {
    id: "upstash",
    name: "Upstash",
    url: "https://console.upstash.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "trigger-dev",
    name: "Trigger.dev",
    url: "https://cloud.trigger.dev",
    category: LinkCategory.CLOUD
  },
  {
    id: "cloudways",
    name: "Cloudways",
    url: "https://unified.cloudways.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "go-daddy",
    name: "GoDaddy",
    url: "https://tw.godaddy.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "azure",
    name: "Azure",
    url: "https://portal.azure.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "gcp",
    name: "GCP",
    url: "https://console.cloud.google.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "planet-scale",
    name: "PlanetScale",
    url: "https://app.planetscale.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "neon",
    name: "Neon",
    url: "https://console.neon.tech",
    category: LinkCategory.CLOUD
  },
  {
    id: "clerk",
    name: "Clerk",
    url: "https://dashboard.clerk.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "resend",
    name: "Resend",
    url: "https://resend.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "laravel-cloud",
    name: "Laravel Cloud",
    url: "https://cloud.laravel.com",
    category: LinkCategory.CLOUD
  },
  {
    id: "hostinger-auth",
    name: "Hostinger Auth",
    url: "https://auth.hostinger.com/login",
    category: LinkCategory.CLOUD
  },
  // UI
  {
    id: "remotion",
    name: "Remotion",
    url: "https://www.remotion.dev/",
    category: LinkCategory.UI
  },
  {
    id: "shadcn-ui",
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: LinkCategory.UI
  },
  {
    id: "tweakcn",
    name: "TweakCN",
    url: "https://tweakcn.com/",
    category: LinkCategory.UI
  },
  {
    id: "tailark",
    name: "Tailark",
    url: "https://tailark.com/",
    category: LinkCategory.UI
  },
  {
    id: "daisy-ui",
    name: "daisyUI",
    url: "https://daisyui.com",
    category: LinkCategory.UI
  },
  {
    id: "aceternity-ui",
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    category: LinkCategory.UI
  },
  {
    id: "magic-ui",
    name: "Magic UI",
    url: "https://magicui.design",
    category: LinkCategory.UI
  },
  {
    id: "catalyst-ui",
    name: "Catalyst UI",
    url: "https://catalyst.tailwindui.com",
    category: LinkCategory.UI
  },
  {
    id: "react-spectrum",
    name: "React Spectrum",
    url: "https://react-spectrum.adobe.com",
    category: LinkCategory.UI
  },
  {
    id: "origin-ui",
    name: "Origin UI",
    url: "https://originui.com",
    category: LinkCategory.UI
  },
  {
    id: "fancy-components",
    name: "Fancy Components",
    url: "https://www.fancycomponents.dev",
    category: LinkCategory.UI
  },
  {
    id: "pattern-craft",
    name: "PatternCraft",
    url: "https://patterncraft.fun",
    category: LinkCategory.UI
  },
  {
    id: "gsap",
    name: "GSAP",
    url: "https://gsap.com/",
    category: LinkCategory.UI
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    url: "https://www.framer.com/motion",
    category: LinkCategory.UI
  },
  // Web
  {
    id: "higgsfield",
    name: "Higgsfield",
    url: "https://higgsfield.ai",
    category: LinkCategory.WEB
  },
  {
    id: "hudson-rock",
    name: "Hudson Rock",
    url: "https://hudsonrock.com",
    category: LinkCategory.WEB
  },
  {
    id: "ssl-labs-test",
    name: "SSL Labs Test",
    url: "https://ssllabs.com",
    category: LinkCategory.WEB
  },
  {
    id: "virus-total",
    name: "Virus Total",
    url: "https://virustotal.com",
    category: LinkCategory.WEB
  },
  {
    id: "shodan",
    name: "Shodan",
    url: "https://shodan.io",
    category: LinkCategory.WEB
  },
  {
    id: "archive",
    name: "Archive",
    url: "https://archive.org",
    category: LinkCategory.WEB
  },
  {
    id: "urlscan",
    name: "URLScan",
    url: "https://urlscan.io",
    category: LinkCategory.WEB
  },
  {
    id: "sucuri-sitecheck",
    name: "Sucuri SiteCheck",
    url: "https://sitecheck.sucuri.net",
    category: LinkCategory.WEB
  },
  {
    id: "domain-tools",
    name: "Domain Tools",
    url: "https://whois.domaintools.com",
    category: LinkCategory.WEB
  },
  {
    id: "ns-lookup",
    name: "NS Lookup",
    url: "https://nslookup.io",
    category: LinkCategory.WEB
  },
  {
    id: "dns-checker",
    name: "DNS Checker",
    url: "https://dnschecker.org",
    category: LinkCategory.WEB
  },
  {
    id: "censys",
    name: "Censys",
    url: "https://search.censys.io",
    category: LinkCategory.WEB
  },
  {
    id: "page-speed-insights-web",
    name: "Page Speed Insights",
    url: "https://developers.google.com/speed/pagespeed/insights",
    category: LinkCategory.WEB
  },
  {
    id: "built-with",
    name: "Built With",
    url: "https://builtwith.com",
    category: LinkCategory.WEB
  },
  {
    id: "dns-dumpster",
    name: "DNS Dumpster",
    url: "https://dnsdumpster.com",
    category: LinkCategory.WEB
  },
  {
    id: "bgp-tools",
    name: "BGP Tools",
    url: "https://bgp.tools",
    category: LinkCategory.WEB
  },
  {
    id: "similar-web",
    name: "Similar Web",
    url: "https://similarweb.com",
    category: LinkCategory.WEB
  },
  {
    id: "blacklist-checker",
    name: "Blacklist Checker",
    url: "https://blacklistchecker.com",
    category: LinkCategory.WEB
  },
  {
    id: "cloudflare-radar",
    name: "Cloudflare Radar",
    url: "https://radar.cloudflare.com",
    category: LinkCategory.WEB
  },
  {
    id: "mozilla-http-observatory",
    name: "Mozilla HTTP Observatory",
    url: "https://developer.mozilla.org/en-US/observatory",
    category: LinkCategory.WEB
  },
  {
    id: "abuseipdb",
    name: "AbuseIPDB",
    url: "https://abuseipdb.com",
    category: LinkCategory.WEB
  },
  {
    id: "ibm-x-force-exchange",
    name: "IBM X-Force Exchange",
    url: "https://exchange.xforce.ibmcloud.com",
    category: LinkCategory.WEB
  },
  {
    id: "urlvoid",
    name: "URLVoid",
    url: "https://urlvoid.com",
    category: LinkCategory.WEB
  },
  {
    id: "urlhaus",
    name: "URLhaus",
    url: "https://urlhaus.abuse.ch",
    category: LinkCategory.WEB
  },
  {
    id: "any-run",
    name: "ANY.RUN",
    url: "https://any.run",
    category: LinkCategory.WEB
  },
  {
    id: "product-hunt",
    name: "Product Hunt",
    url: "https://www.producthunt.com/",
    category: LinkCategory.WEB
  },
  {
    id: "web-check",
    name: "Web Check",
    url: "https://web-check.xyz/",
    category: LinkCategory.WEB
  },
  // Code
  {
    id: "better-t-stack",
    name: "Better T Stack",
    url: "https://www.better-t-stack.dev/new",
    category: LinkCategory.CODE
  },
  {
    id: "skillsmp",
    name: "SkillsMP",
    url: "https://skillsmp.com/",
    category: LinkCategory.CODE
  },
  {
    id: "tinyprd",
    name: "TinyPRD",
    url: "https://www.tinyprd.app/",
    category: LinkCategory.CODE
  },
  {
    id: "aimpl",
    name: "AIMPL",
    url: "https://www.aitmpl.com/trending.html",
    category: LinkCategory.CODE
  },
  {
    id: "skills-sh",
    name: "Skills.sh",
    url: "https://skills.sh/",
    category: LinkCategory.CODE
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    url: "https://huggingface.co/",
    category: LinkCategory.CODE
  },
  // Sound
  {
    id: "loudly",
    name: "Loudly",
    url: "https://www.loudly.com/",
    category: LinkCategory.SOUND
  },
  {
    id: "splice",
    name: "Splice",
    url: "https://splice.com/",
    category: LinkCategory.SOUND
  },
  {
    id: "aiva",
    name: "AIVA",
    url: "https://www.aiva.ai/",
    category: LinkCategory.SOUND
  },
  {
    id: "cloudconvert",
    name: "CloudConvert",
    url: "https://cloudconvert.com/",
    category: LinkCategory.SOUND
  },
  // Scrapy
  {
    id: "scrapy-docs",
    name: "Scrapy Docs",
    url: "https://docs.scrapy.org/en/latest/",
    category: LinkCategory.SCRAPY
  },
  {
    id: "zyte",
    name: "Zyte",
    url: "https://www.zyte.com/",
    category: LinkCategory.SCRAPY
  },
  {
    id: "scrapfly",
    name: "Scrapfly",
    url: "https://www.scrapfly.io/",
    category: LinkCategory.SCRAPY
  },
  {
    id: "firecrawl",
    name: "firecrawl",
    url: "https://www.firecrawl.dev/",
    category: LinkCategory.SCRAPY
  },
  {
    id: "jina-ai",
    name: "Jina AI",
    url: "https://jina.ai/",
    category: LinkCategory.SCRAPY
  },
  {
    id: "brightdata",
    name: "BrightData",
    url: "https://brightdata.com/cp/start",
    category: LinkCategory.SCRAPY
  },
  // Sound
  {
    id: "segment-anything",
    name: "Segment Anything",
    url: "https://aidemos.meta.com/segment-anything/editor/segment-audio",
    category: LinkCategory.SOUND
  },
  // FinTech
  {
    id: "fin-tech",
    name: "FinTech",
    url: "https://fin-tech.com",
    category: LinkCategory.FINTECH
  },
  {
    id: "ai-startup-data",
    name: "AI Startup Data",
    url: "https://aistartupdata.com/",
    category: LinkCategory.FINTECH
  },
  {
    id: "financial-datasets",
    name: "Financial Datasets",
    url: "https://www.financialdatasets.ai/",
    category: LinkCategory.FINTECH
  },
  {
    id: "dexter",
    name: "Dexter",
    url: "https://github.com/virattt/dexter",
    category: LinkCategory.FINTECH
  },
  //crypt
  {
    id: "bitcoinheiros",
    name: "Bitcoin Heiros",
    url: "https://bitcoinheiros.com/",
    category: LinkCategory.CRYPT
  },
  {
    id: "nostr",
    name: "Nostr",
    url: "https://nostr.co.uk/",
    category: LinkCategory.CRYPT
  },
  //Inspire
  {
    id: "radio-botareu",
    name: "Radio Botareu",
    url: "https://radio.garden/listen/radio-botareu/nZ6s23-G",
    category: LinkCategory.INSPIRE
  },
  {
    id: "microsculpture",
    name: "Microsculpture",
    url: "https://microsculpture.net/",
    category: LinkCategory.INSPIRE
  }
];
function getCategoriesWithCount(linkItems = LINKS) {
  const counts = linkItems.reduce((acc, link) => {
    acc[link.category] = (acc[link.category] || 0) + 1;
    return acc;
  }, {});
  return LINK_CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.id === "all" ? linkItems.length : counts[cat.id] || 0
  }));
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const categories = getCategoriesWithCount();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Link | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "link" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Link", "pageDesc": "Curated collection of useful links and resources." }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "LinkManager", LinkManager, { "links": LINKS, "categories": categories, "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/LinkManager", "client:component-export": "default" })} ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/link/index.astro", void 0);

const $$file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/link/index.astro";
const $$url = "/link";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
