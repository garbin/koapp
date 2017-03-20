const { logger: log } = require('koapi')
exports.default = {
  command: 'server',
  describe: 'run web server',
  handler: argv => {
    log.info(`Using environment: ${process.env.NODE_ENV}`)
    const config = require('../../config/server')
    require('../server').default.listen(
      config.port,
      () => log.info(`server is running on port ${config.port}`)
    )
  }
}
