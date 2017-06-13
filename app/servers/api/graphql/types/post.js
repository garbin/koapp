const { graphql: { types } } = require('koapi')
const models = require('../../../../models')

function batchGetPostComments (posts) {
  return models.Comment.forge().query(q => q.whereIn('post_id', posts.map(post => post.id)))
    .fetchAll().then(comments => posts.map(post =>
      comments.filter(item => {
        if (item.get('post_id') === post.id) {
          item.post = post
          return true
        }
        return false
      })
    ))
}

module.exports = new types.Object({
  name: 'Post',
  fields: _ => types.model({
    id: { type: new types.NonNull(types.Int) },
    title: types.string(),
    contents: types.string(),
    comments: {
      type: new types.List(Comment),
      async resolve (post, args, { loader }) {
        const comments = await loader.acquire('Post', batchGetPostComments).load(post)
        return comments
      }
    }
  })
})

const Comment = require('./comment')
