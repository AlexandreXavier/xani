import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

interface Props {
  /** Post slug; the Narração is served from /audio/<slug>.mp3. */
  slug: string;
  /** Post language, used to localize the control label. */
  lang?: "pt" | "en";
}

const LABELS = {
  pt: { play: "Ouvir", pause: "Pausa" },
  en: { play: "Listen", pause: "Pause" },
} as const;

/**
 * The Ouvir control: a compact play/pause button that plays a post's Narração.
 * Rendered only when an MP3 exists for the post (the layout decides that).
 */
export default function ListenButton({ slug, lang = "en" }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const labels = LABELS[lang] ?? LABELS.en;
  const label = playing ? labels.pause : labels.play;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <span className="inline-flex items-center">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={label}
        className="focus-outline inline-flex items-center gap-1 text-sm hover:opacity-75"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Play className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{label}</span>
      </button>
      <audio
        ref={audioRef}
        src={`/audio/${slug}.mp3`}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </span>
  );
}
