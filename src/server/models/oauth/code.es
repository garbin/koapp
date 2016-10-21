import extend from 'koapi/lib/model';
import Joi from 'joi';

export default extend({
  tableName: 'oauth_authorization_codes',
  idAttribute: 'code',
  hasTimestamps: true,
}, {
  fields: {
    code: Joi.string(),
    client_id: Joi.string(),
    user_id: Joi.string(),
    redirect_uri: Joi.string(),
    scope: Joi.string(),
    expires_at: Joi.date(),
  }
});
