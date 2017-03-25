const { router } = require('koapi')
const { omit } = require('lodash')
const {default: user} = require('../../middlewares/user')
const { OAuth } = require('../../../../models')

exports.default = router.define('resource', {
  collection: OAuth.Client.collection(),
  root: '/oauth/clients',
  name: 'clients',
  fields: omit(OAuth.Client.fields, ['client_secret', 'user_id']),
  setup (router) {
    router.use(user.grant('admin.oauth'))

    /**
     * @api {post} /oauth/clients Create Clients
     * @apiName post-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../../docs/schemas/client/fields.json} apiParam
     * @apiSchema {jsonschema=../../../../docs/schemas/client/fields.json} apiSuccess
     */

    /**
     * @api {delete} /oauth/clients/:id Delete Clients
     * @apiName delete-client
     * @apiGroup Client
     */
    router.crud()
  }
})
