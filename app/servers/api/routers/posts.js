const { router } = require('koapi')
const { Post } = require('../../../models')
const comments = require('./comments')

module.exports = router.resource(Post).children(comments)
