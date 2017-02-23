const { Model } = require('koapi')

Model.initialize(require('../../config').database)

exports.User = require('./user').default
exports.Role = require('./role').default
exports.OAuth = require('./oauth').default
exports.Post = require('./post').default
exports.Comment = require('./comment').default
