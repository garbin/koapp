import { bookshelf } from 'koapi/lib/model';
import Joi from 'joi';


export default class Comment extends bookshelf.Model {
  get tableName() {
    return 'comments';
  }
  get hasTimestamps() {
    return true;
  }

  static fields = {
    title: Joi.string().min(3).max(30).required(),
    contents: Joi.string(),
    user_id: Joi.number().integer(),
    post_id: Joi.number().integer(),
  };
}
