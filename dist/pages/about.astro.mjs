import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as renderSlot, u as unescapeHTML } from '../chunks/astro/server_ywHERWku.mjs';
import 'piccolore';
import { S as SITE } from '../chunks/config_o6LvftIS.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_BfiIKnkN.mjs';
import { $ as $$Layout, a as $$Header, c as $$Footer } from '../chunks/Footer_CF2xFEDh.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://xani.me/");
const $$AboutLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AboutLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${frontmatter.title} | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "about" })} ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, {})} ${maybeRenderHead()}<main id="main-content"> <section id="about" class="prose mb-28 max-w-3xl prose-img:border-0"> <h1 class="text-2xl tracking-wider sm:text-3xl">${frontmatter.title}</h1> <img src="/xani.jpg" alt="Xani avatar" class="mb-6 w-64 h-64 rounded-full object-cover"> <h2 class="text-2xl tracking-wider sm:text-3xl">GitHub Activity</h2> <img src="https://ghchart.rshah.org/AlexandreXavier" alt="AlexandreXavier Github chart"> ${renderSlot($$result2, $$slots["default"])} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/layouts/AboutLayout.astro", void 0);

const html = () => "<p>A Software Developer with a passion for building innovative solutions and a spirit of adventure. I bring a unique perspective shaped by my love of sailing, where precision, problem-solving, and adaptability are paramount. Skilled in [mention technologies like: Go, Python, TypeScript, Lisp, Haxe etc.]. [<strong>I enjoy the creative process of transforming ideas into reality.</strong>] Seeking a challenging role where I can combine technical expertise with a drive for exploration. ⛵🖥️</p>\n<p>Or you can even give any feedback via my <a href=\"mailto:jalexandre.xavier@gmail.com\">email</a>.</p>";

				const frontmatter = {"layout":"../layouts/AboutLayout.astro","title":"About"};
				const file = "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/src/pages/about.md";
				const url = "/about";
				function rawContent() {
					return "   \n                                    \n              \n   \nA Software Developer with a passion for building innovative solutions and a spirit of adventure. I bring a unique perspective shaped by my love of sailing, where precision, problem-solving, and adaptability are paramount. Skilled in [mention technologies like: Go, Python, TypeScript, Lisp, Haxe etc.]. [**I enjoy the creative process of transforming ideas into reality.**] Seeking a challenging role where I can combine technical expertise with a drive for exploration. ⛵🖥️\n\n\nOr you can even give any feedback via my [email](mailto:jalexandre.xavier@gmail.com).\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$AboutLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html())}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
