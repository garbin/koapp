const { router } = require('koapi')
const { omit } = require('lodash')
const {default: user} = require('../../middlewares/user')
const { OAuth } = require('../../../../models')

exports.default = router.define('resource', {
  collection: OAuth.Client.collection(),
  name: 'clients',
  fields: omit(OAuth.Client.fields, ['client_secret', 'user_id']),
  setup (router) {
    router.use(user.grant('admin.oauth')).crud()
  }
})
