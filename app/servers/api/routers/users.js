const { router } = require('koapi')
const { User } = require('../../../models')
const user = require('../middlewares/user')
const { omit } = require('lodash')

module.exports = router.resource(User, route => {
  route.use(user.grant('admin.users'))
  route.create(async (ctx, next) => {
    const roles = ctx.request.body.roles
    ctx.state.attributes = omit(ctx.request.body, ['roles'])
    await next()
    if (roles) ctx.state.resource.roles().attach(roles)
  }).read({
    list: {
      sortable: ['created_at'],
      searchable: ['username', 'email']
    },
    item: {
      fetch: {
        withRelated: ['roles']
      }
    }
  }).update(async (ctx, next) => {
    const roles = ctx.request.body.roles
    ctx.state.attributes = omit(ctx.request.body, ['roles'])
    await next()
    if (roles) {
      await ctx.state.resource.roles().detach()
      await ctx.state.resource.roles().attach(roles)
    }
  }).destroy(async (ctx, next) => {
    if (ctx.state.user.get('id') === parseInt(ctx.params.id)) {
      throw new Error('can not destroy yourself')
    }
    await next()
  })
})
