import type { Result, ServiceContext, ServicePlugin } from '@volar/language-service';
import type { TextDocument } from 'vscode-languageserver-textdocument';
export declare function create(ts: typeof import('typescript'), { isFormattingEnabled, isAutoClosingTagsEnabled, }?: {
    isFormattingEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
    isAutoClosingTagsEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
}): ServicePlugin;
//# sourceMappingURL=syntactic.d.ts.map