import { describe, it, expect } from "vitest";
import { isNoteVisible } from "./noteVisibility";

describe("isNoteVisible", () => {
  it("hides drafts in production", () => {
    expect(isNoteVisible({ draft: true }, { dev: false })).toBe(false);
  });

  it("shows drafts in dev for preview", () => {
    expect(isNoteVisible({ draft: true }, { dev: true })).toBe(true);
  });

  it("shows published notes in production", () => {
    expect(isNoteVisible({ draft: false }, { dev: false })).toBe(true);
  });

  it("treats a missing draft flag as published", () => {
    expect(isNoteVisible({}, { dev: false })).toBe(true);
  });
});
