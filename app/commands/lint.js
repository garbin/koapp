
exports.default = {
  command: 'lint',
  describe: 'code linting',
  async handler (argv) {
    const shelljs = require('shelljs')
    const { addonArgs } = require('../lib/helper')
    shelljs.exec('standard ./**/*.js ./**/*.es ./**/*.jsx ' + addonArgs())
  }
}
