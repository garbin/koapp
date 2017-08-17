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
        users: search(type: USER) {
          edges {
            node {
              ... on User {
                username
                roles {
                  name
                }
              }
            }
          }
        }
      }
    `, graphql.assert.ok(({data}, res) => {
      expect(data.users.edges).toBeInstanceOf(Array)
      expect(data.users.edges[0].node.username).not.toBe(undefined)
      expect(data.users.edges[0].node.roles[0].name).toBe('admin')
    }))
  })
  test('Mutation', async () => {
    await graphql.presets.mutation(request, {
      type: 'User',
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
    })
  })
})
