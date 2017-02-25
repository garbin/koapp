const config = require('../../../config/service')
const {default: log} = require('koapi/lib/logger')

exports.default = {
  start (id) {
    (config.worker.queues.enabled || []).map(id => {
      const queue = require(`./${id}`).default
      queue.queue.on('ready', () => {
        log.info('Queue %s ready for jobs, PID: %s', queue.name, process.pid)
      })
      queue.queue.process(job => {
        queue.worker(job).catch(log.error)
      })
    })
  },
  stop (id) {
    log.info('queue shutdown %s', id)
  }
}
