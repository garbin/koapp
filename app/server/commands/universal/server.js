const { default: Koapi } = require('koapi')
const convert = require('koa-convert')
const mount = require('koa-mount')
const { default: logger, winston } = require('koapi/lib/logger')
const historyApiFallback = require('koa-history-api-fallback')
const config = require('../../../../config/server')

exports.default = function server () {
  logger.add(winston.transports.File, {
    name: 'koapp',
    json: false,
    filename: `${__dirname}/../../../../storage/logs/koapp.log`
  })

  const app = new Koapi()

  if (config.universal.api) app.use(mount(config.universal.api, require('../../').default.koa))

  app.use(convert(historyApiFallback()))
  if (config.universal.webpack_dev_server) {
    app.use(convert(require('koa-proxy')({
      host: `http://localhost:${config.universal.webpack_dev_server === true ? config.port + 1 : config.universal.webpack_dev_server}`
    })))
  } else {
    app.serve({ root: `${__dirname}/../../../../storage/public` })
  }

  const server = app.listen(config.port, e => console.log(`Server running on port ${config.port}`))

  return server
}
