import { b as createAstro, c as createComponent, r as renderComponent, g as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { S as SITE } from '../chunks/config_o6LvftIS.mjs';
import { $ as $$Layout, a as $$Header, c as $$Footer } from '../chunks/Footer_CF2xFEDh.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://xani.me/");
const $$TempoChart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TempoChart;
  const {
    city = { latitude: 41.1496, longitude: -8.611, name: "Porto" },
    height = "600px"
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "tempo-chart", "tempo-chart", { "data-city": JSON.stringify(city), "style": `height: ${height}`, "class": "astro-yeqez3c4" }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="chart-container astro-yeqez3c4"> <div class="chart-card astro-yeqez3c4"> <div class="chart-wrapper astro-yeqez3c4"> <div class="chart-loading astro-yeqez3c4"> <div class="spinner astro-yeqez3c4"></div> <span class="astro-yeqez3c4">A carregar dados climáticos...</span> </div> <div class="chart-error astro-yeqez3c4"> <div class="error-icon astro-yeqez3c4">⚠️</div> <div class="error-message astro-yeqez3c4">Falha ao carregar dados climáticos. Verifique a sua ligação e tente novamente.</div> <button class="retry-btn astro-yeqez3c4" id="retryBtn">Tentar novamente</button> </div> </div> </div> <div class="legend-container astro-yeqez3c4"> <div class="legend-item astro-yeqez3c4" data-type="temperature"> <div class="legend-color astro-yeqez3c4" style="background: #DC2626;"></div> <span class="legend-text astro-yeqez3c4">temperatura</span> </div> <div class="legend-item astro-yeqez3c4" data-type="wind"> <div class="legend-color astro-yeqez3c4" style="background: #6B7280;"></div> <span class="legend-text astro-yeqez3c4">vento</span> </div> <div class="legend-toggle astro-yeqez3c4" id="viewModeToggle"> <span class="legend-text astro-yeqez3c4" id="viewModeText">simples</span> </div> </div> <p class="instructions astro-yeqez3c4">Arraste para rodar</p> <div class="action-buttons astro-yeqez3c4"> <button class="share-btn astro-yeqez3c4" id="shareBtn"> <svg viewBox="0 0 24 24" class="astro-yeqez3c4"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" class="astro-yeqez3c4"></path></svg> <span id="shareBtnText" class="astro-yeqez3c4">Partilhar</span> </button> </div> </div> ` })}  <!-- Three.js loaded dynamically to ensure proper order --> ${renderScript($$result, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/TempoChart.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/components/TempoChart.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Tempo | ${SITE.title}`, "class": "astro-5n3fmtoy" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "tempo", "class": "astro-5n3fmtoy" })} ${maybeRenderHead()}<main id="main-content" class="tempo-main astro-5n3fmtoy"> ${renderComponent($$result2, "TempoChart", $$TempoChart, { "class": "astro-5n3fmtoy" })} </main> ${renderComponent($$result2, "Footer", $$Footer, { "class": "astro-5n3fmtoy" })} ` })} `;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/tempo/index.astro", void 0);

const $$file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/tempo/index.astro";
const $$url = "/tempo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
