import extend from 'koapi/lib/model';
import Joi from 'joi';

export default extend({
  tableName: 'oauth_clients',
  idAttribute: 'client_id',
  hasTimestamps: true,
  uuid:true,
}, {
  fields:{
    client_id: Joi.string().required(),
    client_secret: Joi.string().required().label('Client Secret').description('Client Secret'),
    redirect_uri: Joi.string().required().description('Redirect URI'),
    user_id: Joi.string().required(),
    grant_types: Joi.string().default('password'),
    scope: Joi.string().default('all'),
  }
});
