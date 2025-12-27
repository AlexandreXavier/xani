"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNameToUri = exports.uriToFileName = void 0;
const vscode_uri_1 = require("vscode-uri");
function uriToFileName(uri) {
    const parsed = vscode_uri_1.URI.parse(uri);
    if (parsed.scheme === 'file') {
        return parsed.fsPath.replace(/\\/g, '/');
    }
    return `/${parsed.scheme}@@${parsed.authority}@@${parsed.path}`;
}
exports.uriToFileName = uriToFileName;
function fileNameToUri(fileName) {
    if (fileName.startsWith('/') && fileName.includes('@@')) {
        const parts = fileName.slice(1).split('@@');
        if (parts.length !== 3) {
            throw new Error('Invalid file name');
        }
        return vscode_uri_1.URI.from({
            scheme: parts[0],
            authority: parts[1],
            path: parts[2],
        }).toString();
    }
    return vscode_uri_1.URI.file(fileName).toString();
}
exports.fileNameToUri = fileNameToUri;
//# sourceMappingURL=uri.js.map