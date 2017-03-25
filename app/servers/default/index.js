const { Koapi, logger } = require('koapi')
const { connection } = require('../../models')
const { Storage } = require('../../models/file')
const { storage, mailer } = require('../../lib/helper')
const { services } = require('../../services/config')
const config = require('./config')

const app = new Koapi()

app.setup(Object.assign({
  middlewares: require('./middlewares'),
  routers: require('./routers').default,
  serve: { root: storage('/public') }
}, config))

app.teardown(async () => {
  try {
    await Promise.all(services.map(({name, config}) => {
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
if (require.main === module) module.exports.start(config.port)
