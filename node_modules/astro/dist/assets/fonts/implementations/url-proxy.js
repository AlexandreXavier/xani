import { renderFontWeight } from "../utils.js";
function createUrlProxy({
  hashResolver,
  dataCollector,
  urlResolver,
  cssVariable
}) {
  return {
    proxy({ url: originalUrl, type, data, collectPreload, init }) {
      const hash = hashResolver.resolve({ cssVariable, data, originalUrl, type });
      const url = urlResolver.resolve(hash);
      dataCollector.collect({
        url: originalUrl,
        hash,
        preload: collectPreload ? {
          url,
          type,
          weight: renderFontWeight(data.weight),
          style: data.style,
          subset: data.subset
        } : null,
        data,
        init
      });
      return url;
    }
  };
}
export {
  createUrlProxy
};
