const { graphql: { types } } = require('koapi')
const { Post } = require('../types')
const models = require('../../../../models')

module.exports = {
  posts: types.list(Post)({
    resolve: root => models.Post.findAll()
  })
}
