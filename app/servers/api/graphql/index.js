const { graphql: { types, Loader }, logger } = require('koapi')
const query = require('./query')
const mutation = require('./mutation')

module.exports = ctx => ({
  schema: new types.Schema({
    query: new types.Object({
      name: 'Query',
      fields: query
    }),
    mutation: new types.Object({
      name: 'Mutation',
      fields: mutation
    })
  }),
  context: { loader: new Loader() },
  formatError: logger.error
})
