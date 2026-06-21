import { describe, it, expect } from "vitest";
import { extractNarrationText } from "./extractNarrationText";

describe("extractNarrationText", () => {
  it("reads the title first, then the prose", () => {
    const out = extractNarrationText({
      title: "O Fim da IA Centralizada",
      body: "A primeira frase do artigo.",
    });
    expect(out).toBe("O Fim da IA Centralizada. A primeira frase do artigo.");
  });

  it("does not duplicate terminal punctuation after the title", () => {
    const out = extractNarrationText({ title: "Olá!", body: "Corpo." });
    expect(out).toBe("Olá. Corpo.");
  });

  it("omits fenced code blocks entirely", () => {
    const body = [
      "Antes do código.",
      "",
      "```js",
      "const x = 1;",
      "console.log(x);",
      "```",
      "",
      "Depois do código.",
    ].join("\n");
    const out = extractNarrationText({ title: "T", body });
    expect(out).not.toContain("const x");
    expect(out).not.toContain("console.log");
    expect(out).toBe("T. Antes do código. Depois do código.");
  });

  it("keeps inline code as its literal text", () => {
    const out = extractNarrationText({
      title: "T",
      body: "Usa `npm run tts` agora.",
    });
    expect(out).toBe("T. Usa npm run tts agora.");
  });

  it("drops the auto-generated table of contents heading", () => {
    const body = ["## Table of contents", "", "Conteúdo real."].join("\n");
    const out = extractNarrationText({ title: "T", body });
    expect(out.toLowerCase()).not.toContain("table of contents");
    expect(out).toBe("T. Conteúdo real.");
  });

  it("removes images but keeps surrounding prose", () => {
    const body = "Veja ![diagrama](https://example.com/a.png) aqui.";
    const out = extractNarrationText({ title: "T", body });
    expect(out).toBe("T. Veja aqui.");
  });

  it("keeps link text and drops the url", () => {
    const out = extractNarrationText({
      title: "T",
      body: "Veja a [topologia](https://pt.wikipedia.org/wiki/x) da rede.",
    });
    expect(out).toBe("T. Veja a topologia da rede.");
  });

  it("strips bare urls", () => {
    const out = extractNarrationText({
      title: "T",
      body: "Fonte: https://example.com/page acabou.",
    });
    expect(out).toBe("T. Fonte: acabou.");
  });

  it("removes emphasis, heading and list markers", () => {
    const body = [
      "# Secção",
      "",
      "Texto **forte** e _suave_.",
      "",
      "- primeiro",
      "- segundo",
    ].join("\n");
    const out = extractNarrationText({ title: "T", body });
    expect(out).toBe("T. Secção Texto forte e suave. primeiro segundo");
  });

  it("collapses blank lines and stray whitespace", () => {
    const body = "Uma   frase.\n\n\n\nOutra frase.";
    const out = extractNarrationText({ title: "T", body });
    expect(out).toBe("T. Uma frase. Outra frase.");
  });
});
