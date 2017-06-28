const { logger, router, middlewares } = require('koapi')
const subdomain = require('./subdomain')
const files = require('./files')
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
  subdomain, index, auth, files, aggregate
])
