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
    const config = require('../../config/service')
    service.start(name
      ? config.services.filter((item) => item.name === name)
      : config.services,
        cluster !== undefined ? cluster : config.cluster)
  }
}
