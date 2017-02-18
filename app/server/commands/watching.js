const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'watching [stuff]',
  describe: 'watch mode',
  builder: yargs => yargs.options({
    stuff: {
      default: 'universal'
    },
    port: { alias: 'p' }
  }),
  handler: async argv => {
    let { stuff } = argv
    let args = addonArgs()
    switch (stuff) {
      case 'client':
        shelljs.exec(`webpack-dev-server --config ./config/webpack -d --history-api-fallback --inline --progress --host 0.0.0.0 ${args}`, {
          maxBuffer: 1024 * 1000
        })
        break
      case 'server':
        shelljs.exec('nodemon --harmony --watch app/server --watch config -L -e js,es,jsx `which koapi` -- server ' + args)
        break
      case 'universal':
        shelljs.exec('nodemon --harmony --watch app/server --watch config -L -e js,es,jsx `which koapi` -- universal ' + args)
        break
      case 'service':
        shelljs.exec('nodemon --harmony --watch app/server --watch config -L -e js,es,jsx `which koapi` -- service ' + args)
        break
    }
  }
}
