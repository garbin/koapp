const { router } = require('koapi')
const Connect = require('./connect')
const Clients = require('./clients')
const User = require('./user')
const Token = require('./token')

module.exports = class extends router.Base {
  setup () {
    this.prefix('/auth')
    this.use('/connect', new Connect().routes())
    this.use('/user', new User().routes())
    this.use('/token', new Token().routes())
    this.use('/oauth', new Clients().routes())
    this.use(async ctx => {})
  }
}
