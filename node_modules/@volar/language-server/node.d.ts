import { FileSystem } from '@volar/language-service';
import * as vscode from 'vscode-languageserver/node';
import type { InitializationOptions } from './lib/types';
export * from 'vscode-languageserver/node';
export * from './index';
export * from './lib/project/simpleProjectProvider';
export * from './lib/project/typescriptProjectProvider';
export declare function createFs(options: InitializationOptions): FileSystem;
export declare function createConnection(): vscode._Connection<vscode._, vscode._, vscode._, vscode._, vscode._, vscode._, import("vscode-languageserver/lib/common/inlineCompletion.proposed").InlineCompletionFeatureShape, vscode._>;
export declare function createServer(connection: vscode.Connection): {
    initialize: (params: Omit<vscode.InitializeParams, "initializationOptions"> & {
        initializationOptions?: InitializationOptions | undefined;
    }, projectProviderFactory: import("./index").ServerProjectProviderFactory, _serverOptions: import("./lib/server").ServerOptions) => Promise<vscode.InitializeResult<any>>;
    initialized: () => void;
    shutdown: () => void;
    readonly projects: import("./index").ServerProjectProvider;
    readonly env: import("./index").ServerRuntimeEnvironment;
};
export declare function loadTsdkByPath(tsdk: string, locale: string | undefined): {
    typescript: typeof import("typescript");
    diagnosticMessages: import("typescript").MapLike<string> | undefined;
};
