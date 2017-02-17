const { ResourceRouter } = require('koapi')
const {default: Comment} = require('../models/comment')

exports.default = ResourceRouter.define({
  collection: ctx => ctx.state.parents.post.comments(),
  model: Comment,
  setup (router) {
    router.crud()
  }
})
