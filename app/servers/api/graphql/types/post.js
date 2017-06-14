const { graphql: { types, helper } } = require('koapi')
const models = require('../../../../models')

module.exports = new types.Object({
  name: 'Post',
  fields: _ => types.model({
    id: { type: new types.NonNull(types.Int) },
    title: types.string(),
    contents: types.string(),
    comments: types.list(Comment)({
      resolve: helper.batchLoad({ model: models.Comment })
    })
  })
})

const Comment = require('./comment')
