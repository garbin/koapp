const { logger, router } = require('koapi')
const {default: auth} = require('./auth')
const {default: clients} = require('./oauth/clients')
const {default: token} = require('./oauth/token')
const {default: posts} = require('./posts')
const {default: subdomain} = require('./subdomain')
const {default: cashier} = require('./cashier')
const {default: users} = require('./users')
const {default: roles} = require('./roles')
const {default: files} = require('./files')
const {default: settings} = require('./settings')
const {default: aggregate} = require('./aggregate')
const {default: home} = require('./home')

const index = router.define(router => {
  router.get('/', async ctx => { ctx.body = 'Hello Koapp!' })
  router.get('/error', async ctx => {
    logger.info('kk')
    logger.debug('debug')
    throw new Error('Error test')
  })
})

exports.default = [ subdomain, index, posts, auth, token, clients, roles, files,
  settings, users, aggregate, cashier, home ]
