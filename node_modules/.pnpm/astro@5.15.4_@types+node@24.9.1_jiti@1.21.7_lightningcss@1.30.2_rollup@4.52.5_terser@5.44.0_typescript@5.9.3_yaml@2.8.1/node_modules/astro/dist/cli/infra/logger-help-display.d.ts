import type { Logger } from '../../core/logger/core.js';
import type { AstroVersionProvider, HelpDisplay, TextStyler } from '../definitions.js';
import type { Flags } from '../flags.js';
interface Options {
    logger: Logger;
    textStyler: TextStyler;
    astroVersionProvider: AstroVersionProvider;
    flags: Flags;
}
export declare function createLoggerHelpDisplay({ logger, flags, textStyler, astroVersionProvider, }: Options): HelpDisplay;
export {};
