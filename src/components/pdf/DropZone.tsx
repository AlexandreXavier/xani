/**
 * File upload dropzone component
 */

import { useCallback, useState, useRef } from "react";
import { Upload } from "lucide-react";

interface Props {
  onFileDrop: (file: File) => void;
  isValidating: boolean;
  disabled?: boolean;
}

export default function DropZone({ onFileDrop, isValidating, disabled }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onFileDrop(files[0]);
      }
    },
    [onFileDrop, disabled]
  );

  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileDrop(files[0]);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [onFileDrop]
  );

  return (
    <div
      className={`
        relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center
        rounded-lg border-2 border-dashed p-8 transition-colors
        ${isDragging
          ? "border-skin-accent bg-skin-accent/10"
          : "border-skin-line bg-skin-card/50 hover:border-skin-accent hover:bg-skin-card"
        }
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label="Carregar ficheiro PDF. Arrasta para aqui ou pressiona Enter para procurar"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="sr-only"
        disabled={disabled}
        aria-hidden="true"
      />

      {isValidating ? (
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-skin-line border-t-skin-accent" />
          <p className="text-skin-base">A validar PDF...</p>
        </div>
      ) : (
        <>
          <Upload className="mb-4 h-12 w-12 text-skin-base opacity-50" />
          <p className="mb-2 text-lg font-medium text-skin-base">
            Arrasta o PDF para aqui ou clica para procurar
          </p>
          <p className="text-sm text-skin-base opacity-70">
            PDF &bull; Máx 25MB &bull; Máx 50 páginas (varia com DPI)
          </p>
        </>
      )}
    </div>
  );
}
