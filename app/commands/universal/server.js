const { default: Koapi } = require('koapi')
const convert = require('koa-convert')
const compose = require('koa-compose')
const mount = require('koa-mount')
const { default: logger, winston } = require('koapi/lib/logger')
const historyApiFallback = require('koa-history-api-fallback')
const serve = require('koa-static')
const config = require('../../../config/server')
const { storage } = require('../../lib/helper')
const proxy = require('koa-proxy')

exports.default = function server () {
  logger.add(winston.transports.File, {
    name: 'koapp',
    json: false,
    filename: storage('/logs/koapp.log')
  })

  const app = new Koapi()

  if (config.universal.server) app.use(mount(config.universal.server, require('../../server').default.koa))

  config.universal.clients.forEach(client => {
    if (process.env.KOAPP_WATCH_MODE) {
      let webpackConfig = require('../../../config/webpack')({client: client.name})
      let publicContent = convert(proxy({
        host: `http://${process.env.KOAPP_WEBPACK_DEV_HOST}:${webpackConfig.devServer.port}`,
        map: path => client.mount !== '/' ? `${client.mount}/${path}` : path
      }))
      app.use(mount(client.mount, compose([convert(historyApiFallback()), publicContent])))
    } else {
      let publicContent = serve(storage(`/public/${client.name}`))
      app.use(mount(client.mount, compose([convert(historyApiFallback()), publicContent])))
    }
  })

  const server = app.listen(config.port, e => console.log(`Universal server running on port ${config.port}`))

  return server
}
