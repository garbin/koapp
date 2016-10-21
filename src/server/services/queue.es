import queues from './queues'
import log from 'koapi/lib/logger'

export default {
  start(id){
    queues.forEach(function (queue) { queue().catch(log.error) });
  },

  stop(id){
    log.info('queue shutdown %s', id)
  }
}
