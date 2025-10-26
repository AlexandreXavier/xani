import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImages";

export const GET: APIRoute = async () => {
  const buffer = await generateOgImageForSite();
  
  // Create a Response with the Buffer using a type assertion
  return new Response(buffer as unknown as BodyInit, {
    headers: { 
      'Content-Type': 'image/png',
      'Content-Length': buffer.length.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
