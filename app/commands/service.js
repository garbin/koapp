
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
    const { logger } = require('koapi')
    const { name, cluster } = argv
    const { loadConfig } = require('../lib/helper')
    const service = require('../services')
    const { services: config } = loadConfig()
    logger.info(`Using environment: ${process.env.NODE_ENV}`)
    service.start(name
      ? config.enabled.filter((item) => item.name === name)
      : config.enabled,
        cluster !== undefined ? cluster : config.cluster)
  }
}
