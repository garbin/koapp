const { router } = require('koapi')
const { authenticate } = require('../../middlewares/passport')
const {default: oauthServer} = require('../../middlewares/oauth2orize')
const { OAuth: { Token } } = require('../../../../models')
const { connect } = require('../../../../lib/helper')

exports.default = router.define(router => {
  router.get('/oauth/token', authenticate('bearer'), async ctx => {
    ctx.body = ctx.state.user
  })

  router.del('/oauth/token', authenticate('bearer'), async ctx => {
    let { accessToken } = ctx.state.authInfo
    await Token.where({ access_token: accessToken }).destroy()
    ctx.status = 204
  })

  router.post('/oauth/token',
             authenticate('oauth2-client-password'),
             connect(oauthServer.token()),
             async (ctx, next) => {
               try {
                 await next()
               } catch (e) {
                 await connect((res, req, next) => {
                   oauthServer.errorHandler(e, res, req, next)
                 }, null)(ctx, next)
               }
             })
})
