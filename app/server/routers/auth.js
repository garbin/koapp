const { Router } = require('koapi')
const {default: passport, authenticate} = require('../middlewares/passport')
const config = require('../../../config/server')
const { OAuth: { Token } } = require('../../models')
const { base64 } = require('../../lib/helper')

exports.default = Router.define(router => {
  router.get('/auth/:provider', async (ctx, next) => {
    let provider = config.passport[ctx.params.provider].strategy || ctx.params.provider
    await passport.authenticate(provider, {
      state: ctx.query.state || base64.encode(ctx.query)
    })(ctx, next)
  })

  router.get('/auth/:provider/callback', async (ctx, next) => {
    let provider = config.passport[ctx.params.provider].strategy || ctx.params.provider
    await authenticate(provider, { session: false }).call(this, ctx, next)
  }, async ctx => {
    let { clientID, redirectBack } = config.passport[ctx.params.provider]
    let state = ctx.query.state ? JSON.parse(base64.decode(ctx.query.state)) : {}
    let token = await Token.issue(clientID, ctx.state.user.get('id').toString())
    let redirectUrl = `${state.redirect || state.auth_origin_url || redirectBack || '/'}?access_token=${token.get('access_token')}`
    ctx.redirect(redirectUrl)
    ctx.body = 'redirecting...'
  })
})
