import { readFileSync } from "node:fs";
import { AstroError, AstroErrorData } from "../core/errors/index.js";
import {
  CLIENT_VIRTUAL_MODULE_ID,
  INTERNAL_VIRTUAL_MODULE_ID,
  MODULE_TEMPLATE_URL,
  RESOLVED_CLIENT_VIRTUAL_MODULE_ID,
  RESOLVED_INTERNAL_VIRTUAL_MODULE_ID,
  RESOLVED_SERVER_VIRTUAL_MODULE_ID,
  SERVER_VIRTUAL_MODULE_ID
} from "./constants.js";
import { invalidVariablesToError } from "./errors.js";
import { getEnvFieldType, validateEnvVariable } from "./validators.js";
function astroEnv({ settings, sync, envLoader }) {
  const { schema, validateSecrets } = settings.config.env;
  let isDev;
  let templates = null;
  function ensureTemplateAreLoaded() {
    if (templates !== null) {
      return;
    }
    const loadedEnv = envLoader.get();
    if (!isDev) {
      for (const [key, value] of Object.entries(loadedEnv)) {
        if (value !== void 0) {
          process.env[key] = value;
        }
      }
    }
    const validatedVariables = validatePublicVariables({
      schema,
      loadedEnv,
      validateSecrets,
      sync
    });
    templates = {
      ...getTemplates(schema, validatedVariables, isDev ? loadedEnv : null),
      internal: `export const schema = ${JSON.stringify(schema)};`
    };
  }
  return {
    name: "astro-env-plugin",
    enforce: "pre",
    config(_, { command }) {
      isDev = command !== "build";
    },
    buildStart() {
      ensureTemplateAreLoaded();
    },
    buildEnd() {
      templates = null;
    },
    resolveId(id) {
      if (id === CLIENT_VIRTUAL_MODULE_ID) {
        return RESOLVED_CLIENT_VIRTUAL_MODULE_ID;
      }
      if (id === SERVER_VIRTUAL_MODULE_ID) {
        return RESOLVED_SERVER_VIRTUAL_MODULE_ID;
      }
      if (id === INTERNAL_VIRTUAL_MODULE_ID) {
        return RESOLVED_INTERNAL_VIRTUAL_MODULE_ID;
      }
    },
    load(id, options) {
      if (id === RESOLVED_CLIENT_VIRTUAL_MODULE_ID) {
        ensureTemplateAreLoaded();
        return { code: templates.client };
      }
      if (id === RESOLVED_SERVER_VIRTUAL_MODULE_ID) {
        if (options?.ssr) {
          ensureTemplateAreLoaded();
          return { code: templates.server };
        }
        throw new AstroError({
          ...AstroErrorData.ServerOnlyModule,
          message: AstroErrorData.ServerOnlyModule.message(SERVER_VIRTUAL_MODULE_ID)
        });
      }
      if (id === RESOLVED_INTERNAL_VIRTUAL_MODULE_ID) {
        ensureTemplateAreLoaded();
        return { code: templates.internal };
      }
    }
  };
}
function validatePublicVariables({
  schema,
  loadedEnv,
  validateSecrets,
  sync
}) {
  const valid = [];
  const invalid = [];
  for (const [key, options] of Object.entries(schema)) {
    const variable = loadedEnv[key] === "" ? void 0 : loadedEnv[key];
    if (options.access === "secret" && !validateSecrets) {
      continue;
    }
    const result = validateEnvVariable(variable, options);
    const type = getEnvFieldType(options);
    if (!result.ok) {
      invalid.push({ key, type, errors: result.errors });
    } else if (options.access === "public") {
      valid.push({ key, value: result.value, type, context: options.context });
    }
  }
  if (invalid.length > 0 && !sync) {
    throw new AstroError({
      ...AstroErrorData.EnvInvalidVariables,
      message: AstroErrorData.EnvInvalidVariables.message(invalidVariablesToError(invalid))
    });
  }
  return valid;
}
function getTemplates(schema, validatedVariables, loadedEnv) {
  let client = "";
  let server = readFileSync(MODULE_TEMPLATE_URL, "utf-8");
  let onSetGetEnv = "";
  for (const { key, value, context } of validatedVariables) {
    const str = `export const ${key} = ${JSON.stringify(value)};`;
    if (context === "client") {
      client += str;
    } else {
      server += str;
    }
  }
  for (const [key, options] of Object.entries(schema)) {
    if (!(options.context === "server" && options.access === "secret")) {
      continue;
    }
    server += `export let ${key} = _internalGetSecret(${JSON.stringify(key)});
`;
    onSetGetEnv += `${key} = _internalGetSecret(${JSON.stringify(key)});
`;
  }
  server = server.replace("// @@ON_SET_GET_ENV@@", onSetGetEnv);
  if (loadedEnv) {
    server = server.replace("// @@GET_ENV@@", `return (${JSON.stringify(loadedEnv)})[key];`);
  } else {
    server = server.replace("// @@GET_ENV@@", "return _getEnv(key);");
  }
  return {
    client,
    server
  };
}
export {
  astroEnv
};
