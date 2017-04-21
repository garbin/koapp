exports.default = {
  command: 'server [name]',
  describe: 'run web server',
  builder: {
    name: { default: 'default' },
    config: { alias: 'c' }
  },
  handler (argv) {
    const { logger: log, config } = require('koapi')
    const configNS = argv.config || argv.name.split('/')[0]
    log.info(`Using environment: ${process.env.NODE_ENV}`)
    const server = require(`../servers/${argv.name}`)
    server.start(config(`servers/${configNS}`).get('port'))
  }
}
