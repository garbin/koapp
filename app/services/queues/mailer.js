const Queue = require('bull')
const {default: log} = require('koapi/lib/logger')
const config = require('../../../config')

exports.queue = new Queue('Mailer', config.redis.port, config.redis.host)
exports.queue.on('error', log.error)
exports.default = {
  name: 'Mailer',
  queue: exports.queue,
  async worker (job) {
    log.info('Bull: msg received %s, serverd by %s', JSON.stringify(job.data), process.pid)
    throw new Error('hahaha')
  }
}
