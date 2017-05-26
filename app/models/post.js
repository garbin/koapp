const { model } = require('koapi')
const Joi = require('joi')

module.exports = class Post extends model.Base {
  get tableName () {
    return 'posts'
  }
  get hasTimestamps () {
    return true
  }
  comments () {
    return this.hasMany(Comment)
  }

  static get validator () {
    return {
      title: Joi.string().min(3).max(30).required(),
      contents: Joi.string(),
      user_id: Joi.number().integer()
    }
  }
}

const Comment = require('./comment')
