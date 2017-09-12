const { logger: log, config } = require('koapi')
const queues = config.get('servers.bull.queues', []).map(name => require(`./${name.toLowerCase()}`))
module.exports = {
  async start () {
    queues.forEach(item => {
      log.info('Queue %s ready for jobs, PID: %s', item.name, process.pid)
      item.queue.process(job => {
        return item.worker(job).catch(log.error)
      })
    })
  },
  async stop () {
    await Promise.all(queues.map(item => item.queue.close()))
  }
}
