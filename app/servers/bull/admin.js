const { config } = require('koapi')
const Arena = require('bull-arena')
const queues = config.get('servers.bull.queues')
module.exports = {
  async start () {
    Arena({
      queues: queues.map(name => ({
        name,
        port: config.get('redis.port'),
        host: config.get('redis.host'),
        hostId: config.get('servers.bull.ui.hostId')
      }))
    }, {
      port: config.get('servers.bull.ui.port')
    })
  }
}
