import { describe, it, expect } from "vitest";
import {
  planNarration,
  hashNarrationText,
  type NarrationManifest,
} from "./narrationManifest";

const post = (slug: string, hash: string, hasAudio: boolean) => ({
  slug,
  hash,
  hasAudio,
});

describe("planNarration", () => {
  it("generates when there is no manifest entry", () => {
    const { decisions } = planNarration([post("a", "h1", false)], {});
    expect(decisions).toEqual([{ slug: "a", action: "generate" }]);
  });

  it("generates when the manifest entry exists but the mp3 is missing", () => {
    const manifest: NarrationManifest = { a: { hash: "h1" } };
    const { decisions } = planNarration([post("a", "h1", false)], manifest);
    expect(decisions).toEqual([{ slug: "a", action: "generate" }]);
  });

  it("regenerates when the text hash changed", () => {
    const manifest: NarrationManifest = { a: { hash: "old" } };
    const { decisions } = planNarration([post("a", "new", true)], manifest);
    expect(decisions).toEqual([{ slug: "a", action: "regenerate" }]);
  });

  it("skips when hash matches and the mp3 exists", () => {
    const manifest: NarrationManifest = { a: { hash: "h1" } };
    const { decisions } = planNarration([post("a", "h1", true)], manifest);
    expect(decisions).toEqual([{ slug: "a", action: "skip" }]);
  });

  it("forces (re)generation of every post regardless of hash", () => {
    const manifest: NarrationManifest = { a: { hash: "h1" } };
    const { decisions } = planNarration(
      [post("a", "h1", true), post("b", "h2", false)],
      manifest,
      { force: true },
    );
    expect(decisions).toEqual([
      { slug: "a", action: "regenerate" },
      { slug: "b", action: "generate" },
    ]);
  });

  it("writes the current hash into nextManifest for every post", () => {
    const { nextManifest } = planNarration(
      [post("a", "h1", true), post("b", "h2", false)],
      { a: { hash: "h1" } },
    );
    expect(nextManifest).toEqual({ a: { hash: "h1" }, b: { hash: "h2" } });
  });

  it("prunes manifest entries for posts that no longer exist", () => {
    const manifest: NarrationManifest = {
      gone: { hash: "x" },
      a: { hash: "h1" },
    };
    const { nextManifest } = planNarration([post("a", "h1", true)], manifest);
    expect(nextManifest).toEqual({ a: { hash: "h1" } });
    expect(nextManifest.gone).toBeUndefined();
  });
});

describe("hashNarrationText", () => {
  it("is stable for the same text and differs for different text", () => {
    expect(hashNarrationText("hello")).toBe(hashNarrationText("hello"));
    expect(hashNarrationText("hello")).not.toBe(hashNarrationText("world"));
  });
});
