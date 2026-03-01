/**
 * File info card showing uploaded PDF details
 */

import { FileText, X, Lock } from "lucide-react";
import type { PDFFileInfo } from "@utils/pdf/types";

interface Props {
  fileInfo: PDFFileInfo;
  onClear: () => void;
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileInfoCard({ fileInfo, onClear, disabled }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-skin-line bg-skin-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-skin-accent/10">
          <FileText className="h-5 w-5 text-skin-accent" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-skin-base">{fileInfo.name}</p>
            {fileInfo.isEncrypted && (
              <Lock className="h-4 w-4 text-skin-base opacity-50" aria-label="Password protected" />
            )}
          </div>
          <p className="text-sm text-skin-base opacity-70">
            {fileInfo.pageCount} page{fileInfo.pageCount !== 1 ? "s" : ""} &bull;{" "}
            {formatBytes(fileInfo.sizeBytes)}
          </p>
        </div>
      </div>
      <button
        onClick={onClear}
        disabled={disabled}
        className={`
          rounded p-2 text-skin-base opacity-50 transition-opacity hover:opacity-100 focus-outline
          ${disabled ? "cursor-not-allowed" : ""}
        `}
        title="Remove file"
        aria-label="Remove uploaded file"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
