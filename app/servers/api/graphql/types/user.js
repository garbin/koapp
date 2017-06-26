const { graphql: { types, presets } } = require('koapi')
const models = require('../../../../models')

module.exports = new types.Object({
  name: 'User',
  fields: _ => presets.model({
    id: types.string(),
    username: types.string(),
    password: types.string(),
    avatar: types.string(),
    email: types.string(),
    roles: types.list(Role, {
      resolve: presets.batch.hasMany({
        foreignKey: 'user2role.user_id',
        attrName: 'user_id',
        model: models.User.Role,
        query: q => q.join('user2role', 'roles.id', '=', 'user2role.role_id')
      })
    })
  })
})

const Role = require('./role')
