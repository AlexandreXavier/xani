/**
 * Progress display component with phase info and progress bar
 */

import type { ProgressInfo } from "@utils/pdf/types";

interface Props {
  progress: ProgressInfo;
}

const PHASE_LABELS: Record<string, string> = {
  parsing: "Reading PDF...",
  rendering: "Rendering pages...",
  extracting: "Extracting images...",
  zipping: "Creating ZIP file...",
  finalizing: "Almost done...",
};

export default function ProgressDisplay({ progress }: Props) {
  const { phase, current, total, percent } = progress;
  const phaseLabel = PHASE_LABELS[phase] || "Processing...";

  return (
    <div className="space-y-3" role="region" aria-label="Processing progress">
      {/* Status text */}
      <div className="flex justify-between text-sm text-skin-base">
        <span>{phaseLabel}</span>
        {total > 0 && (
          <span>
            {current} / {total}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-skin-card"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percent}% complete`}
      >
        <div
          className="h-full bg-skin-accent transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="text-right font-mono text-lg text-skin-accent">
        {percent}%
      </div>

      {/* Screen reader announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {phase === "finalizing" && percent >= 98
          ? "Processing complete"
          : `${phaseLabel} ${percent}% complete`}
      </div>
    </div>
  );
}
