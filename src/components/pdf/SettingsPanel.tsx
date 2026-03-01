/**
 * Settings panel for PDF conversion options
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PDFConfig, DPIPreset, ConversionMode, PDFFileInfo } from "@utils/pdf/types";
import { DPI_PAGE_LIMITS } from "@utils/pdf/types";

interface Props {
  fileInfo: PDFFileInfo;
  config: PDFConfig;
  onConfigChange: (updates: Partial<PDFConfig>) => void;
  disabled?: boolean;
}

export default function SettingsPanel({
  fileInfo,
  config,
  onConfigChange,
  disabled,
}: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [rangeString, setRangeString] = useState("");
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(fileInfo.pageCount);
  const [rangeError, setRangeError] = useState<string | null>(null);

  // Reset page range when file changes
  useEffect(() => {
    setFromPage(1);
    setToPage(fileInfo.pageCount);
    setRangeString("");
    setRangeError(null);
    onConfigChange({
      pageRange: {
        type: "all",
        resolvedPages: Array.from({ length: fileInfo.pageCount }, (_, i) => i + 1),
      },
    });
  }, [fileInfo.pageCount, onConfigChange]);

  // Handle mode change
  const handleModeChange = useCallback(
    (mode: ConversionMode) => {
      onConfigChange({ mode });
    },
    [onConfigChange]
  );

  // Handle DPI change
  const handleDPIChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const dpi = parseInt(e.target.value, 10) as DPIPreset;
      onConfigChange({ dpiPreset: dpi });
    },
    [onConfigChange]
  );

  // Handle basic range change
  const handleBasicRangeChange = useCallback(
    (from: number, to: number) => {
      setFromPage(from);
      setToPage(to);
      setRangeError(null);

      if (from < 1 || to < 1) {
        setRangeError("Page numbers must be at least 1");
        return;
      }
      if (from > to) {
        setRangeError("'From' must be less than or equal to 'To'");
        return;
      }
      if (to > fileInfo.pageCount) {
        setRangeError(`PDF only has ${fileInfo.pageCount} pages`);
        return;
      }

      const pages = Array.from({ length: to - from + 1 }, (_, i) => from + i);
      onConfigChange({
        pageRange: {
          type: "basic",
          from,
          to,
          resolvedPages: pages,
        },
      });
    },
    [fileInfo.pageCount, onConfigChange]
  );

  // Handle advanced range change
  const handleAdvancedRangeChange = useCallback(
    (value: string) => {
      setRangeString(value);
      setRangeError(null);

      if (!value.trim()) {
        // Empty = all pages
        onConfigChange({
          pageRange: {
            type: "all",
            resolvedPages: Array.from({ length: fileInfo.pageCount }, (_, i) => i + 1),
          },
        });
        return;
      }

      // Parse range string
      const pages = new Set<number>();
      const parts = value.split(",").map(p => p.trim()).filter(Boolean);

      for (const part of parts) {
        if (part.includes("-")) {
          const [startStr, endStr] = part.split("-").map(s => s.trim());
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);

          if (isNaN(start) || isNaN(end)) {
            setRangeError(`Invalid range: "${part}"`);
            return;
          }
          if (start > end) {
            setRangeError(`Invalid range: "${part}" (start > end)`);
            return;
          }

          const clampedStart = Math.max(1, Math.min(start, fileInfo.pageCount));
          const clampedEnd = Math.max(1, Math.min(end, fileInfo.pageCount));

          for (let i = clampedStart; i <= clampedEnd; i++) {
            pages.add(i);
          }
        } else {
          const pageNum = parseInt(part, 10);
          if (isNaN(pageNum)) {
            setRangeError(`Invalid page number: "${part}"`);
            return;
          }
          const clampedPage = Math.max(1, Math.min(pageNum, fileInfo.pageCount));
          pages.add(clampedPage);
        }
      }

      const sortedPages = Array.from(pages).sort((a, b) => a - b);

      if (sortedPages.length === 0) {
        setRangeError("No valid pages in range");
        return;
      }

      onConfigChange({
        pageRange: {
          type: "advanced",
          rangeString: value,
          resolvedPages: sortedPages,
        },
      });
    },
    [fileInfo.pageCount, onConfigChange]
  );

  const maxPages = DPI_PAGE_LIMITS[config.dpiPreset];
  const currentPageCount = config.pageRange.resolvedPages.length;
  const exceedsLimit = config.mode === "render" && currentPageCount > maxPages;

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div>
        <label className="mb-2 block text-sm font-medium text-skin-base">
          Mode
        </label>
        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="render"
              checked={config.mode === "render"}
              onChange={() => handleModeChange("render")}
              disabled={disabled}
              className="h-4 w-4 accent-skin-accent"
            />
            <span className="text-skin-base">Render pages</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="extract"
              checked={config.mode === "extract"}
              onChange={() => handleModeChange("extract")}
              disabled={disabled}
              className="h-4 w-4 accent-skin-accent"
            />
            <span className="text-skin-base">Extract embedded images</span>
          </label>
        </div>
      </div>

      {/* DPI Selection (render mode only) */}
      {config.mode === "render" && (
        <div>
          <label
            htmlFor="dpi-select"
            className="mb-2 block text-sm font-medium text-skin-base"
          >
            Resolution
          </label>
          <select
            id="dpi-select"
            value={config.dpiPreset}
            onChange={handleDPIChange}
            disabled={disabled}
            className="w-full rounded border border-skin-line bg-skin-card p-2 text-skin-base focus-outline"
          >
            <option value={144}>144 DPI (Screen/Web) - Max {DPI_PAGE_LIMITS[144]} pages</option>
            <option value={200}>200 DPI (Standard Print) - Max {DPI_PAGE_LIMITS[200]} pages</option>
            <option value={300}>300 DPI (High Quality) - Max {DPI_PAGE_LIMITS[300]} pages</option>
          </select>
        </div>
      )}

      {/* Page Range */}
      <div>
        <label className="mb-2 block text-sm font-medium text-skin-base">
          Page Range
        </label>

        {/* Basic range inputs */}
        {!showAdvanced && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="from-page" className="text-sm text-skin-base">
                From:
              </label>
              <input
                id="from-page"
                type="number"
                min={1}
                max={fileInfo.pageCount}
                value={fromPage}
                onChange={e => handleBasicRangeChange(parseInt(e.target.value, 10) || 1, toPage)}
                disabled={disabled}
                className="w-20 rounded border border-skin-line bg-skin-card p-2 text-skin-base focus-outline"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="to-page" className="text-sm text-skin-base">
                To:
              </label>
              <input
                id="to-page"
                type="number"
                min={1}
                max={fileInfo.pageCount}
                value={toPage}
                onChange={e => handleBasicRangeChange(fromPage, parseInt(e.target.value, 10) || 1)}
                disabled={disabled}
                className="w-20 rounded border border-skin-line bg-skin-card p-2 text-skin-base focus-outline"
              />
            </div>
            <span className="text-sm text-skin-base opacity-70">
              of {fileInfo.pageCount}
            </span>
          </div>
        )}

        {/* Advanced toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-2 flex items-center gap-1 text-sm text-skin-accent hover:underline focus-outline"
          disabled={disabled}
        >
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showAdvanced ? "Hide advanced" : "Advanced"}
        </button>

        {/* Advanced range input */}
        {showAdvanced && (
          <div className="mt-2">
            <input
              type="text"
              value={rangeString}
              onChange={e => handleAdvancedRangeChange(e.target.value)}
              placeholder="e.g., 1-3, 8, 10-12"
              disabled={disabled}
              className="w-full rounded border border-skin-line bg-skin-card p-2 text-skin-base focus-outline"
              aria-describedby={rangeError ? "range-error" : undefined}
            />
            <p className="mt-1 text-xs text-skin-base opacity-70">
              Enter page numbers or ranges separated by commas
            </p>
          </div>
        )}

        {/* Range error */}
        {rangeError && (
          <p id="range-error" className="mt-2 text-sm text-red-500" role="alert">
            {rangeError}
          </p>
        )}

        {/* DPI limit warning */}
        {exceedsLimit && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            Too many pages for {config.dpiPreset} DPI. Maximum is {maxPages} pages.
            Reduce page range or select a lower DPI.
          </p>
        )}
      </div>

      {/* Selected pages summary */}
      <div className="rounded bg-skin-card p-3 text-sm text-skin-base">
        <strong>{currentPageCount}</strong> page{currentPageCount !== 1 ? "s" : ""} selected
        {config.mode === "render" && (
          <span className="text-skin-base opacity-70">
            {" "}&bull; Estimated ~{Math.round(currentPageCount * 2)} MB output
          </span>
        )}
      </div>
    </div>
  );
}
