const { Koapi, logger: log, config } = require('koapi')
const mount = require('koa-mount')
const api = require('../api')
const app = new Koapi()
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const nextApp = next({ dev, dir: path.resolve(__dirname, '../../clients/next') })
const routes = require('../../clients/next/routes')
const handle = routes.getRequestHandler(nextApp)
const ulid = require('ulid')
nextApp.prepare().then(() => {
  app.use(async (ctx, next) => {
    await next()
    ctx.state.guest_id = ctx.cookies.get('guest_id')
    if (!ctx.state.guest_id) {
      ctx.state.guest_id = ulid()
      ctx.cookies.set('guest_id', ctx.state.guest_id, { httpOnly: false })
    }
    ctx.req.cookies = ctx.cookies
    ctx.req.guest_id = ctx.state.guest_id
    ctx.req.origin = ctx.request.origin
    ctx.res.statusCode = 200
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
})

app.use(mount('/api', api.app.koa))
// app.use(mount('/', nextApp.koa))

module.exports = {
  async start () {
    app.listen(config.get('servers.app.next.port'), e => {
      log.info(`App is listening on port ${app.server.address().port}`)
    }).on('close', api.teardown)
  },
  async stop () {
    app.server.close()
  }
}
require.main === module && module.exports.start()
