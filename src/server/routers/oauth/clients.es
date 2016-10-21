import {ResourceRouter} from 'koapi'
import user from '../../middlewares/user'
import Client from '../../models/oauth/client'
import {omit} from 'lodash'

export default ResourceRouter.define({
  collection: Client.collection(),
  root: '/oauth/clients',
  name: 'clients',
  fields: omit(Client.fields, ['client_secret', 'user_id']),
  id: 'client_id',
  setup(router){
    router.use(user.grant('admin.oauth'));


    /**
     * @api {post} /oauth/clients Create Clients
     * @apiName post-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/create/request.schema.json} apiParam
     * @apiSchema {jsonschema=../../../schemas/clients/create/response.schema.json} apiSuccess
     */

    /**
     * @api {get} /oauth/clients List Clients
     * @apiName list-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/read/response.schema.json} apiSuccess
     */

    /**
     * @api {get} /oauth/clients/:id Read Clients
     * @apiName read-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/read/response.schema.json} apiSuccess
     */

    /**
     * @api {put} /oauth/clients/:id Update Clients
     * @apiName update-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/update/request.schema.json} apiParam
     * @apiSchema {jsonschema=../../../schemas/clients/update/response.schema.json} apiSuccess
     */


    /**
     * @api {delete} /oauth/clients/:id Delete Clients
     * @apiName delete-client
     * @apiGroup Client
     */
    router.crud();
  }
});
