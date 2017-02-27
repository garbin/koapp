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

  const universal = new Koapi()
  for (let app of config.universal.apps) {
    switch (app.type) {
      case 'server':
        let middleware = app.path ? require(app.path) : require(`../../${app.name}`).default.koa
        universal.use(mount(app.point, middleware))
        break
      case 'static':
      default:
        if (process.env.KOAPP_WATCH_MODE) {
          let webpackConfig = require('../../../config/webpack')({client: app.name})
          let publicContent = convert(proxy({
            host: `http://${process.env.KOAPP_WEBPACK_DEV_HOST}:${webpackConfig.devServer.port}`,
            map: path => app.point !== '/' ? `${app.point}/${path}` : path
          }))
          universal.use(mount(app.point, compose([convert(historyApiFallback()), publicContent])))
        } else {
          let publicContent = serve(app.path ? app.path : storage(`/public/${app.name}`))
          universal.use(mount(app.point, compose([convert(historyApiFallback()), publicContent])))
        }
        break
    }
  }

  const server = universal.listen(config.port, e => logger.info(`Universal server running on port ${config.port}`))

  return server
}
