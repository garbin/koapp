const { graphql: { presets } } = require('koapi')
const { Post, Setting, User, Comment, Role } = require('../types')
const { omit } = require('lodash')
const models = require('../../../../models')
const { grant, compose } = require('../utils/resolvers')

module.exports = Object.assign({
  createUser: presets.mutation.create(User, {
    model: models.User,
    compose: compose(grant('admin.users'), resolver => {
      return async (root, args, ctx, info) => {
        const input = omit(args.input, ['roles'])
        const user = await resolver(root, Object.assign({}, args, {input}), ctx, info)
        if (args.input.roles) user.roles().attach(args.input.roles)
        return user
      }
    })
  }),
  updateUser: presets.mutation.update(User, {
    model: models.User,
    compose: compose(grant('admin.users'), resolver => {
      return async (root, args, ctx, info) => {
        const input = omit(args.input, ['roles'])
        const user = await resolver(root, Object.assign({}, args, {input}), ctx, info)
        if (args.input.roles) {
          await user.roles().detach()
          await user.roles().attach(args.input.roles)
        }
        return user
      }
    })
  }),
  removeUser: presets.mutation.remove(User, {
    model: models.User,
    compose: compose(grant('admin.users'), resolver => {
      return async (root, args, ctx, info) => {
        if (args.id === `${ctx.user.id}`) {
          throw new Error('can not destroy yourself')
        }
        const result = await resolver(root, args, ctx, info)
        return result
      }
    })
  }),
  updateSetting: presets.mutation.update(Setting, {
    model: models.Setting,
    compose: grant('admin.settings')
  })
},
  presets.mutation.cur(Post, {
    model: models.Post,
    compose: grant('admin.posts')
  }), presets.mutation.cur(Comment, {
    model: models.Comment,
    compose: grant('admin.comments')
  }), presets.mutation.cur(Role, {
    model: models.User.Role,
    compose: grant('admin.roles')
  })
)
