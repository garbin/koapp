import extend from 'koapi/lib/model';
import Joi from 'joi'


export default extend({
  tableName: 'comments',
  hasTimestamps: true,
}, {
  fields:{
    title: Joi.string().min(3).max(30).required(),
    contents: Joi.string(),
    user_id: Joi.number().integer(),
    post_id: Joi.number().integer(),
  }
});
