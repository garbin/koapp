const { Koapi, config } = require('koapi')
const convert = require('koa-convert')
const compose = require('koa-compose')
const mount = require('koa-mount')
const { logger } = require('koapi')
const historyApiFallback = require('koa-history-api-fallback')
const serve = require('koa-static')
const { path } = require('../../lib/helper')
const proxy = require('koa-proxy')

exports.default = function server (instanceName) {
  const universal = new Koapi()
  const teardowns = []
  const instanceConfig = config.get(`universal.${instanceName}`)
  for (let app of instanceConfig.apps) {
    if (app.server) {
      const instance = require(`../../servers/${app.server}`)
      teardowns.push(instance.teardown)
      universal.use(mount(app.mount, instance.app.koa))
      continue
    }
    if (app.client) {
      if (process.env.KOAPP_WATCH_MODE) {
        let webpackConfig = require(`../../clients/${app.client}/webpack`)
        let publicContent = convert(proxy({
          host: `http://${process.env.KOAPP_WEBPACK_DEV_HOST}:${webpackConfig.devServer.port}`,
          map: path => app.mount !== '/' ? `${app.mount}/${path}` : path
        }))
        universal.use(mount(app.mount, compose([convert(historyApiFallback()), publicContent])))
      } else {
        let publicContent = serve(app.path ? app.path : path.storage(`/public/${app.client}`))
        universal.use(mount(app.mount, compose([convert(historyApiFallback()), publicContent])))
      }
      continue
    }
    universal.use(mount(app.mount, require(app.path)))
  }

  const server = universal.listen(
    instanceConfig.port,
    e => logger.info(`Universal server is running on port ${instanceConfig.port}`)
  )
  server.on('close', () => teardowns.forEach(teardown => teardown()))
  return server
}
