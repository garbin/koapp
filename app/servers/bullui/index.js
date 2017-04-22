const { config, logger: log } = require('koapi')
const ui = require('bull-ui/app')({
  redis: {
    host: config.get('redis.host'),
    port: config.get('redis.port'),
    password: config.get('redis.password')
  }
})
let server
module.exports = {
  async start () {
    server = ui.listen(config.get('servers.bullui.port'), function () {
      log.info('Bull-UI started listening on port', this.address().port)
    })
  },
  async stop () {
    server.close()
  }
}
