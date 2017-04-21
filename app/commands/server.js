exports.default = {
  command: 'server [name]',
  describe: 'run web server',
  builder: { name: { default: 'default' } },
  handler (argv) {
    const { logger: log, config } = require('koapi')
    log.info(`Using environment: ${process.env.NODE_ENV}`)
    const server = require(`../servers/${argv.name}`)
    server.start(config(`servers/${argv.name}`).get('port'))
  }
}
