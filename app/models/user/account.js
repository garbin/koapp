const { model } = require('koapi')
const Joi = require('joi')
const moment = require('moment')
const random = require('randomatic')

module.exports = class Account extends model.Base {
  get tableName () {
    return 'user_accounts'
  }
  get hasTimestamps () {
    return true
  }
  user () {
    return this.belongsTo(User)
  }

  static get validator () {
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
    let { account_id: accountId, username, email, avatar, profile, access_token: accessToken, refresh_token: refreshToken } = response
    let account = await this.forge().where({ accountId }).fetch({ withRelated: ['user'] })
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
          accountId,
          accessToken,
          refreshToken,
          provider,
          expires_at: moment().add(2, 'hours').toDate(),
          profile
        }, { transacting: t })).then(t.commit).catch(t.rollback))
      } else {
        await user.accounts().create({
          accountId,
          accessToken,
          refreshToken,
          provider,
          expires_at: moment().add(2, 'hours').toDate(),
          profile
        })
      }
    } else {
      await account.save({
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: moment().add(2, 'hours').toDate(),
        profile
      }, { patch: true })
      user = account.related('user')
    }

    return user
  }
}
const User = require('./index')
