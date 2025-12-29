"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSimpleServerProject = void 0;
const language_service_1 = require("@volar/language-service");
async function createSimpleServerProject(context, serviceEnv, servicePlugins, getLanguagePlugins) {
    let languageService;
    const languagePlugins = await getLanguagePlugins(serviceEnv, {});
    return {
        getLanguageService,
        getLanguageServiceDontCreate: () => languageService,
        dispose() {
            languageService?.dispose();
        },
    };
    function getLanguageService() {
        if (!languageService) {
            const files = (0, language_service_1.createFileRegistry)(languagePlugins, false, uri => {
                const script = context.documents.get(uri);
                if (script) {
                    files.set(uri, script.languageId, script.getSnapshot());
                }
                else {
                    files.delete(uri);
                }
            });
            languageService = (0, language_service_1.createLanguageService)({ files }, servicePlugins, serviceEnv);
        }
        return languageService;
    }
}
exports.createSimpleServerProject = createSimpleServerProject;
//# sourceMappingURL=simpleProject.js.map