const { graphql: { types, helper } } = require('koapi')
const models = require('../../../../models')

module.exports = new types.Object({
  name: 'Comment',
  fields: _ => types.model({
    id: types.nonNull(types.Int)(),
    title: types.string(),
    contents: types.string(),
    post: {
      type: Post,
      resolve: helper.batchLoad({ model: models.Post })
    }
  })
})

const Post = require('./post')
