const { server, teardown, tokens } = require('../../../__lib__/init')
const { graphql } = require('koapi/lib/test')
const { afterAll, test, expect, describe } = global
const random = require('randomatic')

afterAll(teardown)

describe('Role', () => {
  const request = {
    server,
    headers: {
      Authorization: `Bearer ${tokens.admin}`
    }
  }
  test('Query', async () => {
    await graphql.test(request, `
      query Query {
        users: search(type: ROLE) {
          edges {
            node {
              ... on Role {
                name
              }
            }
          }
        }
      }
    `, graphql.assert.ok(({data}, res) => {
      expect(data.users.edges).toBeInstanceOf(Array)
      expect(data.users.edges[0].node.name).not.toBe(null)
    }))
  })
  test('Mutation', async () => {
    await graphql.presets.cur(request, {
      type: 'Role',
      steps: {
        create: {
          variables: {
            input: {
              name: random('Aa0', 10),
              permissions: true
            }
          }
        },
        update: {
          variables: {
            input: {
              desc: 'desc'
            }
          }
        }
      }
    })
  })
})
