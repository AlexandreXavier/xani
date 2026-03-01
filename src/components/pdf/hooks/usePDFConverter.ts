/**
 * PDF Converter State Machine Hook
 * Manages all state transitions and worker communication
 */

import { useReducer, useCallback, useRef, useEffect, useMemo } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type {
  ConverterState,
  ConverterAction,
  PDFConfig,
  PDFFileInfo,
  WorkerToMainMessage,
  MainToWorkerMessage,
} from "@utils/pdf/types";
import {
  MAX_FILE_SIZE_BYTES,
  TTL_MS,
  MAX_PASSWORD_ATTEMPTS,
  MIN_IMAGE_DIMENSION_PX,
} from "@utils/pdf/types";
import { resolvePageRange, checkDPIPageLimit } from "@utils/pdf/parse-page-range";
import { extractDocTitle, generateZipFilename } from "@utils/pdf/sanitize-filename";

// Configure PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href;

// Initial state
const initialState: ConverterState = { status: "IDLE" };

// State machine reducer
function converterReducer(
  state: ConverterState,
  action: ConverterAction
): ConverterState {
  switch (action.type) {
    case "FILE_DROPPED":
      if (
        state.status !== "IDLE" &&
        state.status !== "ERROR" &&
        state.status !== "CANCELLED" &&
        state.status !== "DOWNLOAD_READY"
      ) {
        return state;
      }
      return { status: "VALIDATING", file: action.file };

    case "VALIDATION_SUCCESS":
      if (state.status !== "VALIDATING") return state;
      return { status: "READY_TO_PROCESS", fileInfo: action.fileInfo };

    case "PASSWORD_REQUIRED":
      if (state.status !== "VALIDATING") return state;
      return {
        status: "AWAITING_PASSWORD",
        file: state.file,
        pageCount: action.pageCount,
        title: action.title,
        passwordAttempts: 0,
      };

    case "PASSWORD_ENTERED":
      if (state.status !== "AWAITING_PASSWORD") return state;
      return { status: "VALIDATING", file: state.file };

    case "VALIDATION_ERROR":
      if (state.status === "AWAITING_PASSWORD") {
        // Password retry
        if (
          action.error.code === "PASSWORD_INCORRECT" &&
          state.passwordAttempts < MAX_PASSWORD_ATTEMPTS - 1
        ) {
          return {
            ...state,
            passwordAttempts: state.passwordAttempts + 1,
          };
        }
      }
      return { status: "ERROR", error: action.error };

    case "START_PROCESSING":
      if (state.status !== "READY_TO_PROCESS") return state;
      return {
        status: "PROCESSING",
        fileInfo: state.fileInfo,
        progress: { phase: "parsing", current: 0, total: 0, percent: 0 },
        jobId: action.jobId,
      };

    case "PROGRESS":
      if (state.status !== "PROCESSING") return state;
      return { ...state, progress: action.progress };

    case "PROCESSING_COMPLETE":
      if (state.status !== "PROCESSING") return state;
      return {
        status: "DOWNLOAD_READY",
        result: action.result,
        ttlExpires: action.ttlExpires,
      };

    case "PROCESSING_ERROR":
      if (state.status !== "PROCESSING") return state;
      return { status: "ERROR", error: action.error };

    case "DOWNLOAD_STARTED":
      if (state.status !== "DOWNLOAD_READY") return state;
      return { status: "DOWNLOADING" };

    case "DOWNLOAD_COMPLETE":
      return { status: "IDLE" };

    case "CANCEL":
      if (state.status !== "PROCESSING") return state;
      return { status: "CANCELLED" };

    case "TTL_EXPIRED":
      if (state.status !== "DOWNLOAD_READY") return state;
      return { status: "IDLE" };

    case "RESET":
      return { status: "IDLE" };

    default:
      return state;
  }
}

// Generate debug token
function generateDebugToken(code: string): string {
  const timestamp = Date.now();
  const timePart = (timestamp % 10000).toString(36).toUpperCase().padStart(4, "0");
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) - hash + code.charCodeAt(i);
    hash = hash & hash;
  }
  const codePart = Math.abs(hash)
    .toString(36)
    .toUpperCase()
    .slice(0, 4)
    .padStart(4, "0");
  return `${timePart}${codePart}`;
}

