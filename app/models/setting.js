const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')

exports.default = class Setting extends bookshelf.Model {
  get tableName () { return 'settings' }
  get hasTimestamps () { return false }
  static get fields () {
    return {
      name: Joi.string().required(),
      desc: Joi.string().required(),
      settings: Joi.object().required()
    }
  }
}
