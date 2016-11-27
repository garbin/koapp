import log from 'koapi/lib/logger'
import queues from './queues'

export default {
  start (id) {
    queues.forEach(queue => queue().catch(log.error))
  },
  stop (id) {
    log.info('queue shutdown %s', id)
  }
}
