const { model } = require('koapi')
const Joi = require('joi')
const _ = require('lodash')

module.exports = class Setting extends model.Base {
  get tableName () { return 'settings' }
  get hasTimestamps () { return false }
  get template () {
    return {
      subject: _.template(this.get('settings').subject),
      content: _.template(this.get('settings').content),
      defaults: this.get('settings').defaults
    }
  }
  static get validator () {
    return {
      name: Joi.string().required(),
      desc: Joi.string().required(),
      settings: Joi.object().required()
    }
  }
}
