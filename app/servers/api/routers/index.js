const { logger, router, middlewares } = require('koapi')
const Posts = require('./posts')
const Subdomain = require('./subdomain')
const Users = require('./users')
const Roles = require('./roles')
const Files = require('./files')
const Settings = require('./settings')
const Aggregate = require('./aggregate')
const Auth = require('./auth')

class Index extends router.Base {
  setup () {
    this.get('/', async ctx => { ctx.body = 'Hello Koapp!' })
    this.get('/error', async ctx => {
      logger.info('kk')
      logger.debug('debug')
      throw new Error('Error test')
    })
  }
}

module.exports = middlewares.routers([
  Subdomain, Index, Posts, Auth, Roles, Files, Settings, Users, Aggregate
])
