const { model } = require('koapi')
const Joi = require('joi')

exports.default = class Role extends model.base() {
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
}

const { default: User } = require('./index')
