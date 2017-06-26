const { server, teardown, tokens } = require('../../../__lib__/init')
const { graphql } = require('koapi/lib/test')
const { afterAll, test, expect, describe } = global

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
        viewer {
          username
        }
      }
    `, graphql.assert.ok(({data}, res) => {
      expect(data.viewer.username).toBe('admin')
    }))
  })
})
