const { ResourceRouter } = require('koapi')
const { Post } = require('../../models')
const {default: comments} = require('./comments')

exports.default = ResourceRouter.define(Post.collection()).children(comments)
