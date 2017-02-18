const { default: Koapi } = require('koapi')
const convert = require('koa-convert')
const mount = require('koa-mount')
const { default: logger, winston } = require('koapi/lib/logger')
const historyApiFallback = require('koa-history-api-fallback')
const config = require('../../../../config')

exports.default = function server (webpackIsomorphicTools) {
  logger.add(winston.transports.File, {
    name: 'koapp',
    json: false,
    filename: `${__dirname}/../../../../storage/logs/koapp.log`
  })

  const app = new Koapi()

  if (config.universal.server) {
    app.use(mount(config.universal.server, require('../../').default.koa))
  }

  if (config.universal.ssr) {
    if (process.env.NODE_ENV === 'development')webpackIsomorphicTools.refresh()
    app.use(require('../../middlewares/ssr').default(webpackIsomorphicTools))
  }

  app.use(convert(historyApiFallback()))
  if (process.env.USE_WEBPACK_DEV_SERVER) {
    app.use(convert(require('koa-proxy')({
      host: `http://localhost:${config.dev_server_port || config.port + 1}`
    })))
  } else {
    app.serve({ root: `${__dirname}/../../../../storage/public` })
  }

  const server = app.listen(
    config.port,
    e => console.log(`Server running on port ${config.port}`)
  )

  return server
}
