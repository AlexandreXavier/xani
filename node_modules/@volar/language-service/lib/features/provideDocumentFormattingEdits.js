"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const language_core_1 = require("@volar/language-core");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const documents_1 = require("../documents");
const cancellation_1 = require("../utils/cancellation");
const common_1 = require("../utils/common");
const featureWorkers_1 = require("../utils/featureWorkers");
function register(context) {
    let fakeVersion = 0;
    return async (uri, options, range, onTypeParams, token = cancellation_1.NoneCancellationToken) => {
        const sourceFile = context.language.files.get(uri);
        if (!sourceFile) {
            return;
        }
        let document = context.documents.get(uri, sourceFile.languageId, sourceFile.snapshot);
        range ??= {
            start: document.positionAt(0),
            end: document.positionAt(document.getText().length),
        };
        if (!sourceFile.generated) {
            return onTypeParams
                ? (await tryFormat(document, document, undefined, 0, onTypeParams.position, onTypeParams.ch))?.edits
                : (await tryFormat(document, document, undefined, 0, range, undefined))?.edits;
        }
        const embeddedRanges = new Map();
        const startOffset = document.offsetAt(range.start);
        const endOffset = document.offsetAt(range.end);
        for (const code of (0, language_core_1.forEachEmbeddedCode)(sourceFile.generated.code)) {
            for (const [sourceFileUri, [_snapshot, map]] of context.language.files.getMaps(code)) {
                if (sourceFileUri === uri) {
                    const embeddedRange = (0, common_1.findOverlapCodeRange)(startOffset, endOffset, map, language_core_1.isFormattingEnabled);
                    if (embeddedRange) {
                        if (embeddedRange.start === map.mappings[0].generatedOffsets[0]) {
                            embeddedRange.start = 0;
                        }
                        const lastMapping = map.mappings[map.mappings.length - 1];
                        if (embeddedRange.end === lastMapping.generatedOffsets[lastMapping.generatedOffsets.length - 1] + lastMapping.lengths[lastMapping.lengths.length - 1]) {
                            embeddedRange.end = code.snapshot.getLength();
                        }
                        embeddedRanges.set(code.id, embeddedRange);
                    }
                    break;
                }
            }
        }
        try {
            const originalDocument = document;
            let tempSourceSnapshot = sourceFile.snapshot;
            let tempVirtualFile = context.language.files.set(sourceFile.id + '.tmp', sourceFile.languageId, sourceFile.snapshot, [sourceFile.generated.languagePlugin]).generated?.code;
            if (!tempVirtualFile) {
                return;
            }
            let level = 0;
            while (true) {
                const embeddedCodes = (0, featureWorkers_1.getEmbeddedFilesByLevel)(context, sourceFile.id, tempVirtualFile, level++);
                if (embeddedCodes.length === 0) {
                    break;
                }
                let edits = [];
                for (const code of embeddedCodes) {
                    if (!code.mappings.some(mapping => (0, language_core_1.isFormattingEnabled)(mapping.data))) {
                        continue;
                    }
                    const docMap = createDocMap(code, uri, sourceFile.languageId, tempSourceSnapshot);
                    if (!docMap) {
                        continue;
                    }
                    let embeddedCodeResult;
                    let embeddedRange = embeddedRanges.get(code.id);
                    if (onTypeParams) {
                        const embeddedPosition = docMap.getGeneratedPosition(onTypeParams.position);
                        if (embeddedPosition) {
                            embeddedCodeResult = await tryFormat(docMap.sourceDocument, docMap.embeddedDocument, code, level, embeddedPosition, onTypeParams.ch);
                        }
                    }
                    else if (embeddedRange) {
                        embeddedCodeResult = await tryFormat(docMap.sourceDocument, docMap.embeddedDocument, code, level, {
                            start: docMap.embeddedDocument.positionAt(embeddedRange.start),
                            end: docMap.embeddedDocument.positionAt(embeddedRange.end),
                        });
                    }
                    if (!embeddedCodeResult) {
                        continue;
                    }
                    for (const textEdit of embeddedCodeResult.edits) {
                        const range = docMap.getSourceRange(textEdit.range);
                        if (range) {
                            edits.push({
                                newText: textEdit.newText,
                                range,
                            });
                        }
                    }
                }
                if (edits.length > 0) {
                    const newText = vscode_languageserver_textdocument_1.TextDocument.applyEdits(document, edits);
                    document = vscode_languageserver_textdocument_1.TextDocument.create(document.uri, document.languageId, document.version + 1, newText);
                    tempSourceSnapshot = (0, common_1.stringToSnapshot)(newText);
                    tempVirtualFile = context.language.files.set(sourceFile.id + '.tmp', sourceFile.languageId, tempSourceSnapshot, [sourceFile.generated.languagePlugin]).generated?.code;
                    if (!tempVirtualFile) {
                        break;
                    }
                }
            }
            if (document.getText() === originalDocument.getText()) {
                return;
            }
            const editRange = {
                start: originalDocument.positionAt(0),
                end: originalDocument.positionAt(originalDocument.getText().length),
            };
            const textEdit = {
                range: editRange,
                newText: document.getText(),
            };
            return [textEdit];
        }
        finally {
            context.language.files.delete(sourceFile.id + '.tmp');
        }
        async function tryFormat(sourceDocument, document, code, codeLevel, rangeOrPosition, ch) {
            if (context.disabledVirtualFileUris.has(document.uri)) {
                return;
            }
            let codeOptions;
            rangeOrPosition ??= {
                start: document.positionAt(0),
                end: document.positionAt(document.getText().length),
            };
            if (code) {
                codeOptions = {
                    level: codeLevel - 1,
                    initialIndentLevel: 0,
                };
                if (code.mappings.length) {
                    const firstMapping = code.mappings[0];
                    const startOffset = firstMapping.sourceOffsets[0];
                    const startPosition = sourceDocument.positionAt(startOffset);
                    codeOptions.initialIndentLevel = computeInitialIndent(sourceDocument.getText(), sourceDocument.offsetAt({ line: startPosition.line, character: 0 }), options);
                }
                for (const service of context.services) {
                    if (context.disabledServicePlugins.has(service[1])) {
                        continue;
                    }
                    codeOptions = await service[1].resolveEmbeddedCodeFormattingOptions?.(code, codeOptions, token) ?? codeOptions;
                }
            }
            for (const service of context.services) {
                if (context.disabledServicePlugins.has(service[1])) {
                    continue;
                }
                if (token.isCancellationRequested) {
                    break;
                }
                let edits;
                try {
                    if (ch !== undefined && rangeOrPosition && 'line' in rangeOrPosition && 'character' in rangeOrPosition) {
                        if (service[0].autoFormatTriggerCharacters?.includes(ch)) {
                            edits = await service[1].provideOnTypeFormattingEdits?.(document, rangeOrPosition, ch, options, codeOptions, token);
                        }
                    }
                    else if (ch === undefined && rangeOrPosition && 'start' in rangeOrPosition && 'end' in rangeOrPosition) {
                        edits = await service[1].provideDocumentFormattingEdits?.(document, rangeOrPosition, options, codeOptions, token);
                    }
                }
                catch (err) {
                    console.warn(err);
                }
                if (!edits) {
                    continue;
                }
                return {
                    service,
                    edits,
                };
            }
        }
    };
    function createDocMap(file, sourceFileUri, sourceLanguageId, _sourceSnapshot) {
        const maps = (0, language_core_1.updateVirtualCodeMaps)(file, sourceFileUri2 => {
            if (!sourceFileUri2) {
                return [sourceFileUri, _sourceSnapshot];
            }
        });
        if (maps.has(sourceFileUri) && maps.get(sourceFileUri)[0] === _sourceSnapshot) {
            const map = maps.get(sourceFileUri);
            const version = fakeVersion++;
            return new documents_1.SourceMapWithDocuments(vscode_languageserver_textdocument_1.TextDocument.create(sourceFileUri, sourceLanguageId ?? (0, language_core_1.resolveCommonLanguageId)(sourceFileUri), version, _sourceSnapshot.getText(0, _sourceSnapshot.getLength())), vscode_languageserver_textdocument_1.TextDocument.create(context.documents.getVirtualCodeUri(sourceFileUri, file.id), file.languageId, version, file.snapshot.getText(0, file.snapshot.getLength())), map[1]);
        }
    }
}
exports.register = register;
function computeInitialIndent(content, i, options) {
    let nChars = 0;
    const tabSize = options.tabSize || 4;
    while (i < content.length) {
        const ch = content.charAt(i);
        if (ch === ' ') {
            nChars++;
        }
        else if (ch === '\t') {
            nChars += tabSize;
        }
        else {
            break;
        }
        i++;
    }
    return Math.floor(nChars / tabSize);
}
//# sourceMappingURL=provideDocumentFormattingEdits.js.map