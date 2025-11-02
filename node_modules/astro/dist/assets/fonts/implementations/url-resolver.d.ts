import type { AssetsPrefix } from '../../../types/public/index.js';
import type { UrlResolver } from '../definitions.js';
export declare function createDevUrlResolver({ base, searchParams, }: {
    base: string;
    searchParams: URLSearchParams;
}): UrlResolver;
export declare function createBuildUrlResolver({ base, assetsPrefix, searchParams, }: {
    base: string;
    assetsPrefix: AssetsPrefix;
    searchParams: URLSearchParams;
}): UrlResolver;
