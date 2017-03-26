const { model } = require('koapi')
const { loadConfig } = require('../lib/helper')
const { connection, bookshelf } = model.connect(loadConfig().database)

exports.connection = connection
exports.bookshelf = bookshelf
exports.User = require('./user').default
exports.OAuth = require('./oauth').default
exports.Post = require('./post').default
exports.Comment = require('./comment').default
exports.File = require('./file').default
exports.Setting = require('./setting').default
