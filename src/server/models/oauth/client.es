import { bookshelf } from 'koapi/lib/model';
import Joi from 'joi';

export default class Client extends bookshelf.Model {
  static fields = {
    client_id: Joi.string().required(),
    client_secret: Joi.string().required().label('Client Secret').description('Client Secret'),
    redirect_uri: Joi.string().required().description('Redirect URI'),
    user_id: Joi.string().required(),
    grant_types: Joi.string().default('password'),
    scope: Joi.string().default('all'),
  }
  get tableName() {
    return 'oauth_clients';
  }
  get idAttribute() {
    return 'client_id';
  }
  get hasTimestamps(){
    return true;
  }
  get uuid(){
    return true;
  }
}
