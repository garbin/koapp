const { router, config } = require('koapi')
const { passport, authenticate } = require('../../middlewares/passport')
const { OAuth: { Token } } = require('../../../../models')
const { Base64 } = require('js-base64')

module.exports = router.define(route => {
  route.get('/:provider', async (ctx, next) => {
    let provider = config.get(`servers.api.passport.${ctx.params.provider}.strategy`, ctx.params.provider)
    await passport.authenticate(provider, {
      state: ctx.query.state || Base64.encodeURI(ctx.query)
    })(ctx, next)
  })
  route.get('/:provider/callback', async (ctx, next) => {
    let provider = config.get(`servers.api.passport.${ctx.params.provider}.strategy`, ctx.params.provider)
    await authenticate(provider, { session: false }).call(this, ctx, next)
  }, async ctx => {
    let { clientID, redirectBack } = config.get(`servers.api.passport.${ctx.params.provider}`)
    let state = {}
    try {
      state = ctx.query.state ? JSON.parse(Base64.decode(ctx.query.state)) : {}
    } catch (e) {}
    let token = await Token.issue(clientID, ctx.state.user.get('id').toString())
    let redirectUrl = `${state.redirect || state.auth_origin_url || redirectBack || '/'}?access_token=${token.get('access_token')}`
    ctx.redirect(redirectUrl)
    ctx.body = 'redirecting...'
  })
})
