const { logger, router, middlewares } = require('koapi')
const posts = require('./posts')
const subdomain = require('./subdomain')
const users = require('./users')
const roles = require('./roles')
const files = require('./files')
const settings = require('./settings')
const aggregate = require('./aggregate')
const auth = require('./auth')

const index = router.define(route => {
  route.get('/', async ctx => { ctx.body = 'Hello Koapp!' })
  route.get('/error', async ctx => {
    logger.info('kk')
    logger.debug('debug')
    throw new Error('Error test')
  })
})

module.exports = middlewares.routers([
  subdomain, index, posts, auth, roles, files, settings, users, aggregate
])
