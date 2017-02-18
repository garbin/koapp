const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack')
const { createIsomorphicWebpack } = require('isomorphic-webpack')
const compose = require('koa-compose')
const { renderToString } = require('react-dom/server')
const webpackConfig = require('../../../config/webpack')
function renderFullPage (body) {
  return `
  <!doctype html>
  <html>
    <head></head>
    <body>
      <div id='koapp'>${body}</div>
      <script src='/static/app.js'></script>
    </body>
  </html>
  `
}

exports.default = function () {
  const compiler = webpack(webpackConfig)
  const { createCompilationPromise, evalBundleCode } = createIsomorphicWebpack(webpackConfig, { useCompilationPromise: true })
  return compose([webpackDevMiddleware({ compiler,
    config: {
      noInfo: false,
      publicPath: '/static',
      quiet: false,
      stats: {
        assets: false,
        chunkModules: false,
        chunks: false,
        colors: true,
        hash: false,
        timings: false,
        version: false
      }
    }}), async (ctx, next) => {
      await createCompilationPromise()
      await next()
      const app = renderToString(evalBundleCode(ctx.request.origin).default)
      ctx.body = renderFullPage(app)
    }])
}
