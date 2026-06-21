/**
 * Swappable boundary to the text-to-speech provider that renders a post's
 * text in Alexandre's Voz clonada. The concrete vendor (ElevenLabs, PlayHT, …)
 * is wired in later; until then `getTtsAdapter` returns a stub and narration
 * generation runs as a dry run.
 *
 * The provider API key must stay in the local environment / generation script
 * and never reach a client bundle.
 */
export interface TtsAdapter {
  readonly name: string;
  /** False until a real provider is wired in. */
  readonly configured: boolean;
  /** Synthesize `text` in the given cloned voice, returning MP3 bytes. */
  synthesize(text: string, voiceId: string): Promise<Buffer>;
}

const stubAdapter: TtsAdapter = {
  name: "stub",
  configured: false,
  async synthesize() {
    throw new Error(
      "No TTS provider configured. Wire a concrete adapter in " +
        "src/utils/narration/synthesize.ts (provider API key + voice id) " +
        "before generating narration audio.",
    );
  },
};

/**
 * Returns the active TTS adapter. Replace the body with a concrete provider
 * adapter (guarded by its env vars) when one is chosen.
 */
export function getTtsAdapter(): TtsAdapter {
  return stubAdapter;
}

/** The cloned-voice id for the chosen provider, supplied via the environment. */
export const VOICE_ID = process.env.TTS_VOICE_ID ?? "";
