const {default: index} = require('./default')
const {default: auth} = require('./auth')
const {default: clients} = require('./oauth/clients')
const {default: token} = require('./oauth/token')
const {default: posts} = require('./posts')
const {default: subdomain} = require('./subdomain')
const {default: cashier} = require('./cashier')

exports.default =  [
  subdomain,
  index,
  posts,
  auth,
  token,
  clients,
  cashier
]