async function loadPDFDocumentForValidation(
   arrayBuffer: ArrayBuffer,
   password?: string
 ): Promise<pdfjsLib.PDFDocumentProxy> {
   const data = new Uint8Array(arrayBuffer);

   try {
     return await pdfjsLib
       .getDocument({
         data,
         password,
         isEvalSupported: false,
       })
       .promise;
   } catch (error) {
     const message = error instanceof Error ? error.message : String(error);
     const looksLikeWorkerFailure =
       /Setting up fake worker failed/i.test(message) ||
       /Failed to fetch/i.test(message) ||
       /Unable to load.*worker/i.test(message) ||
       /Cannot load script/i.test(message) ||
       /Worker.*(failed|error)/i.test(message);

     if (!looksLikeWorkerFailure) throw error;

     return await pdfjsLib
       .getDocument({
         data,
         password,
         isEvalSupported: false,
         disableWorker: true,
       } as Parameters<typeof pdfjsLib.getDocument>[0])
       .promise;
   }
 }

// Browser capability detection
interface BrowserCapabilities {
  hasOffscreenCanvas: boolean;
  hasWebWorker: boolean;
  hasFileSystemAccess: boolean;
  isMobile: boolean;
  supported: boolean;
  warning?: string;
}

function detectCapabilities(): BrowserCapabilities {
  const hasOffscreenCanvas = typeof OffscreenCanvas !== "undefined";
  const hasWebWorker = typeof Worker !== "undefined";
  const hasFileSystemAccess = "showSaveFilePicker" in window;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const supported = hasOffscreenCanvas && hasWebWorker;
  let warning: string | undefined;

  if (!supported) {
    warning = "O teu navegador não suporta esta ferramenta. Por favor utiliza um navegador moderno.";
  } else if (isMobile) {
    warning = "Para melhores resultados, utiliza um navegador de computador.";
  }

  return {
    hasOffscreenCanvas,
    hasWebWorker,
    hasFileSystemAccess,
    isMobile,
    supported,
    warning,
  };
}

