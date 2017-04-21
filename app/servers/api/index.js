const { Koapi, logger, middlewares, config } = require('koapi')
const { connection } = require('../../models')
const { Storage } = require('../../models/file')
const { mailer, path } = require('../../lib/helper')
const services = config.get('services')
const serverConfig = config('servers/default').all()

const app = new Koapi()

app.use(middlewares.preset('restful', serverConfig.middlewares))
app.use(middlewares.serve(path.storage('/public')))
app.use(require('./middlewares').before)
app.use(require('./routers').default)
app.use(require('./middlewares').after)

async function teardown () {
  require('../queues').stop()
  require('../schedulers').stop()
  connection.destroy()
  // close nodemailer agent
  mailer().close()
  // close minio agent
  Storage.agent.destroy()
}

module.exports = {
  app,
  teardown,
  start (port = serverConfig.port, cb = null) {
    const server = app.listen(port, cb === null ? function () {
      logger.info(`Server is running on port ${this.address().port}`)
    } : cb)
    server.on('close', teardown)
    return server
  },
  stop () { app.server.close() }
}
require.main === module && module.exports.start()
