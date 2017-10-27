const { graphql: { types, presets } } = require('koapi')
const { Setting, Post, Role, User } = require('../types')
const models = require('../../../../models')
const { grant } = require('../utils/resolvers')

module.exports = {
  search: presets.search({
    POST: types.type(Post, {
      model: models.Post,
      compose: grant('admin.posts'),
      resolveOptions: {
        sortable: ['created_at', 'updated_at', 'price'],
        searchable: ['name', 'desc']
      }
    }),
    USER: types.type(User, {
      model: models.User,
      compose: grant('admin.users'),
      resolveOptions: {
        sortable: ['created_at'],
        searchable: ['username', 'email']
      }
    }),
    ROLE: types.type(Role, {
      model: models.User.Role,
      compose: grant('admin.roles'),
      resolveOptions: {
        searchable: ['name']
      }
    })
  }, { args: presets.connection.args() }),
  fetch: presets.fetch({
    POST: types.type(Post, {
      model: models.Post,
      compose: grant('admin.posts')
    }),
    USER: types.type(User, {
      model: models.User,
      compose: grant('admin.users')
    }),
    ROLE: types.type(Role, {
      model: models.User.Role,
      compose: grant('admin.roles')
    }),
    SETTING: types.type(Setting, {
      model: models.Setting,
      compose: grant('admin.settings')
    })
  }),
  hello: types.type(new types.Object({
    name: 'Hello',
    fields: {
      name: types.string()
    }
  }), {
    resolve () {
      return { name: 'World' }
    }
  }),
  viewer: types.type(User, {
    resolve: async (root, args, ctx, info) => ctx.user
  })
}
