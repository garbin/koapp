const { subdomain } = require('koapi/lib/middlewares')
const { router } = require('koapi')

const subdomainRouter = exports.router = router.define(router => {
  router.get('/', async ctx => {
    ctx.body = 'api'
  })
})

exports.default = subdomain('api.*', subdomainRouter.routes())
