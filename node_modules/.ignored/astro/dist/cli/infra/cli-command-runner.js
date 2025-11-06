function createCliCommandRunner({ helpDisplay }) {
  return {
    run(command, ...args) {
      if (helpDisplay.shouldFire()) {
        helpDisplay.show(command.help);
        return;
      }
      return command.run(...args);
    }
  };
}
export {
  createCliCommandRunner
};
