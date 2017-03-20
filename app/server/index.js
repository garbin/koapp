const { Koapi, logger, external: { winston } } = require('koapi')
const { connection } = require('../models')
const { Storage } = require('../models/file')
const fs = require('fs-extra')
const { storage, mailer } = require('../lib/helper')
const { services } = require('../../config/service')

fs.ensureDirSync(storage('/logs'))
logger.add(winston.transports.File, {
  name: 'server',
  json: false,
  filename: storage('/logs/server.log')
})

const app = new Koapi()

app.setup(Object.assign({
  middlewares: require('./middlewares'),
  routers: require('./routers').default,
  serve: { root: storage('/public') }
}, require('../../config/server')))

exports.default = app

exports.onClose = async function () {
  try {
    await Promise.all(services.map(({name, config}) => {
      const service = require(`../services/${name}`).default(config)
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
}

exports.startServer = function (port = 0, cb = null) {
  const server = app.listen(port, cb === null ? function () {
    logger.info(`Koapp Server is running on port ${this.address().port}`)
  } : cb)
  server.on('close', exports.onClose)
  return server
}
