import type { Disposable, DocumentSelector, FormattingOptions, Result, ServiceContext, ServicePlugin } from '@volar/language-service';
import * as css from 'vscode-css-languageservice';
import { TextDocument } from 'vscode-languageserver-textdocument';
export interface Provide {
    'css/stylesheet': (document: TextDocument, ls: css.LanguageService) => css.Stylesheet;
    'css/languageService': (document: TextDocument) => css.LanguageService | undefined;
}
export declare function create({ cssDocumentSelector, scssDocumentSelector, lessDocumentSelector, useDefaultDataProvider, getDocumentContext, isFormattingEnabled, getFormattingOptions, getLanguageSettings, getCustomData, onDidChangeCustomData, }?: {
    cssDocumentSelector?: DocumentSelector;
    scssDocumentSelector?: DocumentSelector;
    lessDocumentSelector?: DocumentSelector;
    useDefaultDataProvider?: boolean;
    getDocumentContext?(context: ServiceContext): css.DocumentContext;
    isFormattingEnabled?(document: TextDocument, context: ServiceContext): Result<boolean>;
    getFormattingOptions?(document: TextDocument, options: FormattingOptions, context: ServiceContext): Result<css.CSSFormatConfiguration>;
    getLanguageSettings?(document: TextDocument, context: ServiceContext): Result<css.LanguageSettings | undefined>;
    getCustomData?(context: ServiceContext): Result<css.ICSSDataProvider[]>;
    onDidChangeCustomData?(listener: () => void, context: ServiceContext): Disposable;
}): ServicePlugin;
//# sourceMappingURL=index.d.ts.map