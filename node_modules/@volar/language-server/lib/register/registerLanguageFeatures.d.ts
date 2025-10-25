import * as vscode from 'vscode-languageserver';
import type { ServerProjectProvider } from '../types';
export declare function registerLanguageFeatures(connection: vscode.Connection, projectProvider: ServerProjectProvider, initParams: vscode.InitializeParams, semanticTokensLegend: vscode.SemanticTokensLegend): void;
export declare function sleep(ms: number): Promise<unknown>;
