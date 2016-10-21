import Queue from 'bull'
import config from '../../../../config'
import log from 'koapi/lib/logger'

export const queue = new Queue('Mailer', config.redis.port, config.redis.host);
export async function worker(job) {
  log.info('Bull: msg received %s, serverd by %s', JSON.stringify(job.data), process.pid);
  throw 'error';
}

export default async function () {
  queue.on('ready', ()=>{
    log.info( 'Queue %s ready for jobs, PID: %s', queue.name, process.pid);
  });
  queue.process(function (job) {
    worker(job).catch(log.error);
  });
}
