const { model } = require('koapi')
const Joi = require('joi')
const { default: Comment } = require('./comment')

exports.default = model.define('Post', class extends model.base() {
  get tableName () {
    return 'posts'
  }
  get hasTimestamps () {
    return true
  }
  comments () {
    return this.hasMany(Comment)
  }

  static get fields () {
    return {
      title: Joi.string().min(3).max(30).required(),
      contents: Joi.string(),
      user_id: Joi.number().integer()
    }
  };
})
