const { ResourceRouter } = require('koapi')
const { User } = require('../../models')
const { default: user } = require('../middlewares/user')

exports.default = ResourceRouter.define({
  collection: User.collection(),
  setup (router) {
    router.use(user.grant('admin.users'))
    router.crud()
  }
})
