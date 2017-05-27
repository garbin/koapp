const { graphql: { types, model } } = require('koapi')
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

module.exports = new types.Object(model({
  name: 'Post',
  fields: model => ({
    id: model.attr({ type: new types.NonNull(types.Int) }),
    title: model.attr({ type: types.String }),
    contents: model.attr({ type: types.String }),
    comments: {
      type: new types.List(Comment),
      async resolve (post, args, { loader }) {
        const comments = await loader.acquire('Post', batchGetPostComments).load(post)
        return comments
      }
    }
  })
}))

const Comment = require('./comment')
