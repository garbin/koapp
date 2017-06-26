const { server, teardown, tokens } = require('../../../__lib__/init')
const { graphql } = require('koapi/lib/test')
const { afterAll, test, expect, describe } = global

afterAll(teardown)

describe('Setting', () => {
  const request = {
    server,
    headers: {
      Authorization: `Bearer ${tokens.admin}`
    }
  }
  test('Query', async () => {
    await graphql.test(request, `
      query Query {
        setting: fetch(id: "general", type: SETTING) {
          ... on Setting {
            id
          }
        }
      }
    `, graphql.assert.ok(({data}, res) => {
      expect(data.setting.id).toBe('general')
    }))
  })
  test('Mutation', async () => {
    await graphql.presets.update(request, {
      type: 'Setting',
      variables: {
        input: {
          settings: {site_title: 'Site Title'}
        },
        id: 'general'
      }
    })
  })
})
