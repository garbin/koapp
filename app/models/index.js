const { Model } = require('koapi')

if (!Model.bookshelf) {
  const config = require('../../config')
  Model.initialize(config.database)
}

exports.User = require('./user').default
exports.Role = require('./role').default
exports.OAuth = require('./oauth').default
exports.Post = require('./post').default
exports.Comment = require('./comment').default
