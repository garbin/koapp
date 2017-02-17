const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')
const moment = require('moment')
const md5 = require('blueimp-md5')
const uuid = require('node-uuid')
const {default: User} = require('../user')

exports.default =  class Token extends bookshelf.Model {
  get tableName () {
    return 'oauth_tokens'
  }
  get hasTimestamps () {
    return true
  }

  user () {
    return this.belongsTo(User)
  }

  static get fields () {
    return {
      access_token: Joi.string().required(),
      refresh_token: Joi.string().required(),
      client_id: Joi.string().required(),
      user_id: Joi.string().required(),
      scope: Joi.string(),
      access_token_expires_at: Joi.date(),
      refresh_token_expires_at: Joi.date()
    }
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
