function createBuildUrlProxyHashResolver({
  hasher,
  contentResolver
}) {
  return {
    resolve({ originalUrl, type }) {
      return `${hasher.hashString(contentResolver.resolve(originalUrl))}.${type}`;
    }
  };
}
function createDevUrlProxyHashResolver({
  baseHashResolver
}) {
  return {
    resolve(input) {
      const { cssVariable, data } = input;
      return [
        cssVariable.slice(2),
        formatWeight(data.weight),
        data.style,
        data.subset,
        baseHashResolver.resolve(input)
      ].filter(Boolean).join("-");
    }
  };
}
function formatWeight(weight) {
  if (Array.isArray(weight)) {
    return weight.join("-");
  }
  if (typeof weight === "number") {
    return weight.toString();
  }
  return weight?.replace(/\s+/g, "-");
}
export {
  createBuildUrlProxyHashResolver,
  createDevUrlProxyHashResolver
};
