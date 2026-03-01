/**
 * Result card showing download-ready state
 */

import { useEffect, useState, useCallback } from "react";
import { CheckCircle, Download, Clock } from "lucide-react";
import type { ResultInfo } from "@utils/pdf/types";

interface Props {
  result: ResultInfo;
  ttlExpires: number;
  onDownload: () => void;
  onTTLExpired: () => void;
  isDownloading: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function ResultCard({
  result,
  ttlExpires,
  onDownload,
  onTTLExpired,
  isDownloading,
}: Props) {
  const [remaining, setRemaining] = useState(ttlExpires - Date.now());
  const showCountdown = remaining <= 2 * 60 * 1000; // Show when < 2 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemaining = ttlExpires - Date.now();
      setRemaining(newRemaining);

      if (newRemaining <= 0) {
        clearInterval(interval);
        onTTLExpired();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ttlExpires, onTTLExpired]);

  const handleDownload = useCallback(() => {
    if (!isDownloading) {
      onDownload();
    }
  }, [isDownloading, onDownload]);

  return (
    <div className="rounded-lg border border-skin-line bg-skin-card p-6">
      {/* Success header */}
      <div className="mb-4 flex items-center gap-3">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <div>
          <h3 className="text-lg font-medium text-skin-base">
            Ready to download
          </h3>
          <p className="text-sm text-skin-base opacity-70">
            Your files are ready
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-skin-accent">{result.itemCount}</p>
          <p className="text-xs text-skin-base opacity-70">
            {result.itemCount === 1 ? "Page" : "Pages"}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold text-skin-accent">
            {formatBytes(result.zipSizeBytes)}
          </p>
          <p className="text-xs text-skin-base opacity-70">Size</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-skin-accent">
            {formatDuration(result.durationMs)}
          </p>
          <p className="text-xs text-skin-base opacity-70">Time</p>
        </div>
      </div>

      {/* Duplicates skipped (extract mode) */}
      {result.duplicatesSkipped !== undefined && result.duplicatesSkipped > 0 && (
        <p className="mb-4 text-sm text-skin-base opacity-70">
          {result.duplicatesSkipped} duplicate{result.duplicatesSkipped !== 1 ? "s" : ""} skipped
        </p>
      )}

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`
          flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium
          transition-colors focus-outline
          ${isDownloading
            ? "cursor-not-allowed bg-skin-card text-skin-base opacity-50"
            : "bg-skin-accent text-skin-inverted hover:opacity-90"
          }
        `}
      >
        {isDownloading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-skin-base border-t-transparent" />
            Saving...
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            Download ZIP
          </>
        )}
      </button>

      {/* TTL countdown */}
      {showCountdown && !isDownloading && (
        <div
          className={`mt-4 flex items-center justify-center gap-2 text-sm ${
            remaining < 60 * 1000 ? "text-red-500" : "text-skin-base opacity-70"
          }`}
          aria-live="polite"
        >
          <Clock className="h-4 w-4" />
          <span>Expires in {formatCountdown(remaining)}</span>
        </div>
      )}
    </div>
  );
}
