import { bookshelf } from 'koapi/lib/model'
import Joi from 'joi'
import md5 from 'blueimp-md5'

export default class Client extends bookshelf.Model {
  static fields = {
    client_secret: Joi.string().default(ctx => md5(Date.now()), 'Secret'),
    redirect_uri: Joi.string().required().description('Redirect URI'),
    user_id: Joi.string().required(),
    grant_types: Joi.string().default('password'),
    scope: Joi.string().default('all')
  }
  get tableName () {
    return 'oauth_clients'
  }
  get hasTimestamps () {
    return true
  }
  get uuid () {
    return true
  }
}
