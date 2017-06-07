const { router } = require('koapi')
const { Comment } = require('../../../models')

module.exports = router.resource(Comment, {
  collection: ctx => ctx.state.nested.post.comments()
})
