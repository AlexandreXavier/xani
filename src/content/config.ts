import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      language: z.enum(["pt", "en"]).default("en"),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

// The estudo/code/vela "Note collections" share one shape and differ only in
// their default tag (see CONTEXT.md → "Note collection"). One factory keeps the
// shared shape in a single place; adding a note section is a one-line call.
const makeNoteCollection = (defaultTag: string) =>
  defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([defaultTag]),
      language: z.enum(["pt", "en"]).default("pt"),
      draft: z.boolean().optional(),
    }),
  });

const estudo = makeNoteCollection("direito");
const code = makeNoteCollection("code");
const vela = makeNoteCollection("vela");

export const collections = { blog, estudo, code, vela };
