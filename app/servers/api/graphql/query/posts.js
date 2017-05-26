const { graphql: { types } } = require('koapi')
const models = require('../../../../models')
const { Post } = require('../types')

module.exports = types.list(Post)({
  resolve: root => models.Post.findAll()
})
