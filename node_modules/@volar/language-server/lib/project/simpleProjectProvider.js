"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspaceFolder = exports.createServiceEnvironment = exports.createSimpleProjectProviderFactory = void 0;
const vscode_uri_1 = require("vscode-uri");
const simpleProject_1 = require("./simpleProject");
const uri_1 = require("../uri");
function createSimpleProjectProviderFactory() {
    return (context, servicePlugins, getLanguagePlugins) => {
        const projects = new Map();
        return {
            getProject(uri) {
                const workspaceFolder = getWorkspaceFolder(uri, context.workspaceFolders);
                let projectPromise = projects.get(workspaceFolder);
                if (!projectPromise) {
                    const serviceEnv = createServiceEnvironment(context, workspaceFolder);
                    projectPromise = (0, simpleProject_1.createSimpleServerProject)(context, serviceEnv, servicePlugins, getLanguagePlugins);
                    projects.set(workspaceFolder, projectPromise);
                }
                return projectPromise;
            },
            async getProjects() {
                return await Promise.all([...projects.values()]);
            },
            reloadProjects() {
                for (const project of projects.values()) {
                    project.then(project => project.dispose());
                }
                projects.clear();
                context.reloadDiagnostics();
            },
        };
    };
}
exports.createSimpleProjectProviderFactory = createSimpleProjectProviderFactory;
function createServiceEnvironment(context, workspaceFolder) {
    const env = {
        workspaceFolder,
        fs: context.runtimeEnv.fs,
        locale: context.initializeParams.locale,
        clientCapabilities: context.initializeParams.capabilities,
        getConfiguration: context.configurationHost?.getConfiguration,
        onDidChangeConfiguration: context.configurationHost?.onDidChangeConfiguration,
        onDidChangeWatchedFiles: context.onDidChangeWatchedFiles,
        typescript: {
            fileNameToUri: uri_1.fileNameToUri,
            uriToFileName: uri_1.uriToFileName,
        },
    };
    return env;
}
exports.createServiceEnvironment = createServiceEnvironment;
function getWorkspaceFolder(uri, workspaceFolders) {
    let parsed = vscode_uri_1.URI.parse(uri);
    while (true) {
        if (workspaceFolders.uriHas(parsed.toString())) {
            return parsed.toString();
        }
        const next = vscode_uri_1.URI.parse(uri).with({ path: parsed.path.substring(0, parsed.path.lastIndexOf('/')) });
        if (next.path === parsed.path) {
            break;
        }
        parsed = next;
    }
    for (const folder of workspaceFolders.uriKeys()) {
        return folder;
    }
    return vscode_uri_1.URI.parse(uri).with({ path: '/' }).toString();
}
exports.getWorkspaceFolder = getWorkspaceFolder;
//# sourceMappingURL=simpleProjectProvider.js.map