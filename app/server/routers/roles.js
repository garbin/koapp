const { router: { ResourceRouter } } = require('koapi')
const { Role } = require('../../models')
const { default: user } = require('../middlewares/user')

exports.default = ResourceRouter.define({
  collection: Role.collection(),
  setup (router) {
    router.use(user.grant('admin.roles'))
    router.crud()
  }
})
