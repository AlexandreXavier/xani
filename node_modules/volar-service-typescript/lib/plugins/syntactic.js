"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const getFormatCodeSettings_1 = require("../configs/getFormatCodeSettings");
const shared_1 = require("../shared");
const lspConverters_1 = require("../utils/lspConverters");
const syntacticLanguageService_1 = require("../syntacticLanguageService");
function create(ts, { isFormattingEnabled = async (document, context) => {
    return await context.env.getConfiguration?.((0, shared_1.getConfigTitle)(document) + '.format.enable') ?? true;
}, isAutoClosingTagsEnabled = async (document, context) => {
    return await context.env.getConfiguration?.((0, shared_1.getConfigTitle)(document) + '.autoClosingTags') ?? true;
}, } = {}) {
    return {
        name: 'typescript-syntactic',
        // https://github.com/microsoft/vscode/blob/ce119308e8fd4cd3f992d42b297588e7abe33a0c/extensions/typescript-language-features/src/languageFeatures/formatting.ts#L99
        autoFormatTriggerCharacters: [';', '}', '\n'],
        create(context) {
            return {
                async provideAutoInsertionEdit(document, position, lastChange) {
                    if ((document.languageId === 'javascriptreact' || document.languageId === 'typescriptreact')
                        && lastChange.text.endsWith('>')
                        && await isAutoClosingTagsEnabled(document, context)) {
                        const { languageService, fileName } = (0, syntacticLanguageService_1.getLanguageService)(ts, document);
                        const close = languageService.getJsxClosingTagAtPosition(fileName, document.offsetAt(position));
                        if (close) {
                            return '$0' + close.newText;
                        }
                    }
                },
                provideFoldingRanges(document) {
                    if (!(0, shared_1.isTsDocument)(document))
                        return;
                    const { languageService, fileName } = (0, syntacticLanguageService_1.getLanguageService)(ts, document);
                    const outliningSpans = (0, shared_1.safeCall)(() => languageService.getOutliningSpans(fileName));
                    if (!outliningSpans) {
                        return [];
                    }
                    return outliningSpans.map(span => (0, lspConverters_1.convertOutliningSpan)(span, document));
                },
                provideDocumentSymbols(document) {
                    if (!(0, shared_1.isTsDocument)(document))
                        return;
                    const { languageService, fileName } = (0, syntacticLanguageService_1.getLanguageService)(ts, document);
                    const barItems = (0, shared_1.safeCall)(() => languageService.getNavigationTree(fileName));
                    if (!barItems)
                        return [];
                    // The root represents the file. Ignore this when showing in the UI
                    return barItems.childItems
                        ?.map(item => (0, lspConverters_1.convertNavTree)(item, document))
                        .flat()
                        ?? [];
                },
                async provideDocumentFormattingEdits(document, range, options, codeOptions) {
                    if (!(0, shared_1.isTsDocument)(document))
                        return;
                    if (!await isFormattingEnabled(document, context))
                        return;
                    const tsOptions = await (0, getFormatCodeSettings_1.getFormatCodeSettings)(context, document, options);
                    if (codeOptions) {
                        tsOptions.baseIndentSize = codeOptions.initialIndentLevel * options.tabSize;
                    }
                    const { languageService, fileName } = (0, syntacticLanguageService_1.getLanguageService)(ts, document);
                    const scriptEdits = range
                        ? (0, shared_1.safeCall)(() => languageService.getFormattingEditsForRange(fileName, document.offsetAt(range.start), document.offsetAt(range.end), tsOptions))
                        : (0, shared_1.safeCall)(() => languageService.getFormattingEditsForDocument(fileName, tsOptions));
                    if (!scriptEdits) {
                        return [];
                    }
                    return scriptEdits.map(edit => (0, lspConverters_1.convertTextChange)(edit, document));
                },
                async provideOnTypeFormattingEdits(document, position, key, options, codeOptions) {
                    if (!(0, shared_1.isTsDocument)(document))
                        return;
                    if (!await isFormattingEnabled(document, context))
                        return;
                    const tsOptions = await (0, getFormatCodeSettings_1.getFormatCodeSettings)(context, document, options);
                    if (codeOptions) {
                        tsOptions.baseIndentSize = codeOptions.initialIndentLevel * options.tabSize;
                    }
                    const { languageService, fileName } = (0, syntacticLanguageService_1.getLanguageService)(ts, document);
                    const scriptEdits = (0, shared_1.safeCall)(() => languageService.getFormattingEditsAfterKeystroke(fileName, document.offsetAt(position), key, tsOptions));
                    if (!scriptEdits) {
                        return [];
                    }
                    return scriptEdits.map(edit => (0, lspConverters_1.convertTextChange)(edit, document));
                },
            };
        },
    };
}
exports.create = create;
//# sourceMappingURL=syntactic.js.map