const Queue = require('bull')
const {default: log} = require('koapi/lib/logger')
const config = require('../../../../config')

const queue = exports.queue = new Queue('Mailer', config.redis.port, config.redis.host)
const worker = exports.worker = async function (job) {
  log.info('Bull: msg received %s, serverd by %s', JSON.stringify(job.data), process.pid)
  throw new Error('error')
}

exports.default = async function () {
  queue.on('ready', () => {
    log.info('Queue %s ready for jobs, PID: %s', queue.name, process.pid)
  })
  queue.process(job => {
    worker(job).catch(log.error)
  })
}