// Main hook
export function usePDFConverter() {
  const [state, dispatch] = useReducer(converterReducer, initialState);

  // Refs
  const workerRef = useRef<Worker | null>(null);
  const currentJobIdRef = useRef<string | null>(null);
  const objectURLsRef = useRef<Set<string>>(new Set());
  const passwordRef = useRef<string>("");

  // Config state (separate from machine state)
  const configRef = useRef<PDFConfig>({
    mode: "render",
    dpiPreset: 144,
    pageRange: {
      type: "all",
      resolvedPages: [],
    },
    minImagePx: MIN_IMAGE_DIMENSION_PX,
  });

  // Browser capabilities
  const capabilities = useMemo(() => detectCapabilities(), []);

  // Cleanup function
  const cleanup = useCallback(() => {
    // Revoke all object URLs
    objectURLsRef.current.forEach(url => {
      URL.revokeObjectURL(url);
    });
    objectURLsRef.current.clear();

    // Terminate worker
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    currentJobIdRef.current = null;
    passwordRef.current = "";
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Create worker lazily
  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../../../workers/pdf-processor.worker.ts", import.meta.url),
        { type: "module" }
      );

      workerRef.current.onmessage = (
        event: MessageEvent<WorkerToMainMessage>
      ) => {
        const message = event.data;

        // Ignore messages from stale jobs
        if (
          "payload" in message &&
          "jobId" in message.payload &&
          message.payload.jobId !== currentJobIdRef.current
        ) {
          return;
        }

        switch (message.type) {
          case "PROGRESS":
            dispatch({
              type: "PROGRESS",
              progress: {
                phase: message.payload.phase,
                current: message.payload.current,
                total: message.payload.total,
                percent: message.payload.percent,
              },
            });
            break;

          case "READY": {
            const zipUrl = URL.createObjectURL(message.payload.zipBlob);
            objectURLsRef.current.add(zipUrl);

            dispatch({
              type: "PROCESSING_COMPLETE",
              result: {
                zipBlob: message.payload.zipBlob,
                zipUrl,
                itemCount: message.payload.metadata.itemCount,
                zipSizeBytes: message.payload.metadata.zipSizeBytes,
                durationMs: message.payload.metadata.durationMs,
                duplicatesSkipped: message.payload.metadata.duplicatesSkipped,
                filename: "", // Will be set by caller
              },
              ttlExpires: Date.now() + TTL_MS,
            });
            break;
          }

          case "ERROR":
            dispatch({
              type: "PROCESSING_ERROR",
              error: {
                code: message.payload.code,
                message: message.payload.message,
                debugToken: message.payload.debugToken,
                recoverable: message.payload.recoverable,
                pageIndex: message.payload.pageIndex,
              },
            });
            break;
        }
      };

      workerRef.current.onerror = () => {
        dispatch({
          type: "PROCESSING_ERROR",
          error: {
            code: "WORKER_CRASH",
            message: "O processamento falhou inesperadamente. Por favor tenta novamente.",
            debugToken: generateDebugToken("WORKER_CRASH"),
            recoverable: true,
          },
        });
      };
    }

    return workerRef.current;
  }, []);

  // Validate PDF file
  const validateFile = useCallback(
    async (file: File, password?: string) => {
      // Check MIME type
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        dispatch({
          type: "VALIDATION_ERROR",
          error: {
            code: "INVALID_TYPE",
            message: "Por favor seleciona um ficheiro PDF",
            debugToken: generateDebugToken("INVALID_TYPE"),
            recoverable: false,
          },
        });
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        dispatch({
          type: "VALIDATION_ERROR",
          error: {
            code: "SIZE_EXCEEDED",
            message: "Ficheiro demasiado grande. O tamanho máximo é 25 MB.",
            debugToken: generateDebugToken("SIZE_EXCEEDED"),
            recoverable: false,
          },
        });
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const doc = await loadPDFDocumentForValidation(arrayBuffer, password);

        const pageCount = doc.numPages;
        const metadata = await doc.getMetadata();
        const title = (metadata?.info as Record<string, unknown>)?.Title as string || "";

        await doc.destroy();

        const fileInfo: PDFFileInfo = {
          file,
          name: file.name,
          sizeBytes: file.size,
          pageCount,
          title,
          isEncrypted: !!password,
        };

        dispatch({ type: "VALIDATION_SUCCESS", fileInfo });
      } catch (error) {
        const err = error as Error & { name?: string; code?: number };

        if (err.name === "PasswordException") {
          if (err.code === 1) {
            // Need password
            dispatch({
              type: "PASSWORD_REQUIRED",
              pageCount: 0,
              title: "",
            });
          } else {
            // Wrong password
            dispatch({
              type: "VALIDATION_ERROR",
              error: {
                code: "PASSWORD_INCORRECT",
                message: "Palavra-passe incorreta. Por favor tenta novamente.",
                debugToken: generateDebugToken("PASSWORD_INCORRECT"),
                recoverable: true,
              },
            });
          }
          return;
        }

        const errorMessage = error instanceof Error ? error.message : String(error);
        dispatch({
          type: "VALIDATION_ERROR",
          error: {
            code: "PARSE_ERROR",
            message: `Não foi possível ler o PDF. ${errorMessage || "O ficheiro pode estar corrompido."}`,
            debugToken: generateDebugToken("PARSE_ERROR"),
            recoverable: false,
          },
        });
      }
    },
    []
  );

  // Handle file drop
  const dropFile = useCallback(
    (file: File) => {
      dispatch({ type: "FILE_DROPPED", file });
      validateFile(file);
    },
    [validateFile]
  );

  // Handle password entry
  const enterPassword = useCallback(
    (password: string) => {
      passwordRef.current = password;
      dispatch({ type: "PASSWORD_ENTERED", password });

      if (state.status === "AWAITING_PASSWORD") {
        validateFile(state.file, password);
      }
    },
    [state, validateFile]
  );

  // Update config
  const updateConfig = useCallback((updates: Partial<PDFConfig>) => {
    configRef.current = { ...configRef.current, ...updates };
  }, []);

  // Get current config
  const getConfig = useCallback(() => configRef.current, []);

  // Start processing
  const startProcessing = useCallback(async () => {
    if (state.status !== "READY_TO_PROCESS") return;

    const { fileInfo } = state;
    const config = configRef.current;

    // Resolve page range
    const pageResult = resolvePageRange(config.pageRange, fileInfo.pageCount);
    if (!pageResult.valid) {
      dispatch({
        type: "PROCESSING_ERROR",
        error: {
          code: "PARSE_ERROR",
          message: pageResult.error || "Intervalo de páginas inválido",
          debugToken: generateDebugToken("PARSE_ERROR"),
          recoverable: true,
        },
      });
      return;
    }

    // Check DPI page limit (only for render mode)
    if (config.mode === "render") {
      const dpiCheck = checkDPIPageLimit(pageResult.pages.length, config.dpiPreset);
      if (!dpiCheck.allowed) {
        dispatch({
          type: "PROCESSING_ERROR",
          error: {
            code: "PAGE_LIMIT_EXCEEDED",
            message: `Demasiadas páginas para ${config.dpiPreset} DPI. O máximo é ${dpiCheck.limit} páginas.`,
            debugToken: generateDebugToken("PAGE_LIMIT_EXCEEDED"),
            recoverable: true,
          },
        });
        return;
      }
    }

    const jobId = crypto.randomUUID();
    currentJobIdRef.current = jobId;
    const docTitle = extractDocTitle(fileInfo.title, fileInfo.name);

    dispatch({ type: "START_PROCESSING", jobId });

    // Get file as ArrayBuffer
    const arrayBuffer = await fileInfo.file.arrayBuffer();

    // Send to worker
    const worker = getWorker();
    const message: MainToWorkerMessage =
      config.mode === "render"
        ? {
            type: "START_RENDER",
            payload: {
              file: arrayBuffer,
              password: passwordRef.current || undefined,
              dpiPreset: config.dpiPreset,
              pageNumbers: pageResult.pages,
              jobId,
              docTitle,
            },
          }
        : {
            type: "START_EXTRACT",
            payload: {
              file: arrayBuffer,
              password: passwordRef.current || undefined,
              minImagePx: config.minImagePx,
              pageNumbers: pageResult.pages,
              jobId,
              docTitle,
            },
          };

    // Transfer ArrayBuffer
    worker.postMessage(message, [arrayBuffer]);
  }, [state, getWorker]);

  // Cancel processing
  const cancel = useCallback(() => {
    if (currentJobIdRef.current && workerRef.current) {
      workerRef.current.postMessage({
        type: "CANCEL",
        jobId: currentJobIdRef.current,
      });
    }
    cleanup();
    dispatch({ type: "CANCEL" });
  }, [cleanup]);

  // Download ZIP
  const downloadZip = useCallback(async () => {
    if (state.status !== "DOWNLOAD_READY") return;

    dispatch({ type: "DOWNLOAD_STARTED" });

    const { result } = state;
    const filename = generateZipFilename(
      extractDocTitle(
        state.status === "DOWNLOAD_READY"
          ? undefined
          : undefined,
        "pdf"
      )
    );

    try {
      // Try File System Access API (Chromium)
      if ("showSaveFilePicker" in window) {
        try {
          const handle = await (window as unknown as { showSaveFilePicker: (opts: unknown) => Promise<FileSystemFileHandle> }).showSaveFilePicker({
            suggestedName: filename,
            types: [
              {
                description: "ZIP Archive",
                accept: { "application/zip": [".zip"] },
              },
            ],
          });
          const writable = await handle.createWritable();
          await writable.write(result.zipBlob);
          await writable.close();

          cleanup();
          dispatch({ type: "DOWNLOAD_COMPLETE" });
          return;
        } catch (e) {
          if ((e as Error).name === "AbortError") {
            // User cancelled - stay in DOWNLOAD_READY
            dispatch({ type: "RESET" });
            return;
          }
          // Fall through to blob URL method
        }
      }

      // Fallback: Blob URL + anchor click
      const a = document.createElement("a");
      a.href = result.zipUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Delay cleanup for download to start
      setTimeout(() => {
        cleanup();
        dispatch({ type: "DOWNLOAD_COMPLETE" });
      }, 2000);
    } catch {
      // Error during download
      dispatch({ type: "DOWNLOAD_COMPLETE" });
    }
  }, [state, cleanup]);

  // Reset
  const reset = useCallback(() => {
    cleanup();
    dispatch({ type: "RESET" });
  }, [cleanup]);

  // TTL expired handler
  const handleTTLExpired = useCallback(() => {
    cleanup();
    dispatch({ type: "TTL_EXPIRED" });
  }, [cleanup]);

  return {
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
  };
}

export type UsePDFConverterReturn = ReturnType<typeof usePDFConverter>;
