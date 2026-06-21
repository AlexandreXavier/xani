/**
 * Pre-generate the Narração (spoken-word MP3) for each blog Post.
 *
 * Run manually at publish time: `npm run tts` (add `--force` to regenerate
 * everything). It reads the `blog` collection, extracts each post's spoken
 * text, and (re)generates only the posts that are new or whose text changed
 * (tracked by hash in public/audio/manifest.json). MP3s are written to
 * public/audio/<slug>.mp3 and served as static files.
 *
 * Until a TTS provider is wired into synthesize.ts this runs as a dry run,
 * printing what it would generate. Deliberately NOT part of `astro build`.
 */
import {
  readdirSync,
  readFileSync,
  existsSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { join, extname, basename } from "node:path";
import matter from "gray-matter";
import { extractNarrationText } from "../src/utils/narration/extractNarrationText";
import {
  planNarration,
  hashNarrationText,
  type NarrationManifest,
  type NarrationPost,
} from "../src/utils/narration/narrationManifest";
import { getTtsAdapter, VOICE_ID } from "../src/utils/narration/synthesize";

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, "src/content/blog");
const AUDIO_DIR = join(ROOT, "public/audio");
const MANIFEST_PATH = join(AUDIO_DIR, "manifest.json");

const force = process.argv.includes("--force");

const audioPath = (slug: string) => join(AUDIO_DIR, `${slug}.mp3`);

function loadManifest(): NarrationManifest {
  if (!existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as NarrationManifest;
  } catch {
    return {};
  }
}

async function main() {
  const files = readdirSync(BLOG_DIR).filter((f) =>
    [".md", ".mdx"].includes(extname(f)),
  );

  const posts: (NarrationPost & { text: string })[] = [];
  for (const file of files) {
    const { data, content } = matter(
      readFileSync(join(BLOG_DIR, file), "utf8"),
    );
    if (data.draft) continue; // drafts have no page, so no Narração
    const slug: string = data.slug ?? basename(file, extname(file));
    const title: string = data.title ?? slug;
    const text = extractNarrationText({ title, body: content });
    posts.push({
      slug,
      hash: hashNarrationText(text),
      hasAudio: existsSync(audioPath(slug)),
      text,
    });
  }

  const manifest = loadManifest();
  const { decisions, nextManifest } = planNarration(posts, manifest, { force });
  const work = decisions.filter((d) => d.action !== "skip");

  console.log(
    `Blog posts: ${decisions.length} | to (re)generate: ${work.length} | up to date: ${decisions.length - work.length}`,
  );

  const adapter = getTtsAdapter();

  if (!adapter.configured) {
    console.log(`\nTTS adapter "${adapter.name}" is not configured — dry run.`);
    for (const d of work) console.log(`  would ${d.action}: ${d.slug}.mp3`);
    console.log(
      "\nWire a provider in src/utils/narration/synthesize.ts (and set TTS_VOICE_ID), then re-run `npm run tts`.",
    );
    return;
  }

  if (!VOICE_ID) {
    console.error("TTS_VOICE_ID is not set. Aborting.");
    process.exitCode = 1;
    return;
  }

  if (work.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  mkdirSync(AUDIO_DIR, { recursive: true });
  for (const d of work) {
    const post = posts.find((p) => p.slug === d.slug)!;
    process.stdout.write(`  ${d.action}: ${d.slug}.mp3 … `);
    const audio = await adapter.synthesize(post.text, VOICE_ID);
    writeFileSync(audioPath(d.slug), audio);
    console.log("done");
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(nextManifest, null, 2) + "\n");
  console.log(`\nManifest updated: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
