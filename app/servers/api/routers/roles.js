const { router } = require('koapi')
const { User } = require('../../../models')
const user = require('../middlewares/user')

module.exports = router.resource(User.Role, route => {
  route.use(user.grant('admin.roles')).crud()
})
