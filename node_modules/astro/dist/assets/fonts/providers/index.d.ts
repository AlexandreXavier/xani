import type { providers } from 'unifont';
import type { AstroFontProvider } from '../types.js';
/** [Adobe](https://fonts.adobe.com/) */
declare function adobe(config: Parameters<typeof providers.adobe>[0]): AstroFontProvider;
/** [Bunny](https://fonts.bunny.net/) */
declare function bunny(): AstroFontProvider;
/** [Fontshare](https://www.fontshare.com/) */
declare function fontshare(): AstroFontProvider;
/** [Fontsource](https://fontsource.org/) */
declare function fontsource(): AstroFontProvider;
/** [Google](https://fonts.google.com/) */
declare function google(config?: Parameters<typeof providers.google>[0]): AstroFontProvider;
/**
 * Astro re-exports most [unifont](https://github.com/unjs/unifont/) providers:
 * - [Adobe](https://fonts.adobe.com/)
 * - [Bunny](https://fonts.bunny.net/)
 * - [Fontshare](https://www.fontshare.com/)
 * - [Fontsource](https://fontsource.org/)
 * - [Google](https://fonts.google.com/)
 */
export declare const fontProviders: {
    adobe: typeof adobe;
    bunny: typeof bunny;
    fontshare: typeof fontshare;
    fontsource: typeof fontsource;
    google: typeof google;
};
/** A type helper for defining Astro font providers config objects */
export declare function defineAstroFontProvider(provider: AstroFontProvider): AstroFontProvider;
export {};
