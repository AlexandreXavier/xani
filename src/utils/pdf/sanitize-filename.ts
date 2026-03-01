/**
 * Sanitize a string for use as a filename.
 * Based on SPEC-v2.md Section 7.5
 */

// Windows reserved names
const WINDOWS_RESERVED = new Set([
  'CON', 'PRN', 'AUX', 'NUL',
  'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
  'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9',
]);

// Invalid filename characters
const INVALID_CHARS = /[<>:"/\\|?*]/g;

// Control characters (0x00-0x1F)
const CONTROL_CHARS = /[\x00-\x1F]/g;

// Multiple spaces
const MULTIPLE_SPACES = /\s+/g;

// Trailing dots and spaces
const TRAILING_DOTS_SPACES = /[.\s]+$/;

export function sanitizeFilename(input: string, fallback = 'untitled'): string {
  let result = input;

  // 1. Remove/replace invalid characters
  result = result.replace(INVALID_CHARS, '');

  // 2. Remove control characters
  result = result.replace(CONTROL_CHARS, '');

  // 3. Replace newlines/tabs with spaces
  result = result.replace(/[\n\r\t]/g, ' ');

  // 4. Collapse multiple spaces to single space
  result = result.replace(MULTIPLE_SPACES, ' ');

  // 5. Trim whitespace
  result = result.trim();

  // 6. Truncate to 100 characters
  if (result.length > 100) {
    result = result.substring(0, 100);
  }

  // 7. Remove trailing dots and spaces (after truncation)
  result = result.replace(TRAILING_DOTS_SPACES, '');

  // 8. Check for Windows reserved names
  const upperResult = result.toUpperCase();
  if (WINDOWS_RESERVED.has(upperResult) || WINDOWS_RESERVED.has(upperResult.split('.')[0])) {
    result = `${result}_file`;
  }

  // 9. If empty after sanitization, use fallback
  if (!result) {
    result = fallback;
  }

  return result;
}

/**
 * Extract document title from PDF metadata or filename
 */
export function extractDocTitle(pdfTitle: string | undefined, filename: string): string {
  // Try PDF metadata title first
  if (pdfTitle && pdfTitle.trim()) {
    return sanitizeFilename(pdfTitle);
  }

  // Fall back to filename without extension
  const nameWithoutExt = filename.replace(/\.pdf$/i, '');
  if (nameWithoutExt && nameWithoutExt.trim()) {
    return sanitizeFilename(nameWithoutExt);
  }

  return 'untitled';
}

/**
 * Generate output filename for rendered pages
 */
export function generatePageFilename(docTitle: string, pageNum: number): string {
  const paddedPage = String(pageNum).padStart(3, '0');
  return `${docTitle}_page-${paddedPage}.png`;
}

/**
 * Generate output filename for extracted images
 */
export function generateImageFilename(docTitle: string, pageNum: number, imageIndex: number): string {
  const paddedPage = String(pageNum).padStart(3, '0');
  const paddedIndex = String(imageIndex).padStart(2, '0');
  return `${docTitle}_p${paddedPage}_img${paddedIndex}.png`;
}

/**
 * Generate ZIP filename
 */
export function generateZipFilename(docTitle: string): string {
  return `${docTitle}_images.zip`;
}
