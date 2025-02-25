import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";

export async function getStaticPaths() {
  const projects = await getCollection("projs").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return projects.map(proj => ({
    params: { slug: slugifyStr(proj.data.title) },
    props: proj,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as CollectionEntry<"blog">), {
    headers: { "Content-Type": "image/png" },
  });
