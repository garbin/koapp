const { router } = require('koapi')
const { default: connect } = require('./connect')
const { default: clients } = require('./clients')
const { default: user } = require('./user')
const { default: token } = require('./token')

exports.default = router.define(router => {
  router.prefix('/auth')
  router.use('/connect', connect.routes())
  router.use('/user', user.routes())
  router.use('/token', token.routes())
  router.use('/oauth', clients.routes())
  router.use(async ctx => {})
})
