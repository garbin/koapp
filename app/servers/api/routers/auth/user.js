const { router, config } = require('koapi')
const { User } = require('../../../../models')
const { default: user } = require('../../middlewares/user')
const { default: sendMail } = require('../../middlewares/sendmail')
const { Base64 } = require('js-base64')
const qs = require('query-string')

exports.default = router.define(router => {
  router.patch('/forget', async (ctx, next) => {
    const { email } = ctx.request.body
    const user = await User.where({email}).fetch({require: true})
    ctx.body = await user.resetToken()
    ctx.status = 202
    const meta = { email, token: ctx.body.get('reset_token') }
    ctx.state.mail = {
      to: email,
      context: {
        link: `${config.get('servers.api.clientUrl')}/admin/session/reset?${Base64.encodeURI(qs.stringify(meta))}`
      }
    }
    await next()
  }, sendMail('mail.template.reset_password'))

  router.patch('/security', async ctx => {
    const { password, token, email } = ctx.request.body
    const user = await User.where({email, reset_token: token})
                           .where('reset_expires', '>', new Date())
                           .fetch({require: true})
    ctx.body = await user.save({ password, reset_expires: new Date() })
    ctx.status = 202
  })

  router.get('/profile', user.required(), async ctx => { ctx.body = ctx.state.user })

  router.patch('/profile', user.required(), async ctx => {
    const { password, old_password: oldPassword, avatar } = ctx.request.body
    let profile = {}
    if (password && oldPassword) {
      await User.auth(ctx.state.user.get('username'), oldPassword)
      profile.password = password
    }
    avatar && (profile.avatar = avatar)
    ctx.body = await ctx.state.user.save(profile)
    ctx.status = 202
  })
})
