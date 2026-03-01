/**
 * Parse page range strings into arrays of page numbers.
 * Based on SPEC-v2.md Section 6.4
 */

import type { PageRange, DPIPreset } from './types';
import { DPI_PAGE_LIMITS } from './types';

export interface ParseResult {
  valid: boolean;
  pages: number[];
  error?: string;
  warnings: string[];
}

/**
 * Parse a range string like "1-3, 8, 10-12" into an array of page numbers.
 * - Invalid syntax shows error
 * - Out-of-bounds values are clamped with warning
 * - Empty result is an error
 */
export function parseRangeString(
  rangeString: string,
  totalPages: number
): ParseResult {
  const warnings: string[] = [];
  const pages = new Set<number>();

  if (!rangeString.trim()) {
    return { valid: false, pages: [], error: 'Range string is empty', warnings };
  }

  // Split by comma and process each part
  const parts = rangeString.split(',').map(p => p.trim()).filter(Boolean);

  for (const part of parts) {
    // Check if it's a range (contains dash)
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-').map(s => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);

      if (isNaN(start) || isNaN(end)) {
        return { valid: false, pages: [], error: `Invalid range: "${part}"`, warnings };
      }

      if (start > end) {
        return { valid: false, pages: [], error: `Invalid range: "${part}" (start > end)`, warnings };
      }

      // Clamp to valid range
      const clampedStart = Math.max(1, Math.min(start, totalPages));
      const clampedEnd = Math.max(1, Math.min(end, totalPages));

      if (clampedStart !== start || clampedEnd !== end) {
        warnings.push(`Range "${part}" clamped to ${clampedStart}-${clampedEnd}`);
      }

      for (let i = clampedStart; i <= clampedEnd; i++) {
        pages.add(i);
      }
    } else {
      // Single page number
      const pageNum = parseInt(part, 10);

      if (isNaN(pageNum)) {
        return { valid: false, pages: [], error: `Invalid page number: "${part}"`, warnings };
      }

      // Clamp to valid range
      const clampedPage = Math.max(1, Math.min(pageNum, totalPages));
      if (clampedPage !== pageNum) {
        warnings.push(`Page ${pageNum} clamped to ${clampedPage}`);
      }

      pages.add(clampedPage);
    }
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);

  if (sortedPages.length === 0) {
    return { valid: false, pages: [], error: 'No valid pages in range', warnings };
  }

  return { valid: true, pages: sortedPages, warnings };
}

/**
 * Resolve a PageRange configuration to an array of page numbers.
 */
export function resolvePageRange(
  pageRange: Omit<PageRange, 'resolvedPages'>,
  totalPages: number
): ParseResult {
  const warnings: string[] = [];

  if (pageRange.type === 'all') {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return { valid: true, pages, warnings };
  }

  if (pageRange.type === 'basic') {
    const from = pageRange.from ?? 1;
    const to = pageRange.to ?? totalPages;

    if (from < 1 || to < 1) {
      return { valid: false, pages: [], error: 'Page numbers must be at least 1', warnings };
    }

    if (from > to) {
      return { valid: false, pages: [], error: '"From" must be less than or equal to "To"', warnings };
    }

    const clampedFrom = Math.min(from, totalPages);
    const clampedTo = Math.min(to, totalPages);

    if (clampedFrom !== from || clampedTo !== to) {
      warnings.push(`Range clamped to ${clampedFrom}-${clampedTo} (PDF has ${totalPages} pages)`);
    }

    const pages = Array.from({ length: clampedTo - clampedFrom + 1 }, (_, i) => clampedFrom + i);
    return { valid: true, pages, warnings };
  }

  if (pageRange.type === 'advanced') {
    if (!pageRange.rangeString) {
      return { valid: false, pages: [], error: 'No range string provided', warnings };
    }
    return parseRangeString(pageRange.rangeString, totalPages);
  }

  return { valid: false, pages: [], error: 'Unknown range type', warnings };
}

/**
 * Check if page count exceeds DPI limit
 */
export function checkDPIPageLimit(
  pageCount: number,
  dpi: DPIPreset
): { allowed: boolean; limit: number } {
  const limit = DPI_PAGE_LIMITS[dpi];
  return { allowed: pageCount <= limit, limit };
}

/**
 * Get the maximum allowed pages for a DPI setting
 */
export function getMaxPagesForDPI(dpi: DPIPreset): number {
  return DPI_PAGE_LIMITS[dpi];
}
