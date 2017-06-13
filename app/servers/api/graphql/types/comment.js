const { graphql: { types } } = require('koapi')
const models = require('../../../../models')

function batchGetPost (postIds) {
  return models.Post.forge().query(q => q.whereIn('id', postIds))
    .fetchAll().then(posts => postIds.map(id => posts.find({id})))
}

module.exports = new types.Object({
  name: 'Comment',
  fields: _ => types.model({
    id: types.nonNull(types.Int)(),
    title: types.string(),
    contents: types.string(),
    post: {
      type: Post,
      resolve: async (comment, args, { loader }) => {
        const post = comment.post || await loader.acquire('Comment', batchGetPost).load(comment.get('post_id'))
        return post
      }
    }
  })
})

const Post = require('./post')
