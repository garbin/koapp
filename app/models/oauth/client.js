const { model } = require('koapi')
const Joi = require('joi')
const md5 = require('blueimp-md5')

exports.default = class Client extends model.Base {
  static get fields () {
    return {
      client_secret: Joi.string().default(ctx => md5(Date.now()), 'Secret'),
      redirect_uri: Joi.string().required().description('Redirect URI'),
      user_id: Joi.string().required(),
      grant_types: Joi.string().default('password'),
      scope: Joi.string().default('all')
    }
  }
  get tableName () { return 'oauth_clients' }
  get hasTimestamps () { return true }
  get uuid () { return true }
}
