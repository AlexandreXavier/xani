import type { Disposable, DocumentSelector, FormattingOptions, Result, ServiceContext, ServicePlugin } from '@volar/language-service';
import * as html from 'vscode-html-languageservice';
import { TextDocument } from 'vscode-languageserver-textdocument';
export interface Provide {
    'html/htmlDocument': (document: TextDocument) => html.HTMLDocument | undefined;
    'html/languageService': () => html.LanguageService;
    'html/documentContext': () => html.DocumentContext;
}
export declare function create({ documentSelector, useDefaultDataProvider, getDocumentContext, isFormattingEnabled, isAutoCreateQuotesEnabled, isAutoClosingTagsEnabled, getFormattingOptions, getCompletionConfiguration, getHoverSettings, getCustomData, onDidChangeCustomData, }?: {
    documentSelector?: DocumentSelector;
    useDefaultDataProvider?: boolean;
    isFormattingEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
    isAutoCreateQuotesEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
    isAutoClosingTagsEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
    getDocumentContext?(context: ServiceContext): html.DocumentContext;
    getFormattingOptions?(document: TextDocument, options: FormattingOptions, context: ServiceContext): Result<html.HTMLFormatConfiguration>;
    getCompletionConfiguration?(document: TextDocument, context: ServiceContext): Result<html.CompletionConfiguration | undefined>;
    getHoverSettings?(document: TextDocument, context: ServiceContext): Result<html.HoverSettings | undefined>;
    getCustomData?(context: ServiceContext): Result<html.IHTMLDataProvider[]>;
    onDidChangeCustomData?(listener: () => void, context: ServiceContext): Disposable;
}): ServicePlugin;
//# sourceMappingURL=index.d.ts.map