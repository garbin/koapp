const { subdomain } = require('koapi/lib/middlewares')
const { Router } = require('koapi')

const router = exports.router = Router.define(router => {
  router.get('/', async ctx => {
    ctx.body = 'api'
  })
})

exports.default = subdomain('api.*', router.routes())
