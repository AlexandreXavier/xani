function createBuildTimeAstroVersionProvider() {
  const version = "5.15.3";
  return {
    getVersion() {
      return version;
    }
  };
}
export {
  createBuildTimeAstroVersionProvider
};
