const { logger: log } = require('koapi')

module.exports = {
  name: 'Example',
  description: 'Example',
  schedule: '00 00 */1 * * *',
  async task () {
    log.info('ran into scheduler example')
  }
}
