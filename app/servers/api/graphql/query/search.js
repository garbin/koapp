const { graphql: { types, relay } } = require('koapi')
const models = require('../../../../models')
const { Post } = require('../types')

const SearchType = new types.Enum({
  name: 'SearchType',
  values: {
    POST: {
      value: ({first, after}) => models.Post.forge().fetchPage({limit: first, offset: after})
    }
  }
})

const SearchableItem = new types.Union({
  name: 'SearchableItem',
  types: [ Post ],
  resolveType: model => {
    if (model instanceof models.Post) {
      return Post
    }
  }
})

module.exports = {
  search: {
    type: relay.connection.create(SearchableItem),
    args: relay.connection.args({
      type: types.nonNull(SearchType)()
    }),
    resolve: relay.connection.resolve(async (root, {type, first, after}, ctx) => {
      const result = await type({first, after})
      return {
        totalCount: result.pagination.rowCount,
        edges: result.models.map((node, index) => ({node, cursor: after + index})),
        pageInfo: {
          startCursor: after,
          endCursor: after + first,
          hasNextPage: after < result.pagination.rowCount - first
        }
      }
    })
  }
}
