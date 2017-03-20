const { Koapi } = require('koapi')
const convert = require('koa-convert')
const compose = require('koa-compose')
const mount = require('koa-mount')
const { logger, external: { winston } } = require('koapi')
const historyApiFallback = require('koa-history-api-fallback')
const serve = require('koa-static')
const config = require('../../../config/server')
const { storage } = require('../../lib/helper')
const proxy = require('koa-proxy')

exports.default = function server () {
  const universal = new Koapi()
  for (let app of config.universal.apps) {
    if (app.server) {
      universal.use(mount(app.mount, require(`../../server`).default.koa))
      continue
    }
    if (app.client) {
      if (process.env.KOAPP_WATCH_MODE) {
        let webpackConfig = require('../../../config/webpack')({client: app.client})
        let publicContent = convert(proxy({
          host: `http://${process.env.KOAPP_WEBPACK_DEV_HOST}:${webpackConfig.devServer.port}`,
          map: path => app.mount !== '/' ? `${app.mount}/${path}` : path
        }))
        universal.use(mount(app.mount, compose([convert(historyApiFallback()), publicContent])))
      } else {
        let publicContent = serve(app.path ? app.path : storage(`/public/${app.client}`))
        universal.use(mount(app.mount, compose([convert(historyApiFallback()), publicContent])))
      }
      continue
    }
    if (app.middleware) {
      universal.use(mount(app.mount, require(`../../server/middlewares/${app.middleware}`).default))
      continue
    }
    universal.use(mount(app.mount, require(app.path)))
  }

  const server = universal.listen(config.port, e => logger.info(`Universal server is running on port ${config.port}`))

  return server
}
