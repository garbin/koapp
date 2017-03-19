const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')
const {default: Role} = require('../role')
const {default: Post} = require('../post')
const random = require('randomatic')
const moment = require('moment')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.default = class User extends bookshelf.Model {
  get tableName () { return 'users' }
  get hasTimestamps () { return true }
  get hidden () {
    return ['password']
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
  static get format () {
    return {
      password: password => bcrypt.hashSync(password, saltRounds)
    }
  }
  static async resetToken (email) {
    const user = await this.where({email}).fetch()
    return await user.save({
      reset_token: random('Aa0', 16),
      reset_expires: moment().add('2 hours').toDate()
    })
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
      reset_token: Joi.string().allow(''),
      reset_expires: Joi.date(),
      email: Joi.string().email().required()
    }
  }

  static async auth (ident, password) {
    let user = await this.query(q =>
      q.where({ username: ident })
      .orWhere({ email: ident }))
      .fetch({ require: true })
    if (user && await bcrypt.compare(password, user.get('password'))) return user
    throw new Error('auth failed')
  }
}

const {default: Account} = require('./account')
