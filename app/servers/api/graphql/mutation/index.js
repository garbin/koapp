const { graphql: { types } } = require('koapi')
module.exports = {
  test: {
    type: types.Boolean,
    args: { id: types.int() },
    resolve: root => true
  }
}
