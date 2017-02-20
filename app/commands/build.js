const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'build [stuff]',
  describe: 'build stuff',
  builder: {
    stuff: {
      default: 'website',
      choices: ['website']
    },
    delete: {
      alias: 'd',
      boolean: true
    }
  },
  handler: async argv => {
    if (argv.delete) shelljs.exec(`rm -rf storage/public/${argv.stuff}/* && echo "${argv.stuff} deleted"`)
    shelljs.exec(`webpack --progress --colors --config ./config/webpack --env.client ${argv.stuff || 'website'} ${addonArgs()}`)
  }
}
