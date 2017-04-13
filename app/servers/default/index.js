const { Koapi, logger, middlewares, config } = require('koapi')
const { connection } = require('../../models')
const { Storage } = require('../../models/file')
const { mailer, path } = require('../../lib/helper')
const services = config.get('services')
const serverConfig = config('servers/default').all()

const app = new Koapi()

app.on('close', async () => {
  try {
    await Promise.all(services.enabled.map(({name, config}) => {
      const service = require(`../../services/${name}`).default(config)
      return service.disconnect()
    }))
  } catch (e) {
    console.error(e)
  }
  connection.destroy()
  // close nodemailer agent
  mailer().close()
  // close minio agent
  Storage.agent.destroy()
})
app.use(middlewares.preset('restful', serverConfig.middlewares))
app.use(middlewares.serve(path.storage('/public')))
app.use(require('./middlewares').before)
app.use(require('./routers').default)
app.use(require('./middlewares').after)

module.exports = {
  app,
  start (port = 0, cb = null) {
    const server = app.listen(port, cb === null ? function () {
      logger.info(`Koapp Server is running on port ${this.address().port}`)
    } : cb)
    return server
  },
  stop () { app.server.close() }
}
if (require.main === module) module.exports.start(serverConfig.port)
