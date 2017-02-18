const config = require('../../../../config/service')
const {default: log} = require('koapi/lib/logger')

exports.default = {
  start (id) {
    (config.queues || []).map(queue => require(`./${queue}`).default().catch(log.error))
  },
  stop (id) {
    log.info('queue shutdown %s', id)
  }
}
