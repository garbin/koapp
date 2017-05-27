const { graphql: { types, model } } = require('koapi')
const models = require('../../../../models')

function batchGetPost (postIds) {
  return models.Post.forge().query(q => q.whereIn('id', postIds))
    .fetchAll().then(posts => postIds.map(id => posts.find({id})))
}

module.exports = new types.Object(model({
  name: 'Comment',
  fields: model => ({
    id: model.attr(types.nonNull(types.Int)()),
    title: model.attr(types.string()),
    contents: model.attr(types.string()),
    post: {
      type: Post,
      resolve: async (comment, args, { loader }) => {
        const post = comment.post || await loader.acquire('Comment', batchGetPost).load(comment.get('post_id'))
        return post
      }
    }
  })
}))

const Post = require('./post')
