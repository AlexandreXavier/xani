# Blog post narration is pre-generated static audio, not synthesized on demand

Each blog **Post** can be played as a **Narração** — audio read in Alexandre's **Voz clonada**. We decided to pre-generate these files with a local `npm run tts` script and commit them under `public/audio/`, served as plain static files, rather than synthesizing audio on demand from a serverless function at read time. Synthesis is done by a **local [Voicebox](https://github.com/jamiepine/voicebox) instance** (its REST API on `127.0.0.1:17493`), not a cloud TTS provider.

## Considered Options

- **On-demand serverless synthesis** (call the TTS API when the reader presses play). Rejected: it would convert the static (SSG) site into a server build (Vercel adapter + `output: "server"`), charge per play (and per repeated play / abuse), require a TTS API key inside a function, and add first-play latency.
- **Pre-generated static audio** (chosen). The site stays SSG, there is zero per-play cost, nothing reaches the client or any runtime beyond the audio file, and playback is instant. Cost: audio must be regenerated when a post's text changes (handled by a content-hash manifest at `public/audio/manifest.json`) and the files grow the repo.
- **External storage (Vercel Blob / S3) vs. git.** Chose committing to `public/audio/` for zero infrastructure and no credentials; revisit only if the repo gets heavy.
- **Local Voicebox vs. a cloud TTS provider** (ElevenLabs, PlayHT, …). Chose local Voicebox: the voice clone and synthesis stay on Alexandre's machine, with no API key, no usage cost, and no third party. Synthesis still sits behind a swappable `TtsAdapter`, so a different engine can replace it without touching the rest of the pipeline. Cost: generating requires Voicebox to be running locally, so it is a deliberately manual step.

## Consequences

- A future reader sees committed audio, a `manifest.json`, and a Voicebox HTTP adapter, and might wonder why we don't call a TTS API at runtime or use the browser Web Speech API — this record is the answer.
- `npm run tts` is a manual publish-time chore, deliberately **not** part of `astro build` (it needs the local Voicebox app running, and building shouldn't re-synthesize). It only (re)generates posts that are new or whose text hash changed.
- The committed file format follows whatever Voicebox returns (mp3/wav/ogg); the manifest records each post's extension and the page builds the audio URL from it.
- Narration is **blog-only**; `estudo`, `code`, and `vela` have no date line and therefore no **Ouvir control** and no Narração.
- `VOICEBOX_PROFILE_ID` (the cloned voice) and `VOICEBOX_URL` configure generation; they live only in the local environment, never in a client bundle.
