function createProcessPlatformProvider() {
  const platform = Boolean(process.env.GITPOD_REPO_ROOT) ? "gitpod" : process.platform;
  return {
    get() {
      return platform;
    }
  };
}
export {
  createProcessPlatformProvider
};
