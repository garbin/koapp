const { graphql: { types, presets } } = require('koapi')
const { Setting, Post, Role, User } = require('./types')
const models = require('../../../models')
const { grant } = require('./utils/resolvers')

module.exports = {
  search: presets.search({
    POST: types.type(Post, {
      model: models.Post,
      resolve: grant('admin.posts')(presets.connection.resolve({
        collection: ctx => models.Post.collection(),
        sortable: ['created_at', 'updated_at', 'price'],
        searchable: ['name', 'desc']
      }))
    }),
    USER: types.type(User, {
      model: models.User,
      resolve: grant('admin.users')(presets.connection.resolve({
        collection: ctx => models.User.collection(),
        sortable: ['created_at'],
        searchable: ['username', 'email']
      }))
    }),
    ROLE: types.type(Role, {
      model: models.User.Role,
      resolve: grant('admin.roles')(presets.connection.resolve({
        collection: ctx => models.User.Role.collection(),
        searchable: ['name']
      }))
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
  viewer: types.type(User, {
    resolve: async (root, args, ctx, info) => ctx.user
  })
}
