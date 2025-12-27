"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("@volar/language-server/node");
const languageServerPlugin_js_1 = require("./languageServerPlugin.js");
const connection = (0, node_1.createConnection)();
const server = (0, node_1.createServer)(connection);
connection.listen();
connection.onInitialize((params) => {
    const tsdk = params.initializationOptions?.typescript?.tsdk;
    if (!tsdk) {
        throw new Error('The `typescript.tsdk` init option is required. It should point to a directory containing a `typescript.js` or `tsserverlibrary.js` file, such as `node_modules/typescript/lib`.');
    }
    const { typescript, diagnosticMessages } = (0, node_1.loadTsdkByPath)(tsdk, params.locale);
    return server.initialize(params, (0, node_1.createTypeScriptProjectProviderFactory)(typescript, diagnosticMessages), (0, languageServerPlugin_js_1.createServerOptions)(connection, typescript));
});
connection.onInitialized(() => {
    server.initialized();
});
//# sourceMappingURL=nodeServer.js.map