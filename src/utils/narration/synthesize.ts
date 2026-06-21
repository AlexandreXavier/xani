import { readFileSync } from "node:fs";

/**
 * Swappable boundary to the engine that renders a post's text in Alexandre's
 * Voz clonada. The current adapter talks to a **local Voicebox** instance
 * (https://github.com/jamiepine/voicebox) over its REST API — everything runs
 * on Alexandre's machine, so there is no cloud key and no per-use cost.
 *
 * Voicebox must be running (default http://127.0.0.1:17493) and the cloned
 * voice's profile id supplied via VOICEBOX_PROFILE_ID when `npm run tts` runs.
 */
export type AudioExtension = "mp3" | "wav" | "ogg";

export interface SynthResult {
  data: Buffer;
  /** Container format Voicebox returned, used as the file extension. */
  extension: AudioExtension;
}

export interface TtsAdapter {
  readonly name: string;
  /** False when the adapter lacks the config it needs (then we dry-run). */
  readonly configured: boolean;
  /** Synthesize `text` in the cloned voice for the given post language. */
  synthesize(text: string, opts: { language: string }): Promise<SynthResult>;
}

const BASE_URL = (process.env.VOICEBOX_URL ?? "http://127.0.0.1:17493").replace(
  /\/$/,
  "",
);
const PROFILE_ID = process.env.VOICEBOX_PROFILE_ID ?? "";

function extensionFromContentType(contentType: string): AudioExtension {
  const ct = contentType.toLowerCase();
  if (ct.includes("wav") || ct.includes("wave")) return "wav";
  if (ct.includes("ogg")) return "ogg";
  return "mp3"; // audio/mpeg and anything else default to mp3
}

const voiceboxAdapter: TtsAdapter = {
  name: "voicebox",
  // Reachability is checked at call time; config-completeness is the profile id.
  configured: PROFILE_ID !== "",

  async synthesize(text, { language }) {
    let res: Response;
    try {
      res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          profile_id: PROFILE_ID,
          language,
          // Harmless if Voicebox ignores it; prefer mp3 when honoured.
          format: "mp3",
        }),
      });
    } catch (cause) {
      throw new Error(
        `Could not reach Voicebox at ${BASE_URL}. Is the app running? ` +
          `Set VOICEBOX_URL to override the address.`,
        { cause },
      );
    }

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `Voicebox /generate failed (${res.status} ${res.statusText}). ${detail}`.trim(),
      );
    }

    const contentType = res.headers.get("content-type") ?? "";

    // JSON response: look for base64 audio or a file path on disk.
    if (contentType.includes("application/json")) {
      const body = (await res.json()) as Record<string, unknown>;
      const b64 = body.audio ?? body.audio_base64 ?? body.data;
      if (typeof b64 === "string") {
        return {
          data: Buffer.from(b64, "base64"),
          extension: extensionFromContentType(String(body.format ?? "")),
        };
      }
      const path = body.path ?? body.file ?? body.output_path;
      if (typeof path === "string") {
        return {
          data: readFileSync(path),
          extension: extensionFromContentType(path),
        };
      }
      throw new Error(
        `Unexpected JSON from Voicebox /generate (keys: ${Object.keys(body).join(", ")}).`,
      );
    }

    // Otherwise the body is the raw audio.
    return {
      data: Buffer.from(await res.arrayBuffer()),
      extension: extensionFromContentType(contentType),
    };
  },
};

/** Returns the active TTS adapter. */
export function getTtsAdapter(): TtsAdapter {
  return voiceboxAdapter;
}
