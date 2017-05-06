const { router } = require('koapi')
const user = require('../../middlewares/user')
const { OAuth } = require('../../../../models')

module.exports = class extends router.Resource {
  get model () { return OAuth.Client }
  get nameSpace () { return 'clients' }
  setup () {
    this.use(user.grant('admin.oauth')).crud()
  }
}
