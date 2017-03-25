const { logger } = require('koapi')

exports.default = {
  command: 'service [name]',
  describe: 'service',
  builder: yargs => yargs.option('cluster', {
    alias: 'x',
    describe: 'cluster mode',
    default: undefined,
    type: 'boolean'
  }),
  handler: argv => {
    logger.info(`Using environment: ${process.env.NODE_ENV}`)
    const { name, cluster } = argv
    const service = require('../services')
    const { services: config } = require('../config')
    service.start(name
      ? config.enabled.filter((item) => item.name === name)
      : config.enabled,
        cluster !== undefined ? cluster : config.cluster)
  }
}
