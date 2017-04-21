const { middlewares } = require('koapi')
const { default: passport } = require('./passport')

exports.before = middlewares.compose([
  passport.initialize()
])

exports.after = middlewares.compose([])
