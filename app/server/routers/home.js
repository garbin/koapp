const { Router } = require('koapi')
const { User } = require('../../models')
const { default: user } = require('../middlewares/user')

exports.default = Router.define(router => {
  router.prefix('/home')
  router.use(user.required())
  router.get('/profile', async ctx => { ctx.body = ctx.state.user })
  router.patch('/profile', async ctx => {
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
