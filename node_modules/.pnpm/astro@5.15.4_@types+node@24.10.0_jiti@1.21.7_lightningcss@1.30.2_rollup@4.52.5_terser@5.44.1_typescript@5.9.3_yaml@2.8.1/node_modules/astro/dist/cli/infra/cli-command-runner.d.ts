import type { CommandRunner, HelpDisplay } from '../definitions.js';
interface Options {
    helpDisplay: HelpDisplay;
}
export declare function createCliCommandRunner({ helpDisplay }: Options): CommandRunner;
export {};
