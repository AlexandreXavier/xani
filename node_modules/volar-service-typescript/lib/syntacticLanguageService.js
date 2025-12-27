"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageService = void 0;
let currentProjectVersion = -1;
let currentDocument;
let currentDocumentVersion;
let currentFileName = '';
let currentSnapshot;
let languageService;
const host = {
    getProjectVersion: () => currentProjectVersion.toString(),
    getScriptFileNames: () => [currentFileName],
    getScriptVersion: () => currentProjectVersion.toString(),
    getScriptSnapshot: fileName => fileName === currentFileName ? currentSnapshot : undefined,
    getCompilationSettings: () => ({}),
    getCurrentDirectory: () => '',
    getDefaultLibFileName: () => '',
    readFile: () => undefined,
    fileExists: fileName => fileName === currentFileName,
};
function getLanguageService(ts, document) {
    if (currentDocument !== document || currentDocumentVersion !== document.version) {
        currentDocument = document;
        currentFileName = '/tmp.' + (document.languageId === 'javascript' ? 'js' :
            document.languageId === 'typescriptreact' ? 'tsx' :
                document.languageId === 'javascriptreact' ? 'jsx' :
                    'ts');
        currentSnapshot = ts.ScriptSnapshot.fromString(document.getText());
        currentProjectVersion++;
    }
    languageService ??= ts.createLanguageService(host, undefined, 2);
    return {
        languageService,
        fileName: currentFileName,
    };
}
exports.getLanguageService = getLanguageService;
//# sourceMappingURL=syntacticLanguageService.js.map