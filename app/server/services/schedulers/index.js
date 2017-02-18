const config = require('../../../../config/service')
const schedule = require('node-schedule')
const { default: log } = require('koapi/lib/logger')

function done (scheduler) {
  context.done += 1
  log.info('%s done: %s', scheduler.name, context.done)
}

function error (scheduler, e) {
  context.error += 1
  log.error(e)
  log.error('%s error: %s', scheduler.name, context.error)
}
function init (scheduler) {
  let empty = async () => {}
  return {
    schedule: scheduler.schedule || '00 */1 * * * *',
    name: scheduler.name || 'default',
    description: scheduler.description || 'default',
    do: scheduler.do || empty,
    done: scheduler.done || empty
  }
}

const context = exports.context = {
  jobs: [],
  done: 0,
  error: 0
}

exports.default = {
  start (id) {
    (config.schedulers || []).map(name => {
      let scheduler = init(require(`./${name}`).default)
      if (scheduler.do) {
        let job = schedule.scheduleJob(scheduler.name, scheduler.schedule, function () {
          scheduler.do().then(done.bind(job, scheduler)).catch(error.bind(job, scheduler))
        }, function () {
          scheduler.done().catch(log.error)
        })
        log.info('%s started, schedule: %s', scheduler.name, scheduler.schedule)
        // job.start();
        context.jobs.push(job)
      }
    })
  },

  stop (id) {
    log.info('scheduler down')
  }
}
