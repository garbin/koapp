const { Router } = require('koapi')
const { User } = require('../../models')
const { default: user } = require('../middlewares/user')
const { default: sendMail } = require('../middlewares/sendmail')
// const config = require('../../../config/client')

exports.default = Router.define(router => {
  router.prefix('/home')
  router.patch('/forget', async (ctx, next) => {
    const { email } = ctx.request.body
    ctx.body = await User.resetToken(email)
    ctx.status = 202
    ctx.state.mail = {
      to: email,
      context: { link: ctx.body.get('reset_token') }
    }
    await next()
  }, sendMail('mail.template.reset_password'))

  router.patch('/reset_password', async ctx => {
    const { password, reset_token: resetToken, username } = ctx.request.body
    ctx.body = await User.resetPassword({
      password,
      resetToken,
      username
    })
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
