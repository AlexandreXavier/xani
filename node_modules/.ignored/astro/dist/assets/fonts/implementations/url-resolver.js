import { fileExtension, joinPaths, prependForwardSlash } from "../../../core/path.js";
import { getAssetsPrefix } from "../../utils/getAssetsPrefix.js";
import { createPlaceholderURL, stringifyPlaceholderURL } from "../../utils/url.js";
function createDevUrlResolver({
  base,
  searchParams
}) {
  let resolved = false;
  return {
    resolve(hash) {
      resolved ||= true;
      const urlPath = prependForwardSlash(joinPaths(base, hash));
      const url = createPlaceholderURL(urlPath);
      searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      return stringifyPlaceholderURL(url);
    },
    getCspResources() {
      return resolved ? ["'self'"] : [];
    }
  };
}
function createBuildUrlResolver({
  base,
  assetsPrefix,
  searchParams
}) {
  const resources = /* @__PURE__ */ new Set();
  return {
    resolve(hash) {
      const prefix = assetsPrefix ? getAssetsPrefix(fileExtension(hash), assetsPrefix) : void 0;
      let urlPath;
      if (prefix) {
        resources.add(prefix);
        urlPath = joinPaths(prefix, base, hash);
      } else {
        resources.add("'self'");
        urlPath = prependForwardSlash(joinPaths(base, hash));
      }
      const url = createPlaceholderURL(urlPath);
      searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      return stringifyPlaceholderURL(url);
    },
    getCspResources() {
      return Array.from(resources);
    }
  };
}
export {
  createBuildUrlResolver,
  createDevUrlResolver
};
