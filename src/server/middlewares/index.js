// for non-oauth-server
// issue access_token by central authorization server
// const {default: passport} = require('./passport/oauth2')

// for built-in oauth server & social login
// issue access_token by self
const { middlewares } = require('koapi')
const { default: passport } = require('./passport')

exports.before = [
  middlewares.json_error(),
  passport.initialize()
]

exports.after = []
