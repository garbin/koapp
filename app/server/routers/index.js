const { Router } = require('koapi')
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
const {default: stat} = require('./stat')
const {default: home} = require('./home')

const index = Router.define(router => {
  router.get('/', ctx => { ctx.body = 'Hello Koapp!' })
})

exports.default = [ subdomain, index, posts, auth, token, clients, roles, files,
  settings, users, stat, cashier, home ]
