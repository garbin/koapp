const { model } = require('koapi')
const Joi = require('joi')
const { default: User } = require('./index')

exports.default = model.define('Role', class extends model.base() {
  get tableName () {
    return 'roles'
  }
  get hasTimestamps () {
    return false
  }
  users () {
    return this.belongsToMany(User, 'user2role')
  }

  static get fields () {
    return {
      name: Joi.string().required(),
      desc: Joi.string(),
      permissions: Joi.alternatives().try(
        Joi.object().required(),
        Joi.boolean().required()
      )
    }
  };
})
