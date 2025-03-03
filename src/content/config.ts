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

const episodeSchema = z.object({
  title: z.string(),
  audioUrl: z.string(),
  pubDate: z.coerce.date().optional(),
  cover: z.string().optional(),
  draft: z.boolean().optional(),
  explicit: z.boolean().optional(),
  episode: z.number().optional(),
  season: z.number().optional(),
  episodeType: z.string().optional(),
  duration: z.coerce.string(), //duration in format hh:mm:ss
  size: z.number(), // size in megabytes
});

export type episodeSchema = z.infer<typeof episodeSchema>;

export const episodeCollection = defineCollection({ schema: episodeSchema });

export const collections = { blog,'episode': episodeCollection, };
