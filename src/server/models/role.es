import { bookshelf } from 'koapi/lib/model'
import Joi from 'joi'
import User from './user'

export default class Role extends bookshelf.Model {
  get tableName () {
    return 'roles'
  }
  get hasTimestamps () {
    return false
  }
  users () {
    return this.belongsToMany(User, 'user2role')
  }

  static fields = {
    name: Joi.string().required(),
    permissions: Joi.alternatives().try(
      Joi.object().required(),
      Joi.boolean().required()
    )
  };
}
