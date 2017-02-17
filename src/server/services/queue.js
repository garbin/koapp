const log = require('koapi/lib/logger')
const {default: queues} = require('./queues')

exports.default = {
  start (id) {
    queues.forEach(queue => queue().catch(log.error))
  },
  stop (id) {
    log.info('queue shutdown %s', id)
  }
}
