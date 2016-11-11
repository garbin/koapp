import { bookshelf } from 'koapi/lib/model';
import Joi from 'joi';
import Role from './role'
import Account from './user_account'
import md5 from 'blueimp-md5'

export default class User extends bookshelf.Model {
  get tableName() { return 'users' };
  get hasTimestamps() { return true };
  roles(){
    return this.belongsToMany(Role, 'user2role');
  }
  accounts(){
    return this.hasMany(Account);
  }

  static fields = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  };
  static async auth(ident, password){
    let user = await this.query(q => q.where({username:ident}).orWhere({email:ident}))
               .fetch({require:true});
    if (user && user.get('password') == md5(password)) {
      return user;
    }
    throw new Error('auth failed');
  }
}
