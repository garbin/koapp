import schedule from 'node-schedule'
import schedulers from './schedulers'
import log from 'koapi/lib/logger'

function done(scheduler) {
  context.done++;
  log.info('%s done: %s', scheduler.name, context.done);
}

function error(scheduler, e) {
  context.error++;
  log.error(e);
  log.error('%s error: %s', scheduler.name, context.error);
}
function init(scheduler) {
  var empty = async () => {};
  return {
    schedule: scheduler.schedule || '00 */1 * * * *',
    name: scheduler.name || 'default',
    description: scheduler.description || 'default',
    do: scheduler.do || empty,
    done: scheduler.done || empty
  };
}

export const context = {
  jobs: [],
  done: 0,
  error: 0
};

export default {
  start(id){
    schedulers.forEach(scheduler => {
      scheduler = init(scheduler);
      if (scheduler.do) {
        let job = schedule.scheduleJob(scheduler.name, scheduler.schedule, function () {
          scheduler.do().then(done.bind(job, scheduler)).catch(error.bind(job, scheduler));
        }, function () {
          scheduler.done().catch(log.error);
        });
        log.info('%s started, schedule: %s', scheduler.name, scheduler.schedule);
        // job.start();
        context.jobs.push(job);
      }
    });
  },

  stop(id){
    log.info('scheduler down');
  }
}
