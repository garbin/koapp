const schedule = require('node-schedule')
const { logger: log, config } = require('koapi')
const schedulers = config.get('servers.schedulers', [])
const context = {
  jobs: [],
  done: 0,
  error: 0
}

function init (scheduler) {
  let empty = async () => {}
  return {
    schedule: scheduler.schedule || '00 */1 * * * *',
    name: scheduler.name || 'default',
    description: scheduler.description || 'default',
    task: scheduler.task || empty,
    done: scheduler.done || empty
  }
}

function done (scheduler) {
  context.done += 1
  log.info('%s done: %s', scheduler.name, context.done)
}

function error (scheduler, e) {
  context.error += 1
  log.error(e)
  log.error('%s error: %s', scheduler.name, context.error)
}

module.exports = {
  context,
  async start () {
    schedulers.forEach(name => {
      const scheduler = init(require(`./${name}`))
      if (scheduler.task) {
        const job = schedule.scheduleJob(scheduler.name, scheduler.schedule, function () {
          scheduler.task().then(done.bind(job, scheduler)).catch(error.bind(job, scheduler))
        }, function () {
          scheduler.done().catch(log.error)
        })
        log.info('%s started, schedule: %s', scheduler.name, scheduler.schedule)
        // job.start();
        context.jobs.push(job)
      }
    })
  },
  async stop () {
    context.jobs.forEach(job => job.cancel())
  }
}
