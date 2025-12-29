import { LanguagePlugin, ServiceEnvironment, ServicePlugin } from '@volar/language-service';
import { SnapshotDocument } from '@volar/snapshot-document';
import type { TextDocuments } from 'vscode-languageserver';
import * as vscode from 'vscode-languageserver';
import { createConfigurationHost } from './configurationHost.js';
import { InitializationOptions, ProjectContext, ServerProjectProvider, ServerProjectProviderFactory, ServerRuntimeEnvironment } from './types.js';
import { type UriMap } from './utils/uriMap.js';
export interface ServerContext {
    initializeParams: Omit<vscode.InitializeParams, 'initializationOptions'> & {
        initializationOptions?: InitializationOptions;
    };
    runtimeEnv: ServerRuntimeEnvironment;
    onDidChangeWatchedFiles: vscode.Connection['onDidChangeWatchedFiles'];
    configurationHost: ReturnType<typeof createConfigurationHost> | undefined;
    workspaceFolders: UriMap<boolean>;
    documents: TextDocuments<SnapshotDocument>;
    reloadDiagnostics(): void;
    updateDiagnosticsAndSemanticTokens(): void;
}
export interface ServerOptions {
    watchFileExtensions?: string[];
    getServicePlugins(): ServicePlugin[] | Promise<ServicePlugin[]>;
    getLanguagePlugins(serviceEnv: ServiceEnvironment, projectContext: ProjectContext): LanguagePlugin[] | Promise<LanguagePlugin[]>;
}
export declare function createServerBase(connection: vscode.Connection, getRuntimeEnv: (params: ServerContext['initializeParams']) => ServerRuntimeEnvironment): {
    initialize: (params: ServerContext['initializeParams'], projectProviderFactory: ServerProjectProviderFactory, _serverOptions: ServerOptions) => Promise<vscode.InitializeResult<any>>;
    initialized: () => void;
    shutdown: () => void;
    readonly projects: ServerProjectProvider;
    readonly env: ServerRuntimeEnvironment;
};
