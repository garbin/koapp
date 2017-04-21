const { router } = require('koapi')
const { Setting } = require('../../../models')
const { default: user } = require('../middlewares/user')

exports.default = router.define('resource', {
  collection: Setting.collection(),
  setup (router) {
    router.use(user.grant('admin.settings'))
    router.read()
    router.update()
  }
})
