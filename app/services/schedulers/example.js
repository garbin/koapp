const { logger: log } = require('koapi')

exports.default = {
  name: 'Example',
  description: 'Example',
  schedule: '*/5 * * * * *',
  do: async () => {
    log.info('ran into scheduler example')
  }
}
