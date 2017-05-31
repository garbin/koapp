const { graphql: { types } } = require('koapi')
const post = require('./post')
module.exports = Object.assign({
  test: types.bool({
    args: { id: types.int() },
    resolve: (root, args, {user}, info) => {
      return true
    }
  })
}, post)
