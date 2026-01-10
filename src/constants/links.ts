import type { LinkItem } from "@/types";
import { LinkCategory } from "@/types";

export interface Link {
  id: string;
  name: string;
  url: string;
}

export type CategoryIconName =
  | 'Palette'
  | 'Wrench'
  | 'Cloud'
  | 'Frame'
  | 'Globe'
  | 'Code'
  | 'Music'
  | 'Bug'
  | 'Coins';

export interface CategoryInfo {
  id: LinkCategory;
  name: string;
  iconName: CategoryIconName;
  iconColorClassname?: string;
}

export const CATEGORY_CONFIG: Record<LinkCategory, Omit<CategoryInfo, 'id'>> = {
  [LinkCategory.DESIGN]: {
    name: 'Design',
    iconName: 'Palette',
    iconColorClassname: 'text-rose-300',
  },
  [LinkCategory.TOOL]: {
    name: 'Tool',
    iconName: 'Wrench',
    iconColorClassname: 'text-sky-300',
  },
  [LinkCategory.CLOUD]: {
    name: 'Cloud',
    iconName: 'Cloud',
    iconColorClassname: 'text-amber-400',
  },
  [LinkCategory.UI]: {
    name: 'UI',
    iconName: 'Frame',
    iconColorClassname: 'text-violet-300',
  },
  [LinkCategory.WEB]: {
    name: 'Web',
    iconName: 'Globe',
    iconColorClassname: 'text-emerald-300',
  },
  [LinkCategory.CODE]: {
    name: 'Code',
    iconName: 'Code',
    iconColorClassname: 'text-indigo-300',
  },
  [LinkCategory.SOUND]: {
    name: 'Sound',
    iconName: 'Music',
    iconColorClassname: 'text-cyan-300',
  },
  [LinkCategory.SCRAPY]: {
    name: 'Scraping',
    iconName: 'Bug',
    iconColorClassname: 'text-lime-300',
  },
  [LinkCategory.FINTECH]: {
    name: 'Fintech',
    iconName: 'Coins',
    iconColorClassname: 'text-amber-500',
  },
};

export type LinkCategoryOption = {
  id: string;
  name: string;
  iconName: CategoryIconName | null;
  iconColorClassname?: string;
};

export const LINK_CATEGORIES: LinkCategoryOption[] = [
  {
    id: 'all',
    name: 'All',
    iconName: null,
  },
  ...Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
    id,
    ...config,
  })),
];

export type LinkCategoryWithCount = LinkCategoryOption & { count: number };


