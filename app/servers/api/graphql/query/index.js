const { graphql: { types } } = require('koapi')
const { Post } = require('../types')
const models = require('../../../../models')

module.exports = {
  posts: {
    type: new types.List(Post),
    resolve: root => models.Post.findAll()
  }
}
