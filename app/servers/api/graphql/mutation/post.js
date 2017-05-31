const { graphql: { helper } } = require('koapi')
const models = require('../../../../models')
const Post = require('../types/post')

module.exports = helper.mutation({
  model: models.Post,
  type: Post
})
