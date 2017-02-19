const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'linting',
  describe: 'code linting',
  handler: async argv => shelljs.exec('standard ./**/*.js ./**/*.es ./**/*.jsx ' + addonArgs())
}
