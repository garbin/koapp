const { router } = require('koapi')
const { User } = require('../../../models')
const user = require('../middlewares/user')

module.exports = class extends router.Resource {
  get model () { return User.Role }
  setup () {
    this.use(user.grant('admin.roles')).crud()
  }
}
