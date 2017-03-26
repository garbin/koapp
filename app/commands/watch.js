exports.default = {
  command: 'watch [stuff] [instance]',
  describe: 'watch mode',
  builder: yargs => yargs.options({
    stuff: { default: 'universal' },
    instance: { default: 'default' },
    port: { alias: 'p' }
  }),
  async handler (argv) {
    const shelljs = require('shelljs')
    const { addonArgs } = require('../lib/helper')
    let { stuff } = argv
    let args = addonArgs()
    switch (stuff) {
      case 'server':
        shelljs.exec(`nodemon --harmony --watch \
                      app --ignore app/clients --ignore locales \
                      -L -e js,es,jsx ./app/index.js -- server ${args}`)
        break
      case 'universal':
        const { loadConfig } = require('../lib/helper')
        const config = loadConfig()
        let commands = []
        let names = []
        process.env.KOAPP_WATCH_MODE = true
        process.env.KOAPP_WEBPACK_DEV_HOST = process.env.KOAPP_WEBPACK_DEV_HOST || 'localhost'
        const instanceConfig = config.universal[argv.instance]
        for (let app of instanceConfig.apps.filter(app => app.client)) {
          names.push(app.client)
          commands.push(`"npm start watch ${app.client}"`)
        }
        names.push('universal')
        commands.push(`"nodemon --harmony --watch app \
                       --ignore app/clients -L -e js,es,jsx ./app/index.js \
                       -- universal ${argv.instance} ${args}"`)
        shelljs.exec(`concurrently -p name -n "${names.join(',')}" ${commands.join(' ')}`)
        break
      case 'service':
        shelljs.exec(`nodemon --harmony --watch app \
                      --ignore app/clients -L -e js,es,jsx ./app/index.js \
                      -- service ${args}`)
        break
      default:
        shelljs.exec(`webpack-dev-server --config ./app/clients/${argv.stuff}/webpack \
        -d --history-api-fallback --inline --progress \
        --host 0.0.0.0 ${args}`, {
          maxBuffer: 1024 * 1000
        })
    }
  }
}
