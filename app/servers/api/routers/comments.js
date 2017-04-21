const { router } = require('koapi')
const { Comment } = require('../../../models')

exports.default = router.define('resource', {
  collection: ctx => ctx.state.nested.post.comments(),
  model: Comment,
  setup (router) {
    router.crud()
  }
})
