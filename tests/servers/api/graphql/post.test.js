const { server, teardown, tokens } = require('../../../__lib__/init')
const { graphql } = require('koapi/lib/test')
const { afterAll, test, expect, describe } = global

afterAll(teardown)

describe('Post', () => {
  const request = {
    server,
    headers: {
      Authorization: `Bearer ${tokens.admin}`
    }
  }
  test('Query', async () => {
    await graphql.test(request, `
      query Query {
        posts: search(type: POST) {
          edges {
            node {
              ... on Post {
                title
              }
            }
          }
        }
      }
    `, graphql.assert.ok(({data}, res) => {
      expect(data.posts.edges).toBeInstanceOf(Array)
      expect(data.posts.edges[0].node.title).not.toBe(null)
    }))
  })
  test('Mutation', async () => {
    await graphql.presets.mutation(request, {
      type: 'Post',
      create: {
        variables: {
          input: {
            title: 'title',
            contents: 'content'
          }
        }
      },
      update: {
        variables: {
          input: {
            contents: 'edited'
          }
        }
      }
    })
  })
})
