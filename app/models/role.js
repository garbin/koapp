const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')
const {default: User} = require('./user')

exports.default = class Role extends bookshelf.Model {
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
      permissions: Joi.alternatives().try(
        Joi.object().required(),
        Joi.boolean().required()
      )
    }
  };
}
