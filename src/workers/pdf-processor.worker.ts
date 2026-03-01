/**
 * PDF Processor Web Worker
 * Handles PDF rendering and image extraction in a separate thread
 * Based on SPEC-v2.md
 */

import * as pdfjsLib from "pdfjs-dist";
import { BlobWriter, BlobReader, ZipWriter } from "@zip.js/zip.js";
import type {
  MainToWorkerMessage,
  WorkerToMainMessage,
  ProcessingPhase,
  DPIPreset,
  ValidationErrorCode,
} from "@utils/pdf/types";
import {
  generatePageFilename,
  generateImageFilename,
} from "@utils/pdf/sanitize-filename";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href;

// Constants from SPEC-v2
const MAX_DIMENSION_PX = 10000;
const CONCURRENT_PAGES = 3;

// Phase weights for progress calculation
const PHASE_WEIGHTS = {
  parsing: { start: 0, end: 5 },
  rendering: { start: 5, end: 85 },
  extracting: { start: 5, end: 85 },
  zipping: { start: 85, end: 98 },
  finalizing: { start: 98, end: 100 },
} as const;

// State
let currentJobId: string | null = null;
let abortController: AbortController | null = null;

// Semaphore for bounded concurrency
function createSemaphore(max: number) {
  let current = 0;
  const queue: (() => void)[] = [];

  return {
    async acquire(): Promise<void> {
      if (current < max) {
        current++;
        return;
      }
      return new Promise(resolve => queue.push(resolve));
    },
    release(): void {
      current--;
      const next = queue.shift();
      if (next) {
        current++;
        next();
      }
    },
  };
}

// Progress reporter with throttling
class ProgressReporter {
  private lastUpdateTime = 0;
  private lastPhase: ProcessingPhase | null = null;
  private readonly minIntervalMs = 250;

  constructor(private jobId: string) {}

  report(phase: ProcessingPhase, current: number, total: number): void {
    const now = Date.now();
    const isFirst = current === 0;
    const isLast = current === total;
    const isPhaseChange = this.lastPhase !== phase;
    const intervalElapsed = now - this.lastUpdateTime >= this.minIntervalMs;

    if (isFirst || isLast || isPhaseChange || intervalElapsed) {
      const percent = this.calculatePercent(phase, current, total);
      self.postMessage({
        type: "PROGRESS",
        payload: {
          jobId: this.jobId,
          phase,
          current,
          total,
          percent,
        },
      } satisfies WorkerToMainMessage);
      this.lastUpdateTime = now;
      this.lastPhase = phase;
    }
  }

