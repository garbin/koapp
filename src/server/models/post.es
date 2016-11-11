import { bookshelf } from 'koapi/lib/model';
import Comment from './comment';
import Joi from 'joi';

export default class Post extends bookshelf.Model {
  get tableName(){
    return 'posts';
  }
  get hasTimestamps(){
    return true;
  }
  comments(){
    return this.hasMany(Comment);
  }

  static fields = {
    title: Joi.string().min(3).max(30).required(),
    contents: Joi.string(),
    user_id: Joi.number().integer(),
  };
}
