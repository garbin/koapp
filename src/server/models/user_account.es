import { bookshelf } from 'koapi/lib/model';
import Joi from 'joi';
import User from './user';
import moment from 'moment';

export default class Account extends bookshelf.Model {
  get tableName() {
    return 'user_accounts';
  }
  get hasTimestamps() {
    return true;
  }
  user() {
    return this.belongsTo(User);
  }


  static fields = {
    user_id: Joi.number().integer().required(),
    provider: Joi.string().required(),
    account_id: Joi.any().required(),
    access_token: Joi.string(),
    refresh_token: Joi.string(),
    profile: Joi.object(),
    expires_at: Joi.date(),
  };
  static async signin(provider, response) {
    let { account_id, username, email, profile, access_token, refresh_token } = response;
    let account = await this.forge().where({ account_id }).fetch({ withRelated: ['user'] });
    let user;
    if (!account) {
      user = new User();
      await bookshelf.transaction(t => user.save({
        username,
        email,
        password: 'default',
      }, {
        transacting: t,
      }).tap(model => model.accounts().create({
        account_id,
        access_token,
        refresh_token,
        provider,
        expires_at: moment().add(2, 'hours').toDate(),
        profile,
      }, { transacting: t })).then(t.commit).catch(t.rollback)
    );
    } else {
      await account.save({
        access_token,
        refresh_token,
        expires_at: moment().add(2, 'hours').toDate(),
        profile,
      }, { patch: true });
      user = account.related('user');
    }

    return user;
  }
}
