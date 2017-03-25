const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'lint',
  describe: 'code linting',
  async handler (argv) {
    shelljs.exec('standard ./**/*.js ./**/*.es ./**/*.jsx ' + addonArgs())
  }
}
