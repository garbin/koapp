const { model } = require('koapi')
const Joi = require('joi')

module.exports = class Comment extends model.Base {
  get tableName () {
    return 'comments'
  }
  get hasTimestamps () {
    return true
  }

  static get validator () {
    return {
      title: Joi.string().min(3).max(30).required(),
      contents: Joi.string(),
      user_id: Joi.number().integer(),
      post_id: Joi.number().integer()
    }
  }
}
