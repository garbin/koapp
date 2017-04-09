const { model, config } = require('koapi')
const { connection, bookshelf } = model.connect(config.get('database'))
const { default: User } = require('./user')
const { default: OAuth } = require('./oauth')
const { default: Post } = require('./post')
const { default: Comment } = require('./comment')
const { default: File } = require('./file')
const { default: Setting } = require('./setting')

module.exports = {
  connection, bookshelf, User, OAuth, Post, Comment, File, Setting
}
