const { router } = require('koapi')
const { User } = require('../../../models')
const { default: user } = require('../middlewares/user')

exports.default = router.define('resource', {
  collection: User.Role.collection(),
  setup (router) {
    router.use(user.grant('admin.roles'))
    router.crud()
  }
})
