const { router } = require('koapi')
const { Comment } = require('../../../models')

module.exports = class extends router.Resource {
  get model () { return Comment }
  collection (ctx) { return ctx.state.nested.post.comments() }
}
