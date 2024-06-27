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
    name: "Github",
    href: "https://AlexandreXavier/xani.git",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/alexandre.xavier.porto",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/josealexandrexavier/",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/@alexand",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:jalexandre.xavier@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
];
