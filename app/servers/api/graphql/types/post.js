const { graphql: { types, presets } } = require('koapi')
const models = require('../../../../models')

module.exports = new types.Object({
  name: 'Post',
  fields: _ => presets.model({
    id: { type: new types.NonNull(types.Int) },
    title: types.string(),
    contents: types.string(),
    comments: types.list(Comment, {
      resolve: presets.batch.hasMany({ model: models.Comment })
    })
  })
})

const Comment = require('./comment')
