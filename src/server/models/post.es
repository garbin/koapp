import extend from 'koapi/lib/model';
import Comment from './comment';
import Joi from 'joi';

export default extend({
  tableName: 'posts',
  hasTimestamps: true,
  comments: function(){
    return this.hasMany(Comment);
  },
}, {
  fields:{
    title: Joi.string().min(3).max(30).required(),
    contents: Joi.string(),
    user_id: Joi.number().integer(),
  }
});
