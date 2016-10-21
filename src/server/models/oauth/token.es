import extend from 'koapi/lib/model';
import Joi from 'joi';
import moment from 'moment'
import md5 from 'blueimp-md5'
import uuid from 'node-uuid'
import User from '../user'

export default extend({
  tableName: 'oauth_tokens',
  hasTimestamps: true,
  user(){
    return this.belongsTo(User);
  }
}, {
  fields:{
    access_token: Joi.string().required(),
    refresh_token: Joi.string().required(),
    client_id: Joi.string().required(),
    user_id: Joi.string().required(),
    scope: Joi.string(),
    access_token_expires_at: Joi.date(),
    refresh_token_expires_at: Joi.date(),
  },
  async issue(client_id, user_id){
    let token = new this();
    token = await token.save({
      client_id,
      user_id,
      scope: 'all',
      access_token: md5(uuid.v1()),
      access_token_expires_at: moment().add(1, 'days').toDate(),
      refresh_token: md5(uuid.v1()),
      refresh_token_expires_at: moment().add(30, 'days').toDate()
    });

    return token;
  }
});
