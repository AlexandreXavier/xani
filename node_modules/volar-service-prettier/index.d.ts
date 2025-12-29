import type { DocumentSelector, FormattingOptions, Result, ServiceContext, ServicePlugin, TextDocument } from '@volar/language-service';
import type { Options } from 'prettier';
export declare function create(
/**
 * Prettier instance or getter to use.
 */
prettierInstanceOrGetter: typeof import('prettier') | ((context: ServiceContext) => Result<typeof import('prettier') | undefined>), { html, documentSelector, isFormattingEnabled, getFormattingOptions, }?: {
    html?: {
        /**
         * Preprocessing to break "contents" from "HTML tags".
         * This will prevent HTML closing tags, and opening tags without attributes
         * from breaking into a blank `>` or `<` on a new line.
         */
        breakContentsFromTags?: boolean;
    };
    /**
     * Languages to be formatted by prettier.
     *
     * @default
     * ['html', 'css', 'scss', 'typescript', 'javascript']
     */
    documentSelector?: DocumentSelector;
    isFormattingEnabled?(prettier: typeof import('prettier'), document: TextDocument, context: ServiceContext): Result<boolean>;
    getFormattingOptions?(prettier: typeof import('prettier'), document: TextDocument, formatOptions: FormattingOptions, context: ServiceContext): Result<Options>;
}): ServicePlugin;
//# sourceMappingURL=index.d.ts.map