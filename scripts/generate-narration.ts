/**
 * Pre-generate the Narração (spoken-word audio) for each blog Post using a
 * local Voicebox instance (https://github.com/jamiepine/voicebox).
 *
 * Run manually at publish time:
 *   npm run tts                 # generate what's new/changed
 *   npm run tts -- --force      # regenerate everything
 *   npm run tts -- --dry-run    # list work without calling Voicebox
 *
 * It reads the `blog` collection, extracts each post's spoken text, and
 * (re)generates only posts that are new or whose text changed (tracked by hash
 * in public/audio/manifest.json). Audio is written to public/audio/<slug>.<ext>
 * and served as a static file. Deliberately NOT part of `astro build`.
 *
 * Requires Voicebox running and VOICEBOX_PROFILE_ID set to the cloned voice's
 * profile id (find it via `curl http://127.0.0.1:17493/profiles`).
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
import { getTtsAdapter } from "../src/utils/narration/synthesize";

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, "src/content/blog");
const AUDIO_DIR = join(ROOT, "public/audio");
const MANIFEST_PATH = join(AUDIO_DIR, "manifest.json");

const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

const audioPath = (slug: string, ext: string) =>
  join(AUDIO_DIR, `${slug}.${ext}`);

function loadManifest(): NarrationManifest {
  if (!existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as NarrationManifest;
  } catch {
    return {};
  }
}

type PostWithText = NarrationPost & { text: string; language: string };

async function main() {
  const manifest = loadManifest();

  const files = readdirSync(BLOG_DIR).filter((f) =>
    [".md", ".mdx"].includes(extname(f)),
  );

  const posts: PostWithText[] = [];
  for (const file of files) {
    const { data, content } = matter(
      readFileSync(join(BLOG_DIR, file), "utf8"),
    );
    if (data.draft) continue; // drafts have no page, so no Narração
    const slug: string = data.slug ?? basename(file, extname(file));
    const title: string = data.title ?? slug;
    const text = extractNarrationText({ title, body: content });
    // An audio file exists if the manifest's recorded extension is on disk.
    const knownExt = manifest[slug]?.ext;
    const hasAudio = knownExt ? existsSync(audioPath(slug, knownExt)) : false;
    posts.push({
      slug,
      hash: hashNarrationText(text),
      hasAudio,
      text,
      language: data.language === "pt" ? "pt" : "en",
    });
  }

  const { decisions } = planNarration(posts, manifest, { force });
  const work = decisions.filter((d) => d.action !== "skip");

  console.log(
    `Blog posts: ${decisions.length} | to (re)generate: ${work.length} | up to date: ${decisions.length - work.length}`,
  );

  const adapter = getTtsAdapter();

  if (dryRun || !adapter.configured) {
    const why = dryRun
      ? "--dry-run"
      : `adapter "${adapter.name}" is not configured (set VOICEBOX_PROFILE_ID)`;
    console.log(`\nDry run (${why}).`);
    for (const d of work) console.log(`  would ${d.action}: ${d.slug}`);
    if (!adapter.configured && !dryRun) {
      console.log(
        "\nStart Voicebox and set VOICEBOX_PROFILE_ID (see `curl http://127.0.0.1:17493/profiles`), then re-run `npm run tts`.",
      );
    }
    return;
  }

  if (work.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  // Build the manifest to commit, carrying over unchanged entries.
  const nextManifest: NarrationManifest = {};
  for (const post of posts) nextManifest[post.slug] = manifest[post.slug];

  mkdirSync(AUDIO_DIR, { recursive: true });
  for (const d of work) {
    const post = posts.find((p) => p.slug === d.slug)!;
    process.stdout.write(`  ${d.action}: ${d.slug} … `);
    const { data, extension } = await adapter.synthesize(post.text, {
      language: post.language,
    });
    writeFileSync(audioPath(d.slug, extension), data);
    nextManifest[d.slug] = { hash: post.hash, ext: extension };
    console.log(`done (${extension}, ${(data.length / 1024).toFixed(0)} KB)`);
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(nextManifest, null, 2) + "\n");
  console.log(`\nManifest updated: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
