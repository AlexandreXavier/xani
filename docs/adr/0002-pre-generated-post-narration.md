# Blog post narration is pre-generated static audio, not synthesized on demand

Each blog **Post** can be played as a **Narração** — an MP3 read in Alexandre's **Voz clonada**. We decided to pre-generate these MP3s with a local `npm run tts` script and commit them under `public/audio/`, served as plain static files, rather than synthesizing audio on demand from a serverless function at read time.

## Considered Options

- **On-demand serverless synthesis** (call the TTS API when the reader presses play). Rejected: it would convert the static (SSG) site into a server build (Vercel adapter + `output: "server"`), charge per play (and per repeated play / abuse), require a TTS API key inside a function, and add first-play latency.
- **Pre-generated static MP3** (chosen). The site stays SSG, there is zero per-play cost, no API key reaches the client or any runtime, and playback is instant. Cost: audio must be regenerated when a post's text changes (handled by a content-hash manifest at `public/audio/manifest.json`) and the MP3s grow the repo.
- **External storage (Vercel Blob / S3) vs. git.** Chose committing to `public/audio/` for zero infrastructure and no credentials; revisit only if the repo gets heavy.
- **Provider lock-in.** Synthesis sits behind a swappable adapter (`synthesize(text, voice) → audio`); it ships as a stub and a concrete vendor (ElevenLabs, PlayHT, …) is wired in later via environment variables.

## Consequences

- A future reader sees committed MP3s, a `manifest.json`, and a stub adapter, and might wonder why we don't call a TTS API at runtime or use the browser Web Speech API — this record is the answer.
- `npm run tts` is a manual publish-time chore, deliberately **not** part of `astro build` (which would re-pay synthesis on every build). It only (re)generates posts that are new or whose text hash changed.
- Narration is **blog-only**; `estudo`, `code`, and `vela` have no date line and therefore no **Ouvir control** and no Narração.
- The TTS API key lives only in the local environment / generation script and must never reach a client bundle.
