const { subdomain } = require('koapi/lib/middlewares')
const { router } = require('koapi')

module.exports = subdomain('api.*', router.define(route => {
  route.get('/', async ctx => {
    ctx.body = 'api'
  })
}).routes())
