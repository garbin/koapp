import { bookshelf } from 'koapi/lib/model'
import Joi from 'joi'
import moment from 'moment'
import md5 from 'blueimp-md5'
import uuid from 'node-uuid'
import User from '../user'

export default class Token extends bookshelf.Model {
  get tableName () {
    return 'oauth_tokens'
  }
  get hasTimestamps () {
    return true
  }

  user () {
    return this.belongsTo(User)
  }

  static fields = {
    access_token: Joi.string().required(),
    refresh_token: Joi.string().required(),
    client_id: Joi.string().required(),
    user_id: Joi.string().required(),
    scope: Joi.string(),
    access_token_expires_at: Joi.date(),
    refresh_token_expires_at: Joi.date()
  };
  static async issue (clientId, userId, options) {
    let token = new this()
    token = await token.save(Object.assign({
      client_id: clientId,
      user_id: userId,
      access_token: md5(uuid.v1()),
      access_token_expires_at: moment().add(1, 'days').toDate(),
      refresh_token: md5(uuid.v1()),
      refresh_token_expires_at: moment().add(30, 'days').toDate()
    }, options))

    return token
  }
}
