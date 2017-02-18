const schedule = require('node-schedule')
const log = require('koapi/lib/logger')
const { queue } = require('../queues/resque')
const { queue: mailer } = require('../queues/bull')

const jobs = {}

exports.default = {
  name: 'Example',
  description: 'Example',
  schedule: '*/5 * * * * *',
  do: async () => {
    if (!jobs[1]) {
      let job = schedule.scheduleJob('*/3 * * * * *', async () => {
        try {
          await queue.enqueue('mailer', { Hello: 'World' })
          await mailer.add({ Hello: 'World!' })
          log.info('msg send')
        } catch (e) {
          log.error(e)
        }
      })
      jobs[1] = job
    }
    log.info('ran into scheduler example')
  }
}
