const { Koapi, logger: log, config } = require('koapi')
const mount = require('koa-mount')
const convert = require('koa-convert')
const compose = require('koa-compose')
const historyApiFallback = require('koa-history-api-fallback')
const proxy = require('koa-proxy')
const serve = require('koa-static')
const webpackConfig = require('../../clients/default/webpack')
const api = require('../api')
const reverseProxy = convert(proxy({
  host: `http://localhost:${webpackConfig.devServer.port}`
}))
const staticContent = process.env.WATCH_MODE
  ? compose([convert(historyApiFallback()), reverseProxy])
  : serve(webpackConfig.output.path)

const app = new Koapi()
app.use(mount('/api', api.app.koa))
app.use(mount('/', compose([
  convert(historyApiFallback()),
  staticContent
])))

module.exports = {
  clients: ['default'],
  async start () {
    app.listen(config.get('servers.app.port'), e => {
      log.info(`App is listening on port ${app.server.address().port}`)
    }).on('close', api.teardown)
  },
  async stop () {
    app.server.close()
  }
}
require.main === module && module.exports.start()
