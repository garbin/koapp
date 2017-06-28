const { graphql: { types, presets } } = require('koapi')

module.exports = new types.Object({
  name: 'User',
  fields: _ => presets.model({
    id: types.string(),
    username: types.string(),
    password: types.string(),
    avatar: types.string(),
    email: types.string(),
    created_at: types.datetime(),
    updated_at: types.datetime(),
    roles: types.list(Role, {
      resolve: presets.batch.belongsToMany({ relation: 'roles' })
    })
  })
})

const Role = require('./role')
