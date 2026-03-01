export interface CacheControl {
    'max-age'?: number;
    's-maxage'?: number;
    'stale-while-revalidate'?: number;
    'stale-if-error'?: number;
    public?: boolean;
    private?: boolean;
    'no-store'?: boolean;
    'no-cache'?: boolean;
    'must-revalidate'?: boolean;
    'proxy-revalidate'?: boolean;
    immutable?: boolean;
    'no-transform'?: boolean;
}
export declare const parse: (cacheControlHeader: string) => CacheControl;
export declare const stringify: (cacheControl: CacheControl) => string;
