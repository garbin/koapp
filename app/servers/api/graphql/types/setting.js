const { graphql: { types, presets } } = require('koapi')

module.exports = new types.Object({
  name: 'Setting',
  fields: presets.model({
    id: types.id(),
    name: types.string(),
    desc: types.string(),
    settings: types.json()
  })
})
