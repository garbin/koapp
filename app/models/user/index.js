const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')
const md5 = require('blueimp-md5')
const {default: Role} = require('../role')
const {default: Post} = require('../post')

exports.default = class User extends bookshelf.Model {
  get tableName () { return 'users' }
  get hasTimestamps () { return true }
  roles () {
    return this.belongsToMany(Role, 'user2role')
  }
  accounts () {
    return this.hasMany(Account)
  }
  posts () {
    return this.hasMany(Post)
  }
  static get format () {
    return {
      password: md5
    }
  }
  static get dependents () {
    return ['accounts']
  }
  static get Account () { return Account }

  static get fields () {
    return {
      username: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string().allow(''),
      email: Joi.string().email().required()
    }
  }

  static async auth (ident, password) {
    let user = await this.query(q => q.where({ username: ident }).orWhere({ email: ident })).fetch({ require: true })
    if (user && user.get('password') === md5(password)) {
      return user
    }
    throw new Error('auth failed')
  }
}

const {default: Account} = require('./account')
