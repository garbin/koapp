const { Koapi, logger, external: { winston } } = require('koapi')
const { connection } = require('../models')
const { Storage } = require('../models/file')
const fs = require('fs-extra')
const { storage, mailer } = require('../lib/helper')
const service = require('../../config/service')

logger.emitErrs = true
logger.on('error', console.error)

fs.ensureDirSync(storage('/logs'))
logger.add(winston.transports.File, {
  name: 'error',
  json: false,
  filename: storage('/logs/error.log'),
  level: 'error'
})
logger.add(winston.transports.File, {
  name: 'koapi',
  json: false,
  filename: storage('/logs/koapi.log')
})

const app = new Koapi()

app.setup(Object.assign({
  middlewares: require('./middlewares'),
  routers: require('./routers').default,
  serve: { root: storage('/public') }
}, require('../../config/server')))

exports.default = app

exports.onClose = async function () {
  // close all queues that enabled
  const queues = service.services.find(service => service.name === 'queues')
  await Promise.all((queues.config.enabled || []).map(name => {
    return require(`../services/queues/${name}`).queue.close()
  }))
  // destroy database connection
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
