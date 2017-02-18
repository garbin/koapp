const { Router } = require('koapi')
const { authenticate } = require('../../middlewares/passport')
const {default: oauthServer} = require('../../middlewares/oauth')
const { Token } = require('../../models')

exports.default =  Router.define(router => {
  router.get('/oauth/token', authenticate('bearer'), async ctx => {
    ctx.body = ctx.state.user
  })

  router.del('/oauth/token', authenticate('bearer'), async ctx => {
    let { access_token } = ctx.state.authInfo
    await Token.where({ access_token }).destroy()
    ctx.status = 204
  })

  router.post('/oauth/token',
             authenticate('oauth2-client-password'),
             oauthServer.token(),
             oauthServer.errorHandler())
})
