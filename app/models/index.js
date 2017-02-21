const { Model } = require('koapi')

if (!Model.bookshelf) {
  const config = require('../../config')
  Model.initialize(config.database)
}

exports.User = require('./user').default
exports.Account = require('./user/account').default
exports.Role = require('./role').default
exports.Client = require('./oauth/client').default
exports.Token = require('./oauth/token').default
exports.Post = require('./post').default
exports.Comment = require('./comment').default
