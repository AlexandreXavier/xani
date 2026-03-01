/**
 * Main PDF Converter React Island
 * This is the entry point for the PDF to PNG tool
 */

import { useEffect, useState, useCallback } from "react";
import { usePDFConverter } from "./hooks/usePDFConverter";
import DropZone from "./DropZone";
import FileInfoCard from "./FileInfoCard";
import SettingsPanel from "./SettingsPanel";
import PasswordInput from "./PasswordInput";
import ProgressDisplay from "./ProgressDisplay";
import ResultCard from "./ResultCard";
import ErrorAlert from "./ErrorAlert";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { MAX_PASSWORD_ATTEMPTS } from "@utils/pdf/types";
import type { PDFConfig } from "@utils/pdf/types";

export default function PDFConverterIsland() {
  const {
    state,
    capabilities,
    dropFile,
    enterPassword,
    updateConfig,
    getConfig,
    startProcessing,
    cancel,
    downloadZip,
    reset,
    handleTTLExpired,
  } = usePDFConverter();

  // Local config state for UI
  const [config, setConfig] = useState<PDFConfig>(getConfig());

  // Sync config changes
  const handleConfigChange = useCallback(
    (updates: Partial<PDFConfig>) => {
      setConfig(prev => {
        const newConfig = { ...prev, ...updates };
        updateConfig(newConfig);
        return newConfig;
      });
    },
    [updateConfig]
  );

  // Reset config when file changes
  useEffect(() => {
    if (state.status === "READY_TO_PROCESS") {
      setConfig(prev => ({
        ...prev,
        pageRange: {
          type: "all",
          resolvedPages: Array.from(
            { length: state.fileInfo.pageCount },
            (_, i) => i + 1
          ),
        },
      }));
    }
  }, [state.status === "READY_TO_PROCESS" ? state.fileInfo.pageCount : 0]);

  // beforeunload warning during processing
  useEffect(() => {
    if (state.status === "PROCESSING") {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "Processing in progress. Are you sure you want to leave?";
      };
      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
    }
  }, [state.status]);

  // Browser not supported
  if (!capabilities.supported) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
        <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h2 className="mb-2 text-lg font-medium text-red-800 dark:text-red-200">
          Navegador Não Suportado
        </h2>
        <p className="text-red-700 dark:text-red-300">{capabilities.warning}</p>
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
          Por favor utiliza Chrome 90+, Firefox 90+ ou Safari 16.4+
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mobile warning */}
      {capabilities.isMobile && state.status === "IDLE" && (
        <div className="flex items-center gap-3 rounded-lg border border-skin-accent/50 bg-skin-accent/10 p-4">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-skin-accent" />
          <p className="text-sm text-skin-base">
            Para melhores resultados, utiliza um navegador de computador. O processamento de PDFs grandes pode
            ser lento em dispositivos móveis.
          </p>
        </div>
      )}

      {/* Error state */}
      {state.status === "ERROR" && (
        <ErrorAlert
          error={state.error}
          onReset={reset}
          onRetry={state.error.recoverable ? () => reset() : undefined}
        />
      )}

      {/* Cancelled state - brief message then return to idle */}
      {state.status === "CANCELLED" && (
        <div className="rounded-lg border border-skin-line bg-skin-card p-4 text-center">
          <p className="text-skin-base">Processamento cancelado.</p>
          <button
            onClick={reset}
            className="mt-2 text-skin-accent hover:underline focus-outline"
          >
            Recomeçar
          </button>
        </div>
      )}

      {/* IDLE - Show dropzone */}
      {(state.status === "IDLE" || state.status === "CANCELLED") && (
        <DropZone
          onFileDrop={dropFile}
          isValidating={false}
          disabled={false}
        />
      )}

      {/* VALIDATING - Show dropzone with spinner */}
      {state.status === "VALIDATING" && (
        <DropZone onFileDrop={dropFile} isValidating={true} disabled={true} />
      )}

      {/* AWAITING_PASSWORD - Show password input */}
      {state.status === "AWAITING_PASSWORD" && (
        <div className="space-y-4">
          <FileInfoCard
            fileInfo={{
              file: state.file,
              name: state.file.name,
              sizeBytes: state.file.size,
              pageCount: state.pageCount || 0,
              title: state.title || "",
              isEncrypted: true,
            }}
            onClear={reset}
            disabled={false}
          />
          <PasswordInput
            onSubmit={enterPassword}
            attempts={state.passwordAttempts}
            maxAttempts={MAX_PASSWORD_ATTEMPTS}
            disabled={false}
          />
        </div>
      )}

      {/* READY_TO_PROCESS - Show file info and settings */}
      {state.status === "READY_TO_PROCESS" && (
        <div className="space-y-6">
          <FileInfoCard
            fileInfo={state.fileInfo}
            onClear={reset}
            disabled={false}
          />
          <SettingsPanel
            fileInfo={state.fileInfo}
            config={config}
            onConfigChange={handleConfigChange}
            disabled={false}
          />
          <div className="flex gap-4">
            <button
              onClick={startProcessing}
              className="flex-1 rounded-lg bg-skin-accent px-6 py-3 font-medium text-skin-inverted transition-opacity hover:opacity-90 focus-outline"
            >
              Converter
            </button>
            <button
              onClick={reset}
              className="rounded-lg border border-skin-line bg-skin-card px-6 py-3 font-medium text-skin-base transition-colors hover:bg-skin-card-muted focus-outline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* PROCESSING - Show progress */}
      {state.status === "PROCESSING" && (
        <div className="space-y-6">
          <FileInfoCard
            fileInfo={state.fileInfo}
            onClear={() => {}}
            disabled={true}
          />
          <ProgressDisplay progress={state.progress} />
          <button
            onClick={cancel}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-skin-line bg-skin-card px-6 py-3 font-medium text-skin-base transition-colors hover:bg-skin-card-muted focus-outline"
          >
            <X className="h-5 w-5" />
            Cancelar
          </button>
        </div>
      )}

      {/* DOWNLOAD_READY - Show result */}
      {state.status === "DOWNLOAD_READY" && (
        <ResultCard
          result={state.result}
          ttlExpires={state.ttlExpires}
          onDownload={downloadZip}
          onTTLExpired={handleTTLExpired}
          isDownloading={false}
        />
      )}

      {/* DOWNLOADING - Show result with loading state */}
      {state.status === "DOWNLOADING" && (
        <div className="rounded-lg border border-skin-line bg-skin-card p-6 text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-skin-accent" />
          <p className="text-skin-base">A preparar transferência...</p>
        </div>
      )}
    </div>
  );
}
