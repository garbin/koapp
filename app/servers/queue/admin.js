const { config } = require('koapi')
const Arena = require('bull-arena')
const workers = require('./workers')
module.exports = {
  async start () {
    Arena({
      queues: workers.queues().map(worker => ({
        name: worker.name,
        port: config.get('redis.port'),
        host: config.get('redis.host'),
        hostId: 'Koapp'
      }))
    }, {
      port: config.get('servers.bullui.port')
    })
  }
}
