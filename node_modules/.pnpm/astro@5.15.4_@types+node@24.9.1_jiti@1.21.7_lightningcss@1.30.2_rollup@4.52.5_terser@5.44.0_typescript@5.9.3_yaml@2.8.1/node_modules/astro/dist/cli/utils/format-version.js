function formatVersion({ name, textStyler, astroVersionProvider }) {
  return `  ${textStyler.bgGreen(textStyler.black(` ${name} `))} ${textStyler.green(
    `v${astroVersionProvider.getVersion()}`
  )}`;
}
export {
  formatVersion
};
