const { ResourceRouter } = require('koapi')
const { User } = require('../../models')
const { default: user } = require('../middlewares/user')
const _ = require('lodash')

exports.default = ResourceRouter.define({
  collection: User.collection(),
  setup (router) {
    router.use(user.grant('admin.users'))
    router.create(async (ctx, next) => {
      const roles = ctx.request.body.roles
      ctx.state.attributes = _.omit(ctx.request.body, ['roles'])
      await next()
      if (roles) ctx.state.resource.roles().attach(roles)
    }).read(async (ctx, next) => {
      await next()
    }, {
      sortable: ['created_at'],
      searchable: ['username', 'email']
    }).update().destroy(async (ctx, next) => {
      if (ctx.state.user.get('id') === parseInt(ctx.params.id)) {
        throw new Error('can not destroy yourself')
      }
      await next()
    })
  }
})
