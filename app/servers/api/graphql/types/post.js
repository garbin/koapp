const { graphql: { types, model } } = require('koapi')
const models = require('../../../../models')

function batchGetPostComments (ids) {
  return models.Comment.forge().query(q => q.whereIn('post_id', ids))
    .fetchAll().then(comments => ids.map(id =>
      comments.filter(item => item.get('post_id') === id)
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
        const comments = await loader.acquire('Post', batchGetPostComments).load(post.id)
        return comments
      }
    }
  })
}))

const Comment = require('./comment')
