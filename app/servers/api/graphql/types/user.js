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
      resolve: presets.batch.belongsToMany(models.User.Role, {
        relation: 'roles'
      })
    })
  })
})

const Role = require('./role')
