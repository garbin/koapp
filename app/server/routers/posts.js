const { router } = require('koapi')
const { Post } = require('../../models')
const {default: comments} = require('./comments')

exports.default = router.define('resource', Post.collection()).children(comments)
