import extend from 'koapi/lib/model';
import Joi from 'joi';
import User from './user'


export default extend({
  tableName: 'roles',
  hasTimestamps: false,
  users(){
    return this.belongsToMany(User, 'user2role');
  }
}, {
  fields:{
    name: Joi.string().required(),
    permissions: Joi.object().required(),
  }
});
