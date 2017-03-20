const { middlewares } = require('koapi')
const { default: passport } = require('./passport')

exports.before = [
  middlewares.jsonError(),
  passport.initialize()
]

exports.after = []
