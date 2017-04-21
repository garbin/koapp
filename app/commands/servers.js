exports.default = {
  command: 'servers [names..]',
  describe: 'run web server',
  builder: {
    config: { alias: 'c' }
  },
  handler (argv) {
    const names = argv.names.length ? argv.names : ['api', 'queues', 'schedulers']
    const { logger: log } = require('koapi')
    log.info(`Using environment: ${process.env.NODE_ENV}`)
    names.forEach(name => {
      const server = require(`../servers/${name}`)
      server.start()
    })
  }
}
