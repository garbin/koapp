const { graphql: { types } } = require('koapi')
module.exports = {
  test: types.bool({
    args: { id: types.int() },
    resolve: root => true
  })
}
