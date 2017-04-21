const { logger: log } = require('koapi')
const queues = ['mailer']

module.exports = {
  async start () {
    queues.forEach(name => {
      const queue = require(`./${name}`)
      queue.bull.on('ready', () => {
        log.info('Queue %s ready for jobs, PID: %s', queue.name, process.pid)
      })
      queue.bull.process(job => {
        return queue.worker(job).catch(log.error)
      })
    })
  },
  async stop () {
    await Promise.all(queues.map(name => require(`./${name}`).bull.close()))
  }
}
