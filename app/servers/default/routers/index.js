const { logger, router, middlewares } = require('koapi')
const {default: posts} = require('./posts')
const {default: subdomain} = require('./subdomain')
const {default: cashier} = require('./cashier')
const {default: users} = require('./users')
const {default: roles} = require('./roles')
const {default: files} = require('./files')
const {default: settings} = require('./settings')
const {default: aggregate} = require('./aggregate')
const {default: auth} = require('./auth')

const index = router.define(router => {
  router.get('/', async ctx => { ctx.body = 'Hello Koapp!' })
  router.get('/error', async ctx => {
    logger.info('kk')
    logger.debug('debug')
    throw new Error('Error test')
  })
})

exports.default = middlewares.routers([
  subdomain, index, posts, auth, roles, files,
  settings, users, aggregate, cashier
])
