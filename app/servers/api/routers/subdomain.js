const { subdomain } = require('koapi/lib/middlewares')
const { router } = require('koapi')

class Subdomain extends router.Base {
  setup () {
    this.get('/', async ctx => {
      ctx.body = 'api'
    })
  }
}

module.exports = subdomain('api.*', new Subdomain().routes())
