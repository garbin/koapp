const {default: index} = require('./default')
const {default: auth} = require('./auth')
const {default: clients} = require('./oauth/clients')
const {default: token} = require('./oauth/token')
const {default: posts} = require('./posts')
const {default: subdomain} = require('./subdomain')
const {default: cashier} = require('./cashier')
const {default: users} = require('./users')
const {default: roles} = require('./roles')
const {default: files} = require('./files')

exports.default = [
  subdomain,
  index,
  posts,
  auth,
  token,
  clients,
  roles,
  files,
  users,
  cashier
]
