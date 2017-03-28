const { model } = require('koapi')
const Joi = require('joi')
const moment = require('moment')
const random = require('randomatic')
const { default: User } = require('./index')

exports.default = model.define('Account', class extends model.base() {
  get tableName () {
    return 'user_accounts'
  }
  get hasTimestamps () {
    return true
  }
  user () {
    return this.belongsTo(User)
  }

  static get fields () {
    return {
      user_id: Joi.number().integer().required(),
      provider: Joi.string().required(),
      account_id: Joi.any().required(),
      access_token: Joi.string(),
      refresh_token: Joi.string(),
      profile: Joi.object(),
      expires_at: Joi.date()
    }
  };
  static async signin (provider, response) {
    const bookshelf = model.getInternal('bookshelf')
    let { account_id, username, email, avatar, profile, access_token, refresh_token } = response
    let account = await this.forge().where({ account_id }).fetch({ withRelated: ['user'] })
    let user
    if (!account) {
      user = await User.where('email', '=', email).fetch()
      if (!user) {
        user = new User()
        await bookshelf.transaction(t => user.save({
          username,
          email,
          avatar,
          password: random('Aa0!', 10)
        }, {
          transacting: t
        }).tap(model => model.accounts().create({
          account_id,
          access_token,
          refresh_token,
          provider,
          expires_at: moment().add(2, 'hours').toDate(),
          profile
        }, { transacting: t })).then(t.commit).catch(t.rollback))
      } else {
        await user.accounts().create({
          account_id,
          access_token,
          refresh_token,
          provider,
          expires_at: moment().add(2, 'hours').toDate(),
          profile
        })
      }
    } else {
      await account.save({
        access_token,
        refresh_token,
        expires_at: moment().add(2, 'hours').toDate(),
        profile
      }, { patch: true })
      user = account.related('user')
    }

    return user
  }
})
