import type { Logger } from '../../../core/logger/core.js';
import type { CommandExecutor, PlatformProvider } from '../definitions.js';
interface Options {
    url: string;
    platformProvider: PlatformProvider;
    logger: Logger;
    commandExecutor: CommandExecutor;
}
export declare const openDocsCommand: {
    help: {
        commandName: string;
        tables: {
            Flags: [string, string][];
        };
        description: string;
    };
    run({ url, platformProvider, logger, commandExecutor }: Options): Promise<void>;
};
export {};
