const { router } = require('koapi')
const user = require('../../middlewares/user')
const { OAuth } = require('../../../../models')

module.exports = router.resource(OAuth.Client, {
  nameSpace: 'clients',
  setup: route => route.use(user.grant('admin.oauth')).crud()
})
