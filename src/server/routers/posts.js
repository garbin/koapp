const { ResourceRouter } = require('koapi')
const {default: Post} = require('../models/post')
const {default: comments} = require('./comments')

exports.default = ResourceRouter.define(Post.collection()).children(comments)
