const { router, config } = require('koapi')
const {default: passport, authenticate} = require('../../middlewares/passport')

const serverConfig = config('servers/default')
const { OAuth: { Token } } = require('../../../../models')
const { Base64 } = require('js-base64')

exports.default = router.define(router => {
  router.get('/:provider', async (ctx, next) => {
    let provider = serverConfig.get(`passport.${ctx.params.provider}.strategy`, ctx.params.provider)
    await passport.authenticate(provider, {
      state: ctx.query.state || Base64.encodeURI(ctx.query)
    })(ctx, next)
  })

  router.get('/:provider/callback', async (ctx, next) => {
    let provider = serverConfig.get(`passport.${ctx.params.provider}.strategy`, ctx.params.provider)
    await authenticate(provider, { session: false }).call(this, ctx, next)
  }, async ctx => {
    let { clientID, redirectBack } = serverConfig.get(`passport.${ctx.params.provider}`)
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
