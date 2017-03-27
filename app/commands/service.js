
exports.default = {
  command: 'service [name]',
  describe: 'service',
  builder: yargs => yargs.option('cluster', {
    alias: 'x',
    describe: 'cluster mode',
    default: undefined,
    type: 'boolean'
  }),
  handler (argv) {
    const { logger, config } = require('koapi')
    const { name, cluster } = argv
    const service = require('../services')
    logger.info(`Using environment: ${process.env.NODE_ENV}`)
    service.start(name
      ? config.get('services.enabled').filter((item) => item.name === name)
      : config.get('services.enabled'),
        cluster !== undefined ? cluster : config.get('services.cluster'))
  }
}
