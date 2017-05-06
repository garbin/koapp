const { router } = require('koapi')
const { Post } = require('../../../models')
const Comments = require('./comments')

module.exports = class extends router.Resource {
  get model () { return Post }
  setup () {
    this.crud().children(Comments)
  }
}
