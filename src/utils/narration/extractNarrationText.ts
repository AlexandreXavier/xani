export interface NarrationSource {
  title: string;
  /** Raw markdown body of the post, without frontmatter. */
  body: string;
}

/**
 * Turn a blog post into the plain text its Narração speaks.
 *
 * The post title is read first, then the prose. Code blocks are omitted
 * entirely (no spoken placeholder), the auto-generated "Table of contents"
 * heading, images and raw URLs are stripped, and inline code is kept as its
 * literal text. The result is clean, continuous text with no markdown syntax.
 *
 * Pure and deterministic: same input, same output, no I/O.
 */
export function extractNarrationText({ title, body }: NarrationSource): string {
  let text = body;

  // Fenced code blocks (``` or ~~~) — dropped completely.
  text = text.replace(/^[ \t]*(```|~~~)[\s\S]*?^[ \t]*\1[ \t]*$/gm, "");

  // The remark-toc / remark-collapse "Table of contents" heading. The list
  // itself is injected at build time, so only the heading exists in source.
  text = text.replace(/^#{1,6}\s*table of contents.*$/gim, "");

  // Images: ![alt](url) — dropped.
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  // Links: [text](url) — keep the text.
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

  // Inline code: `foo` — keep as foo.
  text = text.replace(/`([^`]+)`/g, "$1");

  // Heading markers — keep the heading text as a sentence.
  text = text.replace(/^#{1,6}\s+/gm, "");

  // Blockquote markers.
  text = text.replace(/^\s*>\s?/gm, "");

  // List markers at the start of a line.
  text = text.replace(/^\s*([-*+]|\d+\.)\s+/gm, "");

  // Emphasis / strikethrough markers.
  text = text.replace(/(\*\*|\*|__|_|~~)/g, "");

  // Raw HTML tags.
  text = text.replace(/<[^>]+>/g, "");

  // Bare URLs.
  text = text.replace(/https?:\/\/\S+/g, "");

  // Collapse whitespace into single-spaced continuous prose.
  text = text
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");

  const cleanTitle = title.trim().replace(/[.!?]+$/, "");
  return `${cleanTitle}. ${text}`.trim();
}
