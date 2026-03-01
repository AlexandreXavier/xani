/**
 * Error alert component with debug token
 */

import { useCallback, useState } from "react";
import { AlertCircle, Copy, Check, RefreshCw } from "lucide-react";
import type { ErrorInfo } from "@utils/pdf/types";

interface Props {
  error: ErrorInfo;
  onReset: () => void;
  onRetry?: () => void;
}

export default function ErrorAlert({ error, onReset, onRetry }: Props) {
  const [copied, setCopied] = useState(false);

  const copyDebugToken = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(error.debugToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = error.debugToken;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [error.debugToken]);

  return (
    <div
      className="rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
        <div className="flex-1">
          <h3 className="font-medium text-red-800 dark:text-red-200">
            Erro
          </h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            {error.message}
          </p>

          {/* Debug token */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-red-600 dark:text-red-400">
              ID do Erro: {error.debugToken}
            </span>
            <button
              onClick={copyDebugToken}
              className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
              title="Copiar ID do erro"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copiar
                </>
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            {error.recoverable && onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus-outline"
              >
                <RefreshCw className="h-4 w-4" />
                Tentar Novamente
              </button>
            )}
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus-outline dark:border-red-700 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-900/30"
            >
              Recomeçar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
