import type { ServicePlugin } from '@volar/language-service';
import * as vscode from 'vscode-languageserver';
export declare function getServerCapabilities(watchExts: string[], servicePlugins: ServicePlugin[], semanticTokensLegend: vscode.SemanticTokensLegend): vscode.ServerCapabilities<any>;
