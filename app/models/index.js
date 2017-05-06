const { model, config } = require('koapi')
const { connection, bookshelf } = model.connect(config.get('database'))
const User = require('./user')
const OAuth = require('./oauth')
const Post = require('./post')
const Comment = require('./comment')
const File = require('./file')
const Setting = require('./setting')

module.exports = {
  connection, bookshelf, User, OAuth, Post, Comment, File: File.File, Setting
}
