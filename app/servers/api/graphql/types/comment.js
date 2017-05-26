const { graphql: { types, model } } = require('koapi')

module.exports = new types.Object(model({
  name: 'Comment',
  fields: model => ({
    id: model.attr(types.nonNull(types.Int)()),
    title: model.attr(types.string()),
    contents: model.attr(types.string())
  })
}))
