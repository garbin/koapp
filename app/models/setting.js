const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')
const _ = require('lodash')

exports.default = class Setting extends bookshelf.Model {
  get tableName () { return 'settings' }
  get hasTimestamps () { return false }
  get template () {
    return {
      subject: _.template(this.get('settings').subject),
      content: _.template(this.get('settings').content),
      defaults: this.get('settings').defaults
    }
  }
  static get fields () {
    return {
      name: Joi.string().required(),
      desc: Joi.string().required(),
      settings: Joi.object().required()
    }
  }
}
