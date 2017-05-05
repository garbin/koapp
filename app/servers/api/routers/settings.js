const { router } = require('koapi')
const { Setting } = require('../../../models')
const { default: user } = require('../middlewares/user')

exports.default = router.define('resource', {
  model: Setting,
  setup (router) {
    router.use(user.grant('admin.settings'))
    router.read()
    router.update()
  }
})
