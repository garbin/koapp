const { router } = require('koapi')
const {default: user} = require('../../middlewares/user')
const { OAuth } = require('../../../../models')

exports.default = router.define('resource', {
  model: OAuth.Client,
  name: 'clients',
  setup (router) {
    router.use(user.grant('admin.oauth')).crud()
  }
})
