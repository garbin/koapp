const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')
const {default: User} = require('./')
const moment = require('moment')
const random = require('randomatic')
const md5 = require('blueimp-md5')

exports.default = class Account extends bookshelf.Model {
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
    let { account_id, username, email, avatar, profile, access_token, refresh_token } = response
    let account = await this.forge().where({ account_id }).fetch({ withRelated: ['user'] })
    let user
    if (!account) {
      user = new User()
      await bookshelf.transaction(t => user.save({
        username,
        email,
        avatar,
        password: md5(random('Aa0!', 10))
      }, {
        transacting: t
      }).tap(model => model.accounts().create({
        account_id,
        access_token,
        refresh_token,
        provider,
        expires_at: moment().add(2, 'hours').toDate(),
        profile
      }, { transacting: t })).then(t.commit).catch(t.rollback)
    )
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
}
