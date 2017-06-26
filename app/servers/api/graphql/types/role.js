const { graphql: { types, presets } } = require('koapi')

module.exports = new types.Object({
  name: 'Role',
  fields: _ => presets.model({
    id: types.id(),
    name: types.string(),
    desc: types.string(),
    permissions: types.json()
  })
})
