const { router } = require('koapi')
const { Setting } = require('../../../models')
const user = require('../middlewares/user')

module.exports = router.resource(Setting, route => {
  route.use(user.grant('admin.settings')).read().update()
})
