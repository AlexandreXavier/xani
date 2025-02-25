import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://xani.pt/", // replace this with your deployed domain
  author: "Alexandre Xavier",
  desc: "My Personal Web Site.",
  title: "Alexandre Xavier",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Twitter",
    href: "https://twitter.com/@alexandxavier",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Github",
    href: "https://github.com/AlexandreXavier/xani.git",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/josealexandrexavier/",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/alexandre.xavier.porto",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Soundcloud",
    href: "https://soundcloud.com/jaax",
    linkTitle: `${SITE.title} on Soundcloud`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:jalexandre.xavier@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/alexandre-xavier-967a4a15/",
    linkTitle: `${SITE.title} on Linkedin`,
    active: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/351965458663",
    linkTitle: `${SITE.title} on Whatsapp`,
    active: true,
  }
  
];

export const PROJECTS = [
  {
    name: "Spotifu Music",
    summary: "A music streaming app that emulates Spotify's core features.",
    linkPreview: "/",
    linkSource: "https://github.com/immois/astro-zen",
    image: "/spotifu.png",
  },
  {
    name: "Shopp App",
    summary: "An e-commerce platform that replicates Shopify's key features.",
    linkPreview: "/",
    linkSource: "https://github.com/immois/astro-zen",
    image: "/shopify-clon.png",
  },
  {
    name: "ClonTagram",
    summary: "A social network that replicates the features of Instagram",
    linkPreview: "/",
    linkSource: "https://github.com/immois/astro-zen",
    image: "/clone-ig.png",
  },
];


