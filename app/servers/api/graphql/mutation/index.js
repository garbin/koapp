const { graphql: { types } } = require('koapi')
const { HttpQueryError } = require('graphql-server-core')
module.exports = {
  test: types.bool({
    args: { id: types.int() },
    resolve: (root, args, {user}, info) => {
      if (!user) {
        throw new HttpQueryError(401, 'Forbidden')
      }
      return true
    }
  })
}
