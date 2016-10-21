import schedule from 'node-schedule'
import {queue} from '../queues/resque'
import {queue as mailer} from '../queues/bull'
import log from 'koapi/lib/logger'

const jobs = {};

export default {
  name: 'Example',
  description: 'Example',
  schedule: '*/5 * * * * *',
  do: async () => {
    if (!jobs[1]) {
      let job = schedule.scheduleJob('*/3 * * * * *', async () => {
        try {
          await queue.enqueue('mailer', {Hello:'World'});
          await mailer.add({Hello:"World!"});
          log.info('msg send');
        } catch (e) {
          log.error(e);
        }
      });
      jobs[1] = job;
    }
    log.info('ran into scheduler example');
  }
};
