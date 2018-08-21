const { middlewares } = require('koapi')
const { passport } = require('./passport')

module.exports = {
  before: middlewares.compose([passport.initialize()]),
  after: middlewares.compose([])
}
