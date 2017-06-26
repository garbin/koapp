const { server, teardown, tokens } = require('../../../__lib__/init')
const { graphql } = require('koapi/lib/test')
const { afterAll, test, expect, describe } = global
const md5 = require('blueimp-md5')
const random = require('randomatic')

afterAll(teardown)

describe('User', () => {
  const request = {
    server,
    headers: {
      Authorization: `Bearer ${tokens.admin}`
    }
  }
  test('Query', async () => {
    await graphql.test(request, `
      query Query {
        users: search(type: POST) {
          edges {
            node {
              ... on User {
                username
              }
            }
          }
        }
      }
    `, graphql.assert.ok(({data}, res) => {
      expect(data.users.edges).toBeInstanceOf(Array)
      expect(data.users.edges[0].node.username).not.toBe(null)
    }))
  })
  test('Mutation', async () => {
    await graphql.presets.cur(request, {
      type: 'User',
      steps: {
        create: {
          variables: {
            input: {
              username: random('Aa0', 10),
              password: md5('test'),
              email: random('Aa0', 10) + '@gmail.com'
            }
          }
        },
        update: {
          variables: {
            input: {
              avatar: 'avatar'
            }
          }
        }
      }
    })
  })
})
