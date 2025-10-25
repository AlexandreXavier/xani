"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerBase = void 0;
const language_service_1 = require("@volar/language-service");
const snapshot_document_1 = require("@volar/snapshot-document");
const l10n = require("@vscode/l10n");
const request_light_1 = require("request-light");
const vscode = require("vscode-languageserver");
const vscode_uri_1 = require("vscode-uri");
const configurationHost_js_1 = require("./configurationHost.js");
const serverCapabilities_js_1 = require("./serverCapabilities.js");
const types_js_1 = require("./types.js");
const uri_js_1 = require("./uri.js");
const uriMap_js_1 = require("./utils/uriMap.js");
function createServerBase(connection, getRuntimeEnv) {
    let context;
    let projects;
    let serverOptions;
    let semanticTokensReq = 0;
    let documentUpdatedReq = 0;
    const documents = new vscode.TextDocuments({
        create(uri, languageId, version, text) {
            return new snapshot_document_1.SnapshotDocument(uri, languageId, version, text);
        },
        update(snapshot, contentChanges, version) {
            snapshot.update(contentChanges, version);
            return snapshot;
        },
    });
    const didChangeWatchedFilesCallbacks = new Set();
    const workspaceFolders = (0, uriMap_js_1.createUriMap)(uri_js_1.fileNameToUri);
    documents.listen(connection);
    return {
        initialize,
        initialized,
        shutdown,
        get projects() {
            return projects;
        },
        get env() {
            return context.runtimeEnv;
        },
    };
    async function initialize(params, projectProviderFactory, _serverOptions) {
        serverOptions = _serverOptions;
        const env = getRuntimeEnv(params);
        context = {
            initializeParams: params,
            runtimeEnv: {
                ...env,
                fs: createFsWithCache(env.fs),
            },
            configurationHost: params.capabilities.workspace?.configuration
                ? (0, configurationHost_js_1.createConfigurationHost)(params, connection)
                : undefined,
            onDidChangeWatchedFiles: cb => {
                didChangeWatchedFilesCallbacks.add(cb);
                return {
                    dispose: () => {
                        didChangeWatchedFilesCallbacks.delete(cb);
                    },
                };
            },
            documents,
            workspaceFolders,
            reloadDiagnostics,
            updateDiagnosticsAndSemanticTokens,
        };
        if (context.initializeParams.initializationOptions?.l10n) {
            await l10n.config({ uri: context.initializeParams.initializationOptions.l10n.location });
        }
        if (params.capabilities.workspace?.workspaceFolders && params.workspaceFolders) {
            for (const folder of params.workspaceFolders) {
                workspaceFolders.uriSet(folder.uri, true);
            }
        }
        else if (params.rootUri) {
            workspaceFolders.uriSet(params.rootUri, true);
        }
        else if (params.rootPath) {
            workspaceFolders.uriSet(vscode_uri_1.URI.file(params.rootPath).toString(), true);
        }
        const servicePlugins = await serverOptions.getServicePlugins();
        const semanticTokensLegend = getSemanticTokensLegend();
        projects = projectProviderFactory({ ...context }, servicePlugins, serverOptions.getLanguagePlugins);
        documents.onDidChangeContent(({ document }) => {
            updateDiagnostics(document.uri);
        });
        documents.onDidClose(({ document }) => {
            if (!isServerPushEnabled()) {
                return;
            }
            connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
        });
        context.configurationHost?.onDidChangeConfiguration?.(updateDiagnosticsAndSemanticTokens);
        (await import('./register/registerEditorFeatures.js')).registerEditorFeatures(connection, projects);
        (await import('./register/registerLanguageFeatures.js')).registerLanguageFeatures(connection, projects, params, semanticTokensLegend);
        const result = {
            capabilities: (0, serverCapabilities_js_1.getServerCapabilities)(serverOptions.watchFileExtensions ?? [], servicePlugins, semanticTokensLegend),
        };
        if (params.initializationOptions?.diagnosticModel !== types_js_1.DiagnosticModel.Pull) {
            result.capabilities.diagnosticProvider = undefined;
        }
        try {
            const packageJson = require('../package.json');
            result.serverInfo = {
                name: packageJson.name,
                version: packageJson.version,
            };
        }
        catch { }
        return result;
    }
    function initialized() {
        context.configurationHost?.ready();
        context.configurationHost?.onDidChangeConfiguration?.(updateHttpSettings);
        updateHttpSettings();
        if (context.initializeParams.capabilities.workspace?.workspaceFolders) {
            connection.workspace.onDidChangeWorkspaceFolders(e => {
                for (const folder of e.added) {
                    workspaceFolders.uriSet(folder.uri, true);
                }
                for (const folder of e.removed) {
                    workspaceFolders.uriDelete(folder.uri);
                }
                projects.reloadProjects();
            });
        }
        if (context.initializeParams.capabilities.workspace?.didChangeWatchedFiles?.dynamicRegistration
            && serverOptions.watchFileExtensions?.length) {
            connection.client.register(vscode.DidChangeWatchedFilesNotification.type, {
                watchers: [
                    {
                        globPattern: `**/*.{${serverOptions.watchFileExtensions.join(',')}}`
                    },
                ]
            });
            connection.onDidChangeWatchedFiles(e => {
                for (const cb of didChangeWatchedFilesCallbacks) {
                    cb(e);
                }
            });
        }
        async function updateHttpSettings() {
            const httpSettings = await context.configurationHost?.getConfiguration?.('http');
            (0, request_light_1.configure)(httpSettings?.proxy, httpSettings?.proxyStrictSSL ?? false);
        }
    }
    function shutdown() {
        projects?.reloadProjects();
    }
    function createFsWithCache(fs) {
        const readFileCache = new Map();
        const statCache = new Map();
        const readDirectoryCache = new Map();
        didChangeWatchedFilesCallbacks.add(({ changes }) => {
            for (const change of changes) {
                if (change.type === vscode.FileChangeType.Deleted) {
                    readFileCache.set(change.uri, undefined);
                    statCache.set(change.uri, undefined);
                    const dir = change.uri.substring(0, change.uri.lastIndexOf('/'));
                    readDirectoryCache.delete(dir);
                }
                else if (change.type === vscode.FileChangeType.Changed) {
                    readFileCache.delete(change.uri);
                    statCache.delete(change.uri);
                }
                else if (change.type === vscode.FileChangeType.Created) {
                    readFileCache.delete(change.uri);
                    statCache.delete(change.uri);
                    const dir = change.uri.substring(0, change.uri.lastIndexOf('/'));
                    readDirectoryCache.delete(dir);
                }
            }
        });
        return {
            readFile: uri => {
                if (!readFileCache.has(uri)) {
                    readFileCache.set(uri, fs.readFile(uri));
                }
                return readFileCache.get(uri);
            },
            stat: uri => {
                if (!statCache.has(uri)) {
                    statCache.set(uri, fs.stat(uri));
                }
                return statCache.get(uri);
            },
            readDirectory: uri => {
                if (!readDirectoryCache.has(uri)) {
                    readDirectoryCache.set(uri, fs.readDirectory(uri));
                }
                return readDirectoryCache.get(uri);
            },
        };
    }
    function getSemanticTokensLegend() {
        return {
            tokenTypes: [
                ...language_service_1.standardSemanticTokensLegend.tokenTypes,
                ...context.initializeParams.initializationOptions?.semanticTokensLegend?.tokenTypes ?? [],
            ],
            tokenModifiers: [
                ...language_service_1.standardSemanticTokensLegend.tokenModifiers,
                ...context.initializeParams.initializationOptions?.semanticTokensLegend?.tokenModifiers ?? [],
            ],
        };
    }
    function reloadDiagnostics() {
        if (!isServerPushEnabled()) {
            return;
        }
        for (const document of documents.all()) {
            connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
        }
        updateDiagnosticsAndSemanticTokens();
    }
    async function updateDiagnosticsAndSemanticTokens() {
        const req = ++semanticTokensReq;
        await updateDiagnostics();
        const delay = 250;
        await sleep(delay);
        if (req === semanticTokensReq) {
            if (context.initializeParams.capabilities.workspace?.semanticTokens?.refreshSupport) {
                connection.languages.semanticTokens.refresh();
            }
            if (context.initializeParams.capabilities.workspace?.inlayHint?.refreshSupport) {
                connection.languages.inlayHint.refresh();
            }
            if (isServerPushEnabled()) {
                if (context.initializeParams.capabilities.workspace?.diagnostics?.refreshSupport) {
                    connection.languages.diagnostics.refresh();
                }
            }
        }
    }
    async function updateDiagnostics(docUri) {
        if (!isServerPushEnabled()) {
            return;
        }
        const req = ++documentUpdatedReq;
        const delay = 250;
        const token = {
            get isCancellationRequested() {
                return req !== documentUpdatedReq;
            },
            onCancellationRequested: vscode.Event.None,
        };
        const changeDoc = docUri ? documents.get(docUri) : undefined;
        const otherDocs = [...documents.all()].filter(doc => doc !== changeDoc);
        if (changeDoc) {
            await sleep(delay);
            if (token.isCancellationRequested) {
                return;
            }
            await sendDocumentDiagnostics(changeDoc.uri, changeDoc.version, token);
        }
        for (const doc of otherDocs) {
            await sleep(delay);
            if (token.isCancellationRequested) {
                break;
            }
            await sendDocumentDiagnostics(doc.uri, doc.version, token);
        }
    }
    async function sendDocumentDiagnostics(uri, version, cancel) {
        const languageService = (await projects.getProject(uri)).getLanguageService();
        const errors = await languageService.doValidation(uri, cancel, result => {
            connection.sendDiagnostics({ uri: uri, diagnostics: result, version });
        });
        connection.sendDiagnostics({ uri: uri, diagnostics: errors, version });
    }
    function isServerPushEnabled() {
        return (context.initializeParams.initializationOptions?.diagnosticModel ?? types_js_1.DiagnosticModel.Push) === types_js_1.DiagnosticModel.Push;
    }
}
exports.createServerBase = createServerBase;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//# sourceMappingURL=server.js.map