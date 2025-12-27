import type * as ts from 'typescript';
import type { ServerProjectProviderFactory } from '../types';
export declare function createTypeScriptProjectProviderFactory(ts: typeof import('typescript'), tsLocalized: ts.MapLike<string> | undefined): ServerProjectProviderFactory;
export declare function sortTSConfigs(file: string, a: string, b: string): number;
