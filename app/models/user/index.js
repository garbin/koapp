const { model, config } = require('koapi')
const Joi = require('joi')
const random = require('randomatic')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const security = config.get('security')

module.exports = class User extends model.Base {
  get tableName () {
    return 'users'
  }
  get hasTimestamps () {
    return true
  }
  get hidden () {
    return ['password', 'reset_token', 'reset_expires']
  }
  async resetToken () {
    const result = await this.save({
      reset_token: random('Aa0', 16),
      reset_expires: moment().add(2, 'hours').toDate()
    })
    return result
  }

  /* Relations */
  roles () {
    return this.belongsToMany(Role, 'user2role')
  }
  accounts () {
    return this.hasMany(Account)
  }
  posts () {
    return this.hasMany(Post)
  }
  static formatters ({ onlyChanged }) {
    return {
      password: onlyChanged(password =>
        bcrypt.hashSync(password, security.saltRounds)
      )
    }
  }
  static get Account () {
    return Account
  }
  static get Role () {
    return Role
  }
  static get dependents () {
    return ['accounts']
  }
  static get validator () {
    return {
      username: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string().allow(''),
      reset_token: Joi.string().allow(''),
      reset_expires: Joi.date(),
      email: Joi.string().email().required()
    }
  }

  static async auth (ident, password) {
    let user = await this.query(q =>
      q.where({ username: ident }).orWhere({ email: ident })
    ).fetch({ require: true })
    if (user && (await bcrypt.compare(password, user.get('password')))) { return user }
    throw new Error('auth failed')
  }
}

const Account = require('./account')
const Role = require('./role')
const Post = require('../post')
