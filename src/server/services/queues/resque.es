import log from 'koapi/lib/logger'
import { queue as Queue, worker as Worker } from 'node-resque'
import config from '../../../../config'

const jobs = {
  mailer: {
    perform (msg, cb) {
      log.info('RESQUE: msg received, %s', JSON.stringify(msg))
      cb(null, 'received')
    }
  }
}

const instance = new Queue({ connection: config.redis }, jobs)
instance.on('error', log.error)
instance.connect(console.log)

export const worker = new Worker({ connection: config.redis, queues: '*' }, jobs)

export const queue = {
  enqueue (func, msg, q = '*') {
    return new Promise(async (resolve, reject) => {
      if (!instance.connection.connected) {
        await new Promise((resolve, reject) => {
          instance.connect(resolve)
        })
      }
      if (!instance.connection.connected) {
        return reject('resque connect failed!')
      }
      instance.enqueue(q, func, msg, e => (e ? reject(e) : resolve()))
    })
  }
}

export default async function () {
  return new Promise((resolve, reject) => {
    worker.on('error', log.error)
    worker.connect(() => {
      worker.workerCleanup()
      worker.start()
      log.info('Queue resque ready for jobs, PID: %s', process.pid)
      resolve()
    })
  })
}
