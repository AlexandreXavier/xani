import type * as ts from 'typescript';
import type { TextDocument } from 'vscode-languageserver-textdocument';
export declare function getLanguageService(ts: typeof import('typescript'), document: TextDocument): {
    languageService: ts.LanguageService;
    fileName: string;
};
//# sourceMappingURL=syntacticLanguageService.d.ts.map