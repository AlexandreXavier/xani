// @ts-ignore
import Critters from 'critters';
export function inlineCriticalCss(path, html) {
    const critters = new Critters({
        compress: false,
        fonts: false,
        reduceInlineStyles: false,
        inlineThreshold: 0,
        logLevel: 'info',
        path,
    });
    return critters.process(html);
}