  private calculatePercent(
    phase: ProcessingPhase,
    current: number,
    total: number
  ): number {
    const { start, end } = PHASE_WEIGHTS[phase];
    if (total === 0) return start;
    const phaseProgress = Math.min(current / total, 1);
    return Math.round(start + phaseProgress * (end - start));
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
  const codePart = Math.abs(hash).toString(36).toUpperCase().slice(0, 4).padStart(4, "0");
  return `${timePart}${codePart}`;
}

// Send error message
function sendError(
  jobId: string,
  code: ValidationErrorCode,
  message: string,
  recoverable: boolean,
  phase?: ProcessingPhase,
  pageIndex?: number
): void {
  self.postMessage({
    type: "ERROR",
    payload: {
      jobId,
      code,
      message,
      debugToken: generateDebugToken(code),
      recoverable,
      phase,
      pageIndex,
    },
  } satisfies WorkerToMainMessage);
}

// Load PDF document
async function loadPDF(
  arrayBuffer: ArrayBuffer,
  password?: string
): Promise<pdfjsLib.PDFDocumentProxy> {
  const data = new Uint8Array(arrayBuffer);
  const loadingTask = pdfjsLib.getDocument({
    data,
    password,
    isEvalSupported: false,
    disableFontFace: false,
    disableWorker: true,
  } as Parameters<typeof pdfjsLib.getDocument>[0]);

  return loadingTask.promise;
}

// Render pages to PNG and stream to ZIP
async function renderPagesToZip(
  doc: pdfjsLib.PDFDocumentProxy,
  pageNumbers: number[],
  dpiPreset: DPIPreset,
  docTitle: string,
  jobId: string,
  signal: AbortSignal
): Promise<Blob> {
  const scale = dpiPreset / 72;
  const reporter = new ProgressReporter(jobId);
  const semaphore = createSemaphore(CONCURRENT_PAGES);

  // Create ZIP writer
  const blobWriter = new BlobWriter("application/zip");
  const zipWriter = new ZipWriter(blobWriter, { level: 6 });

  reporter.report("parsing", 0, 1);
  reporter.report("parsing", 1, 1);

  let completedCount = 0;
  const totalPages = pageNumbers.length;

  // Process pages with bounded parallelism
  const promises = pageNumbers.map(async (pageNum) => {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");

    await semaphore.acquire();

    try {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");

      const page = await doc.getPage(pageNum);

      // Get viewport with rotation
      let viewport = page.getViewport({
        scale: scale,
        rotation: page.rotate,
      });

      // Check dimension cap
      let actualScale = scale;
      if (viewport.width > MAX_DIMENSION_PX || viewport.height > MAX_DIMENSION_PX) {
        const reductionFactor =
          MAX_DIMENSION_PX / Math.max(viewport.width, viewport.height);
        actualScale = scale * reductionFactor;
        viewport = page.getViewport({
          scale: actualScale,
          rotation: page.rotate,
        });
      }

      // Create OffscreenCanvas
      const canvas = new OffscreenCanvas(
        Math.floor(viewport.width),
        Math.floor(viewport.height)
      );
      const ctx = canvas.getContext("2d", { alpha: true });

      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // Render page
      await page.render({
        canvasContext: ctx as unknown as CanvasRenderingContext2D,
        canvas: canvas as unknown as HTMLCanvasElement,
        viewport: viewport,
        background: "rgba(0,0,0,0)",
      }).promise;

      // Convert to PNG blob
      const pngBlob = await canvas.convertToBlob({ type: "image/png" });

      // Add to ZIP
      const filename = generatePageFilename(docTitle, pageNum);
      await zipWriter.add(filename, new BlobReader(pngBlob));

      // Cleanup
      page.cleanup();

      completedCount++;
      reporter.report("rendering", completedCount, totalPages);
    } finally {
      semaphore.release();
    }
  });

  await Promise.all(promises);

  if (signal.aborted) throw new DOMException("Aborted", "AbortError");

  reporter.report("zipping", totalPages, totalPages);
  reporter.report("finalizing", 0, 1);

  const zipBlob = await zipWriter.close();

  reporter.report("finalizing", 1, 1);

  return zipBlob;
}

// Extract embedded images to ZIP
async function extractImagesToZip(
  doc: pdfjsLib.PDFDocumentProxy,
  pageNumbers: number[],
  minImagePx: number,
  docTitle: string,
  jobId: string,
  signal: AbortSignal
): Promise<{ zipBlob: Blob; duplicatesSkipped: number }> {
  const reporter = new ProgressReporter(jobId);
  const seenHashes = new Set<string>();
  let duplicatesSkipped = 0;
  const imageCounter = new Map<number, number>();

  // Create ZIP writer
  const blobWriter = new BlobWriter("application/zip");
  const zipWriter = new ZipWriter(blobWriter, { level: 6 });

  reporter.report("parsing", 0, 1);
  reporter.report("parsing", 1, 1);

  let processedPages = 0;
  const totalPages = pageNumbers.length;

  for (const pageNum of pageNumbers) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");

    const page = await doc.getPage(pageNum);
    const operatorList = await page.getOperatorList();

    // Find image objects
    for (let i = 0; i < operatorList.fnArray.length; i++) {
      const fn = operatorList.fnArray[i];

      // OPS.paintImageXObject = 85
      if (fn === 85) {
        const args = operatorList.argsArray[i];
        if (!args || !args[0]) continue;

        const imgName = args[0];

        try {
          // Get image data from page objects
          const imgData = await new Promise<{
            width: number;
            height: number;
            data: Uint8ClampedArray;
          }>((resolve, reject) => {
            page.objs.get(imgName, (data: unknown) => {
              if (data && typeof data === "object" && "width" in data) {
                resolve(data as { width: number; height: number; data: Uint8ClampedArray });
              } else {
                reject(new Error("Invalid image data"));
              }
            });
          });

          // Check dimensions
          if (imgData.width < minImagePx || imgData.height < minImagePx) {
            continue;
          }

          // Compute hash for deduplication
          const dataBuffer = new Uint8Array(imgData.data).buffer;
          const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

          if (seenHashes.has(hash)) {
            duplicatesSkipped++;
            continue;
          }
          seenHashes.add(hash);

          // Create canvas and draw image
          const canvas = new OffscreenCanvas(imgData.width, imgData.height);
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          const imageData = new ImageData(
            new Uint8ClampedArray(imgData.data),
            imgData.width,
            imgData.height
          );
          ctx.putImageData(imageData, 0, 0);

          // Convert to PNG
          const pngBlob = await canvas.convertToBlob({ type: "image/png" });

          // Generate filename
          const imageIndex = (imageCounter.get(pageNum) || 0) + 1;
          imageCounter.set(pageNum, imageIndex);
          const filename = generateImageFilename(docTitle, pageNum, imageIndex);

          await zipWriter.add(filename, new BlobReader(pngBlob));
        } catch {
          // Skip images that fail to extract
          continue;
        }
      }
    }

    page.cleanup();
    processedPages++;
    reporter.report("extracting", processedPages, totalPages);
  }

