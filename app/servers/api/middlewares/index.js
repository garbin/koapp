const { middlewares } = require('koapi')
const { passport } = require('./passport')
const graphql = require('../graphql')
const user = require('./user')

module.exports = {
  before: middlewares.compose([
    passport.initialize(),
    middlewares.graphql('/graphql', user.optional(), graphql)
  ]),
  after: middlewares.compose([])
}
