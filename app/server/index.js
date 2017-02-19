const {default: Koapi} = require('koapi')
const {default: logger, winston} = require('koapi/lib/logger')
const fs = require('fs-extra')
const { storage } = require('../lib/helper')

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
