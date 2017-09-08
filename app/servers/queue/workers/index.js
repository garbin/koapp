const { logger: log, config } = require('koapi')
const queues = config.get('servers.queues', [])

const internal = module.exports = {
  queues () {
    return queues.map(name => {
      const worker = require(`./${name}`)
      return worker
    })
  },
  async start () {
    internal.queues().forEach(worker => {
      log.info('Queue %s ready for jobs, PID: %s', worker.name, process.pid)
      worker.queue.process(job => {
        return worker.worker(job).catch(log.error)
      })
    })
  },
  async stop () {
    await Promise.all(queues.map(name => require(`./${name}`).queue.close()))
  }
}
