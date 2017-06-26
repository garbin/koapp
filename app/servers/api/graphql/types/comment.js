const { graphql: { types, presets } } = require('koapi')
const models = require('../../../../models')

module.exports = new types.Object({
  name: 'Comment',
  fields: _ => presets.model({
    id: types.nonNull(types.Int),
    title: types.string(),
    contents: types.string(),
    post_id: types.id(),
    post: {
      type: Post,
      resolve: presets.batch.belongsTo({ model: models.Post })
    }
  })
})

const Post = require('./post')
