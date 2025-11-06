import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@contexts/LanguageContext";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, language = "en" } = frontmatter;
  const { language: currentLanguage } = useLanguage();

  if (language !== currentLanguage) {
    return null;
  }

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6 relative">
      <div className="absolute top-0 right-0 z-10">
        <LanguageToggle showLabel={false} className="text-xs" />
      </div>
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <p>{description}</p>
    </li>
  );
}
