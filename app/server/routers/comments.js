const { router: { ResourceRouter } } = require('koapi')
const { Comment } = require('../../models')

exports.default = ResourceRouter.define({
  collection: ctx => ctx.state.parents.post.comments(),
  model: Comment,
  setup (router) {
    router.crud()
  }
})
