module.exports = {
  command: '*',
  describe: 'Default Command',
  handler (argv) {
    argv._.forEach(modulePath => require(`../servers/${modulePath}`).start())
  }
}
