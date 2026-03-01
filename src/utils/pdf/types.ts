// PDF Converter Types - Based on SPEC-v2.md

// ============================================
// CONFIGURATION
// ============================================

export type DPIPreset = 144 | 200 | 300;
export type ConversionMode = 'render' | 'extract';

export interface PDFConfig {
  mode: ConversionMode;
  dpiPreset: DPIPreset;
  pageRange: PageRange;
  password?: string;
  minImagePx: number; // Default 500 for extract mode
}

export interface PageRange {
  type: 'all' | 'basic' | 'advanced';
  from?: number;
  to?: number;
  rangeString?: string;
  resolvedPages: number[];
}

// DPI-based page limits from SPEC-v2
export const DPI_PAGE_LIMITS: Record<DPIPreset, number> = {
  144: 50,
  200: 30,
  300: 15,
};

// ============================================
// FILE & VALIDATION
// ============================================

export interface PDFFileInfo {
  file: File;
  name: string;
  sizeBytes: number;
  pageCount: number;
  title: string;
  isEncrypted: boolean;
}

export interface ValidationError {
  code: ValidationErrorCode;
  message: string;
  details?: {
    actual?: number;
    limit?: number;
    pageIndex?: number;
  };
}

export type ValidationErrorCode =
  | 'INVALID_TYPE'
  | 'SIZE_EXCEEDED'
  | 'PAGE_LIMIT_EXCEEDED'
  | 'PARSE_ERROR'
  | 'PASSWORD_REQUIRED'
  | 'PASSWORD_INCORRECT'
  | 'PASSWORD_MAX_RETRIES'
  | 'RENDER_ERROR'
  | 'MEMORY_ERROR'
  | 'DIMENSION_ERROR'
  | 'NO_IMAGES_FOUND'
  | 'WORKER_CRASH'
  | 'ZIP_ERROR';

// ============================================
// STATE MACHINE
// ============================================

export type ConverterStatus =
  | 'IDLE'
  | 'VALIDATING'
  | 'AWAITING_PASSWORD'
  | 'READY_TO_PROCESS'
  | 'PROCESSING'
  | 'DOWNLOAD_READY'
  | 'DOWNLOADING'
  | 'ERROR'
  | 'CANCELLED';

export type ProcessingPhase =
  | 'parsing'
  | 'rendering'
  | 'extracting'
  | 'zipping'
  | 'finalizing';

export interface ProgressInfo {
  phase: ProcessingPhase;
  current: number;
  total: number;
  percent: number;
}

export interface ResultInfo {
  zipBlob: Blob;
  zipUrl: string;
  itemCount: number;
  zipSizeBytes: number;
  durationMs: number;
  duplicatesSkipped?: number;
  filename: string;
}

export interface ErrorInfo {
  code: ValidationErrorCode;
  message: string;
  debugToken: string;
  recoverable: boolean;
  pageIndex?: number;
}

// ============================================
// STATE DEFINITIONS
// ============================================

export type ConverterState =
  | { status: 'IDLE' }
  | { status: 'VALIDATING'; file: File }
  | { status: 'AWAITING_PASSWORD'; file: File; pageCount: number; title: string; passwordAttempts: number }
  | { status: 'READY_TO_PROCESS'; fileInfo: PDFFileInfo }
  | { status: 'PROCESSING'; fileInfo: PDFFileInfo; progress: ProgressInfo; jobId: string }
  | { status: 'DOWNLOAD_READY'; result: ResultInfo; ttlExpires: number }
  | { status: 'DOWNLOADING' }
  | { status: 'ERROR'; error: ErrorInfo }
  | { status: 'CANCELLED' };

// ============================================
// ACTIONS
// ============================================

export type ConverterAction =
  | { type: 'FILE_DROPPED'; file: File }
  | { type: 'VALIDATION_SUCCESS'; fileInfo: PDFFileInfo }
  | { type: 'PASSWORD_REQUIRED'; pageCount: number; title: string }
  | { type: 'PASSWORD_ENTERED'; password: string }
  | { type: 'VALIDATION_ERROR'; error: ErrorInfo }
  | { type: 'START_PROCESSING'; jobId: string }
  | { type: 'PROGRESS'; progress: ProgressInfo }
  | { type: 'PROCESSING_COMPLETE'; result: ResultInfo; ttlExpires: number }
  | { type: 'PROCESSING_ERROR'; error: ErrorInfo }
  | { type: 'DOWNLOAD_STARTED' }
  | { type: 'DOWNLOAD_COMPLETE' }
  | { type: 'CANCEL' }
  | { type: 'TTL_EXPIRED' }
  | { type: 'RESET' };

// ============================================
// WORKER PROTOCOL
// ============================================

// Main Thread → Worker
export type MainToWorkerMessage =
  | {
      type: 'START_RENDER';
      payload: {
        file: ArrayBuffer;
        password?: string;
        dpiPreset: DPIPreset;
        pageNumbers: number[];
        jobId: string;
        docTitle: string;
      };
    }
  | {
      type: 'START_EXTRACT';
      payload: {
        file: ArrayBuffer;
        password?: string;
        minImagePx: number;
        pageNumbers: number[];
        jobId: string;
        docTitle: string;
      };
    }
  | { type: 'CANCEL'; jobId: string };

// Worker → Main Thread
export type WorkerToMainMessage =
  | {
      type: 'PROGRESS';
      payload: {
        jobId: string;
        phase: ProcessingPhase;
        current: number;
        total: number;
        percent: number;
      };
    }
  | {
      type: 'READY';
      payload: {
        jobId: string;
        zipBlob: Blob;
        metadata: {
          itemCount: number;
          zipSizeBytes: number;
          durationMs: number;
          duplicatesSkipped?: number;
        };
      };
    }
  | {
      type: 'ERROR';
      payload: {
        jobId: string;
        code: ValidationErrorCode;
        message: string;
        debugToken: string;
        recoverable: boolean;
        phase?: ProcessingPhase;
        pageIndex?: number;
      };
    };

// ============================================
// CONSTANTS
// ============================================

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
export const MAX_DIMENSION_PX = 10000;
export const TTL_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_PASSWORD_ATTEMPTS = 5;
export const MIN_IMAGE_DIMENSION_PX = 500;
