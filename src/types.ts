import type socialIcons from "@assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export enum LinkCategory {
  DESIGN = 'design',
  TOOL = 'tool',
  CLOUD = 'cloud',
  UI = 'ui',
  WEB = 'web',
  CODE = 'code',
  SOUND = 'sound',
  SCRAPY = 'scrapy',
  FINTECH = 'fintech',
  CRYPT = 'crypt',
}

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  description?: string;
  category: LinkCategory;
}

