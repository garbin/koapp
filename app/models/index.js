const { model } = require('koapi')

const { connection, bookshelf } = model.connect(require('../../config').database)

exports.connection = connection
exports.bookshelf = bookshelf
exports.User = require('./user').default
exports.Role = require('./role').default
exports.OAuth = require('./oauth').default
exports.Post = require('./post').default
exports.Comment = require('./comment').default
exports.File = require('./file').default
exports.Setting = require('./setting').default
