export declare class Logger {
    private prefix;
    Logger(prefix?: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
export declare function printTitle(msg: string, bgColor?: (x: string | number) => string): void;