export const LINKS: LinkItem[] = [
   // Design
  {
    id: 'animations-on-the-web',
    name: 'Animations on the Web',
    url: 'https://animations.dev/learn',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'devouring-details',
    name: 'Devouring Details',
    url: 'https://devouringdetails.com',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'mobbin',
    name: 'Mobbin',
    url: 'https://mobbin.com',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'layers',
    name: 'Layers',
    url: 'https://layers.to',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'emil-kowalski',
    name: 'Emil Kowalski',
    url: 'https://emilkowal.ski',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'uilabs',
    name: 'uilabs',
    url: 'https://uilabs.dev',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'vercel-design',
    name: 'Vercel Design',
    url: 'https://vercel.com/design',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'coolors',
    name: 'Coolors',
    url: 'https://coolors.co/palettes',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'pigment',
    name: 'Pigment',
    url: 'https://pigment.shapefactory.co',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'web-gradients',
    name: 'WebGradients',
    url: 'https://webgradients.com',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'eggradients',
    name: 'Eggradients',
    url: 'https://eggradients.com',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'svg-generator',
    name: 'SVG generator',
    url: 'https://fffuel.co',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'magic-pattern',
    name: 'MagicPattern',
    url: 'https://www.magicpattern.design',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'making-software',
    name: 'Making Software',
    url: 'https://www.makingsoftware.com',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'ezgif',
    name: 'EZGIF',
    url: 'https://ezgif.com/',
    category: LinkCategory.DESIGN,
  },
  {
    id: 'reve',
    name: 'Reve',
    url: 'https://app.reve.com/',
    category: LinkCategory.DESIGN,
  },

  // Tool
  {
    id: 'v0',
    name: 'v0',
    url: 'https://v0.dev',
    category: LinkCategory.TOOL,
  },
  {
    id: 'grep',
    name: 'Grep',
    url: 'https://grep.app',
    category: LinkCategory.TOOL,
  },
  {
    id: 'tailwind-play',
    name: 'Tailwind Play',
    url: 'https://play.tailwindcss.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'code-pen',
    name: 'CodePen',
    url: 'https://codepen.io',
    category: LinkCategory.TOOL,
  },
  {
    id: 'json-crack',
    name: 'JSON Crack',
    url: 'https://jsoncrack.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'animate-code',
    name: 'AnimateCode',
    url: 'https://www.animate-code.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'github-star-history',
    name: 'GitHub Star History',
    url: 'https://www.star-history.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'svgl',
    name: 'svgl',
    url: 'https://svgl.app',
    category: LinkCategory.TOOL,
  },
  {
    id: 'snappify',
    name: 'snappify',
    url: 'https://snappify.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'ray-so',
    name: 'ray.so',
    url: 'https://ray.so',
    category: LinkCategory.TOOL,
  },
  {
    id: 'teachable-machine',
    name: 'Teachable Machine',
    url: 'https://teachablemachine.withgoogle.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'replit',
    name: 'Replit',
    url: 'https://replit.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'hero-patterns',
    name: 'Hero Patterns',
    url: 'https://heropatterns.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'lucide',
    name: 'Lucide',
    url: 'https://lucide.dev',
    category: LinkCategory.TOOL,
  },
  {
    id: 'crontab-guru',
    name: 'crontab guru',
    url: 'https://crontab.guru',
    category: LinkCategory.TOOL,
  },
  {
    id: 'css-hd-gradients',
    name: 'CSS HD Gradients',
    url: 'https://gradient.style',
    category: LinkCategory.TOOL,
  },
  {
    id: 'tailwind-css-cheat-sheet',
    name: 'Tailwind CSS Cheat Sheet',
    url: 'https://nerdcave.com/tailwind-cheat-sheet',
    category: LinkCategory.TOOL,
  },
  {
    id: 'tree',
    name: 'Tree',
    url: 'https://tree.nathanfriend.com',
    category: LinkCategory.TOOL,
  },
  {
    id: 'page-speed-insights',
    name: 'PageSpeed Insights',
    url: 'https://pagespeed.web.dev',
    category: LinkCategory.TOOL,
  },
  {
    id: 'video-transcriber',
    name: 'Video Transcriber',
    url: 'https://videotranscriber.ai',
    category: LinkCategory.TOOL,
  },
  
  {
    id: 'dub',
    name: 'Dub',
    url: 'https://app.dub.co/login?next=%2Fcasadocanto%2Flinks',
    category: LinkCategory.TOOL,
  },

  // Cloud
  {
    id: 'upstash',
    name: 'Upstash',
    url: 'https://console.upstash.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'trigger-dev',
    name: 'Trigger.dev',
    url: 'https://cloud.trigger.dev',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'cloudways',
    name: 'Cloudways',
    url: 'https://unified.cloudways.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'go-daddy',
    name: 'GoDaddy',
    url: 'https://tw.godaddy.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'azure',
    name: 'Azure',
    url: 'https://portal.azure.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'gcp',
    name: 'GCP',
    url: 'https://console.cloud.google.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'planet-scale',
    name: 'PlanetScale',
    url: 'https://app.planetscale.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'neon',
    name: 'Neon',
    url: 'https://console.neon.tech',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'clerk',
    name: 'Clerk',
    url: 'https://dashboard.clerk.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'resend',
    name: 'Resend',
    url: 'https://resend.com',
    category: LinkCategory.CLOUD,
  },
  {
    id: 'laravel-cloud',
    name: 'Laravel Cloud',
    url: 'https://cloud.laravel.com',
    category: LinkCategory.CLOUD,
  },

  // UI
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    url: 'https://ui.shadcn.com',
    category: LinkCategory.UI,
  },
  {
    id: 'tweakcn',
    name: 'TweakCN',
    url: 'https://tweakcn.com/',
    category: LinkCategory.UI,
  },
  {
    id: 'daisy-ui',
    name: 'daisyUI',
    url: 'https://daisyui.com',
    category: LinkCategory.UI,
  },
  {
    id: 'aceternity-ui',
    name: 'Aceternity UI',
    url: 'https://ui.aceternity.com',
    category: LinkCategory.UI,
  },
  {
    id: 'magic-ui',
    name: 'Magic UI',
    url: 'https://magicui.design',
    category: LinkCategory.UI,
  },
  {
    id: 'catalyst-ui',
    name: 'Catalyst UI',
    url: 'https://catalyst.tailwindui.com',
    category: LinkCategory.UI,
  },
  {
    id: 'react-spectrum',
    name: 'React Spectrum',
    url: 'https://react-spectrum.adobe.com',
    category: LinkCategory.UI,
  },
  {
    id: 'origin-ui',
    name: 'Origin UI',
    url: 'https://originui.com',
    category: LinkCategory.UI,
  },
  {
    id: 'fancy-components',
    name: 'Fancy Components',
    url: 'https://www.fancycomponents.dev',
    category: LinkCategory.UI,
  },
  {
    id: 'pattern-craft',
    name: 'PatternCraft',
    url: 'https://patterncraft.fun',
    category: LinkCategory.UI,
  },
  {
    id: 'gsap',
    name: 'GSAP',
    url: 'https://gsap.com/',
    category: LinkCategory.UI,
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    url: 'https://www.framer.com/motion',
    category: LinkCategory.UI,
  },

  // Web
  {
    id: 'web-check',
    name: 'Web Check',
    url: 'https://web-check.xyz',
    category: LinkCategory.WEB,
  },
  {
    id: 'hudson-rock',
    name: 'Hudson Rock',
    url: 'https://hudsonrock.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'ssl-labs-test',
    name: 'SSL Labs Test',
    url: 'https://ssllabs.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'virus-total',
    name: 'Virus Total',
    url: 'https://virustotal.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'shodan',
    name: 'Shodan',
    url: 'https://shodan.io',
    category: LinkCategory.WEB,
  },
  {
    id: 'archive',
    name: 'Archive',
    url: 'https://archive.org',
    category: LinkCategory.WEB,
  },
  {
    id: 'urlscan',
    name: 'URLScan',
    url: 'https://urlscan.io',
    category: LinkCategory.WEB,
  },
  {
    id: 'sucuri-sitecheck',
    name: 'Sucuri SiteCheck',
    url: 'https://sitecheck.sucuri.net',
    category: LinkCategory.WEB,
  },
  {
    id: 'domain-tools',
    name: 'Domain Tools',
    url: 'https://whois.domaintools.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'ns-lookup',
    name: 'NS Lookup',
    url: 'https://nslookup.io',
    category: LinkCategory.WEB,
  },
  {
    id: 'dns-checker',
    name: 'DNS Checker',
    url: 'https://dnschecker.org',
    category: LinkCategory.WEB,
  },
  {
    id: 'censys',
    name: 'Censys',
    url: 'https://search.censys.io',
    category: LinkCategory.WEB,
  },
  {
    id: 'page-speed-insights-web',
    name: 'Page Speed Insights',
    url: 'https://developers.google.com/speed/pagespeed/insights',
    category: LinkCategory.WEB,
  },
  {
    id: 'built-with',
    name: 'Built With',
    url: 'https://builtwith.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'dns-dumpster',
    name: 'DNS Dumpster',
    url: 'https://dnsdumpster.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'bgp-tools',
    name: 'BGP Tools',
    url: 'https://bgp.tools',
    category: LinkCategory.WEB,
  },
  {
    id: 'similar-web',
    name: 'Similar Web',
    url: 'https://similarweb.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'blacklist-checker',
    name: 'Blacklist Checker',
    url: 'https://blacklistchecker.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'cloudflare-radar',
    name: 'Cloudflare Radar',
    url: 'https://radar.cloudflare.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'mozilla-http-observatory',
    name: 'Mozilla HTTP Observatory',
    url: 'https://developer.mozilla.org/en-US/observatory',
    category: LinkCategory.WEB,
  },
  {
    id: 'abuseipdb',
    name: 'AbuseIPDB',
    url: 'https://abuseipdb.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'ibm-x-force-exchange',
    name: 'IBM X-Force Exchange',
    url: 'https://exchange.xforce.ibmcloud.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'urlvoid',
    name: 'URLVoid',
    url: 'https://urlvoid.com',
    category: LinkCategory.WEB,
  },
  {
    id: 'urlhaus',
    name: 'URLhaus',
    url: 'https://urlhaus.abuse.ch',
    category: LinkCategory.WEB,
  },
  {
    id: 'any-run',
    name: 'ANY.RUN',
    url: 'https://any.run',
    category: LinkCategory.WEB,
  },

   // Code
  {
    id: 'better-t-stack',
    name: 'Better T Stack',
    url: 'https://www.better-t-stack.dev/new',
    category: LinkCategory.CODE,
  },
  {
    id: 'skillsmp',
    name: 'SkillsMP',
    url: 'https://skillsmp.com/',
    category: LinkCategory.CODE,
  }

  // Sound
  {
    id: 'loudly',
    name: 'Loudly',
    url: 'https://www.loudly.com/',
    category: LinkCategory.SOUND,
  },
  {
    id: 'splice',
    name: 'Splice',
    url: 'https://splice.com/',
    category: LinkCategory.SOUND,
  },
  {
    id: 'aiva',
    name: 'AIVA',
    url: 'https://www.aiva.ai/',
    category: LinkCategory.SOUND,
  },

  // Scrapy
  {
    id: 'scrapy-docs',
    name: 'Scrapy Docs',
    url: 'https://docs.scrapy.org/en/latest/',
    category: LinkCategory.SCRAPY,
  },
  {
    id: 'zyte',
    name: 'Zyte',
    url: 'https://www.zyte.com/',
    category: LinkCategory.SCRAPY,
  },
  {
    id: 'scrapfly',
    name: 'Scrapfly',
    url: 'https://www.scrapfly.io/',
    category: LinkCategory.SCRAPY,
  },
  {
    id: 'firecrawl',
    name: 'firecrawl',
    url: 'https://www.firecrawl.dev/',
    category: LinkCategory.SCRAPY,
  },
  {
    id: 'jina-ai',
    name: 'Jina AI',
    url: 'https://jina.ai/',
    category: LinkCategory.SCRAPY,
  },
  {
    id: 'brightdata',
    name: 'BrightData',
    url: 'https://brightdata.com/cp/start',
    category: LinkCategory.SCRAPY,
  },

  // Sound
  {
    id: 'segment-anything',
    name: 'Segment Anything',
    url: 'https://aidemos.meta.com/segment-anything/editor/segment-audio',
    category: LinkCategory.SOUND,
  },

  // FinTech
  {
    id: 'fin-tech',
    name: 'FinTech',
    url: 'https://fin-tech.com',
    category: LinkCategory.FINTECH,
  },
  {
    id: 'ai-startup-data',
    name: 'AI Startup Data',
    url: 'https://aistartupdata.com/',
    category: LinkCategory.FINTECH,
  },
  {
    id: 'financial-datasets',
    name: 'Financial Datasets',
    url: 'https://www.financialdatasets.ai/',
    category: LinkCategory.FINTECH,
  },
  {
    id: 'dexter',
    name: 'Dexter',
    url: 'https://github.com/virattt/dexter',
    category: LinkCategory.FINTECH,
  },
];

// Helper function to get categories with link counts
export function getCategoriesWithCount(linkItems: LinkItem[] = LINKS): LinkCategoryWithCount[] {
  const counts = linkItems.reduce((acc, link) => {
    acc[link.category] = (acc[link.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return LINK_CATEGORIES.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? linkItems.length : (counts[cat.id] || 0),
  }));
}

// Helper to get links by category
export function getLinksByCategory(categoryId: string): LinkItem[] {
  if (categoryId === 'all') return LINKS;
  return LINKS.filter(link => link.category === categoryId);
}
