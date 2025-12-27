import type { Result, ServiceContext, ServicePlugin } from '@volar/language-service';
import type * as ts from 'typescript';
import type { TextDocument } from 'vscode-languageserver-textdocument';
export interface Provide {
    'typescript/languageService': () => ts.LanguageService;
    'typescript/languageServiceHost': () => ts.LanguageServiceHost;
}
export interface CompletionItemData {
    uri: string;
    fileName: string;
    offset: number;
    originalItem: {
        name: ts.CompletionEntry['name'];
        source: ts.CompletionEntry['source'];
        data: ts.CompletionEntry['data'];
        labelDetails: ts.CompletionEntry['labelDetails'];
    };
}
export declare function create(ts: typeof import('typescript'), { isValidationEnabled, isSuggestionsEnabled, }?: {
    isValidationEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
    isSuggestionsEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
}): ServicePlugin;
//# sourceMappingURL=semantic.d.ts.map