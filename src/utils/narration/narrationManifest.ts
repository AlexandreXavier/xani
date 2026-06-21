import { createHash } from "node:crypto";

export interface ManifestEntry {
  /** Hash of the spoken text the MP3 was generated from. */
  hash: string;
}

/** Maps a post slug to the state of its committed Narração. */
export type NarrationManifest = Record<string, ManifestEntry>;

export interface NarrationPost {
  slug: string;
  /** Hash of this post's current spoken text (see hashNarrationText). */
  hash: string;
  /** Whether an MP3 already exists on disk for this slug. */
  hasAudio: boolean;
}

export type NarrationAction = "generate" | "regenerate" | "skip";

export interface NarrationDecision {
  slug: string;
  action: NarrationAction;
}

export interface NarrationPlan {
  decisions: NarrationDecision[];
  /** The manifest as it should be once the planned work has run. */
  nextManifest: NarrationManifest;
}

/** Stable content hash over the spoken text. */
export function hashNarrationText(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

/**
 * Decide which posts need their Narração (re)generated.
 *
 * - missing manifest entry or missing MP3  → generate
 * - text hash changed since last run       → regenerate
 * - otherwise                              → skip
 *
 * With `force`, every post is (re)generated regardless of hash. The returned
 * `nextManifest` contains only the supplied posts, so entries for deleted
 * posts are pruned. Pure: no I/O, decision derived solely from the inputs.
 */
export function planNarration(
  posts: NarrationPost[],
  manifest: NarrationManifest,
  options: { force?: boolean } = {},
): NarrationPlan {
  const decisions: NarrationDecision[] = [];
  const nextManifest: NarrationManifest = {};

  for (const post of posts) {
    const previous = manifest[post.slug];
    let action: NarrationAction;

    if (options.force) {
      action = previous ? "regenerate" : "generate";
    } else if (!previous || !post.hasAudio) {
      action = "generate";
    } else if (previous.hash !== post.hash) {
      action = "regenerate";
    } else {
      action = "skip";
    }

    decisions.push({ slug: post.slug, action });
    nextManifest[post.slug] = { hash: post.hash };
  }

  return { decisions, nextManifest };
}
