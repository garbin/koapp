const { default: Koapi } = require('koapi')
const convert = require('koa-convert')
const mount = require('koa-mount')
const { default: logger, winston } = require('koapi/lib/logger')
const historyApiFallback = require('koa-history-api-fallback')
const serve = require('koa-static')
const config = require('../../../config/server')
const { storage } = require('../../lib/helper')

exports.default = function server () {
  logger.add(winston.transports.File, {
    name: 'koapp',
    json: false,
    filename: storage('/logs/koapp.log')
  })

  const app = new Koapi()

  if (config.universal.api) app.use(mount(config.universal.api, require('../../server').default.koa))

  app.use(convert(historyApiFallback()))
  config.universal.clients.forEach(client => {
    if (client.dev_server) {
      app.use(convert(require('koa-proxy')({ host: client.dev_server })))
    } else {
      app.use(mount(client.mount, serve(storage(`/public/${client.name}`))))
    }
  })
  // if (config.universal.webpack_dev_server) {
  // } else {
  //   app.serve({ root: `${__dirname}/../../../storage/public` })
  // }

  const server = app.listen(config.port, e => console.log(`Server running on port ${config.port}`))

  return server
}
