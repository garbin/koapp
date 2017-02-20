const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'watch [stuff]',
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
      case 'server':
        shelljs.exec('nodemon --harmony --watch app/server --watch config -L -e js,es,jsx `which koapi` -- server ' + args)
        break
      case 'universal':
        const config = require('../../config/server')
        let commands = []
        let names = []
        process.env.KOAPP_WATCH_MODE = true
        process.env.KOAPP_WEBPACK_DEV_HOST = process.env.KOAPP_WEBPACK_DEV_HOST || 'localhost'
        for (let client of config.universal.clients) {
          names.push(client.name)
          commands.push(`"npm start watch ${client.name}"`)
        }
        names.push('universal')
        commands.push('"nodemon --harmony --watch app/server --watch config -L -e js,es,jsx `which koapi` -- universal ' + args + '"')
        shelljs.exec(`concurrently -p name -n "${names.join(',')}" ${commands.join(' ')}`)
        break
      case 'service':
        shelljs.exec('nodemon --harmony --watch app/server --watch config -L -e js,es,jsx `which koapi` -- service ' + args)
        break
      default:
        shelljs.exec(`webpack-dev-server --config ./config/webpack --env.client ${argv.stuff} -d --history-api-fallback --inline --progress --host 0.0.0.0 ${args}`, {
          maxBuffer: 1024 * 1000
        })
    }
  }
}