  if (signal.aborted) throw new DOMException("Aborted", "AbortError");

  reporter.report("zipping", totalPages, totalPages);
  reporter.report("finalizing", 0, 1);

  const zipBlob = await zipWriter.close();

  reporter.report("finalizing", 1, 1);

  return { zipBlob, duplicatesSkipped };
}

// Handle START_RENDER message
async function handleStartRender(
  payload: Extract<MainToWorkerMessage, { type: "START_RENDER" }>["payload"]
): Promise<void> {
  const { file, password, dpiPreset, pageNumbers, jobId, docTitle } = payload;
  currentJobId = jobId;
  abortController = new AbortController();
  const signal = abortController.signal;
  const startTime = Date.now();

  try {
    const doc = await loadPDF(file, password);

    const zipBlob = await renderPagesToZip(
      doc,
      pageNumbers,
      dpiPreset,
      docTitle,
      jobId,
      signal
    );

    await doc.destroy();

    self.postMessage({
      type: "READY",
      payload: {
        jobId,
        zipBlob,
        metadata: {
          itemCount: pageNumbers.length,
          zipSizeBytes: zipBlob.size,
          durationMs: Date.now() - startTime,
        },
      },
    } satisfies WorkerToMainMessage);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return; // Cancelled, no error to report
    }

    const err = error as Error & { name?: string; code?: number };

    if (err.name === "PasswordException") {
      sendError(
        jobId,
        err.code === 1 ? "PASSWORD_REQUIRED" : "PASSWORD_INCORRECT",
        err.code === 1
          ? "This PDF is password-protected."
          : "Incorrect password. Please try again.",
        true
      );
      return;
    }

    sendError(
      jobId,
      "RENDER_ERROR",
      `Failed to render PDF: ${err.message}`,
      true,
      "rendering"
    );
  }
}

// Handle START_EXTRACT message
async function handleStartExtract(
  payload: Extract<MainToWorkerMessage, { type: "START_EXTRACT" }>["payload"]
): Promise<void> {
  const { file, password, minImagePx, pageNumbers, jobId, docTitle } = payload;
  currentJobId = jobId;
  abortController = new AbortController();
  const signal = abortController.signal;
  const startTime = Date.now();

  try {
    const doc = await loadPDF(file, password);

    const { zipBlob, duplicatesSkipped } = await extractImagesToZip(
      doc,
      pageNumbers,
      minImagePx,
      docTitle,
      jobId,
      signal
    );

    await doc.destroy();

    // Check if any images were found
    if (zipBlob.size < 100) {
      // Empty or nearly empty ZIP
      sendError(
        jobId,
        "NO_IMAGES_FOUND",
        `No images found matching criteria (minimum ${minImagePx}×${minImagePx} pixels). This PDF may contain only vector graphics.`,
        false
      );
      return;
    }

    self.postMessage({
      type: "READY",
      payload: {
        jobId,
        zipBlob,
        metadata: {
          itemCount: pageNumbers.length,
          zipSizeBytes: zipBlob.size,
          durationMs: Date.now() - startTime,
          duplicatesSkipped,
        },
      },
    } satisfies WorkerToMainMessage);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return;
    }

    const err = error as Error & { name?: string; code?: number };

    if (err.name === "PasswordException") {
      sendError(
        jobId,
        err.code === 1 ? "PASSWORD_REQUIRED" : "PASSWORD_INCORRECT",
        err.code === 1
          ? "This PDF is password-protected."
          : "Incorrect password. Please try again.",
        true
      );
      return;
    }

    sendError(
      jobId,
      "RENDER_ERROR",
      `Failed to extract images: ${err.message}`,
      true,
      "extracting"
    );
  }
}

// Handle CANCEL message
function handleCancel(jobId: string): void {
  if (currentJobId === jobId && abortController) {
    abortController.abort();
    currentJobId = null;
    abortController = null;
  }
}

// Message handler
self.onmessage = async (event: MessageEvent<MainToWorkerMessage>) => {
  const message = event.data;

  switch (message.type) {
    case "START_RENDER":
      await handleStartRender(message.payload);
      break;
    case "START_EXTRACT":
      await handleStartExtract(message.payload);
      break;
    case "CANCEL":
      handleCancel(message.jobId);
      break;
  }
};

// Error handler
self.onerror = (error) => {
  if (currentJobId) {
    sendError(
      currentJobId,
      "WORKER_CRASH",
      "Processing failed unexpectedly. Please try again.",
      true
    );
  }
  console.error("Worker error:", error);
};
