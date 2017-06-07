const { router } = require('koapi')
const connect = require('./connect')
const clients = require('./clients')
const user = require('./user')
const token = require('./token')

module.exports = router.define(route => {
  route.prefix('/auth')
  route.use('/connect', connect.routes())
  route.use('/user', user.routes())
  route.use('/token', token.routes())
  route.use('/oauth', clients.routes())
  route.use(async ctx => {})
})
