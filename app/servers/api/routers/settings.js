const { router } = require('koapi')
const { Setting } = require('../../../models')
const user = require('../middlewares/user')

module.exports = class extends router.Resource {
  get model () { return Setting }
  setup () {
    this.use(user.grant('admin.settings')).read().update()
  }
}
