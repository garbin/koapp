const { server, teardown, tokens } = require('../../../__lib__/init')
const { graphql } = require('koapi/lib/test')
const { afterAll, expect, test, describe } = global

afterAll(teardown)

describe('Post', () => {
  const request = {
    server,
    headers: {
      Authorization: `Bearer ${tokens.admin}`
    }
  }
  test('Query & Mutation', async () => {
    const post = await graphql.test(request, {
      query: `
        mutation Mutation($input: JSON!) {
          createPost(input: $input) {
            id
          }
        }
      `,
      variables: {
        input: {
          title: 'test post',
          contents: 'test contents'
        }
      }
    })
    await graphql.presets.create(request, {
      type: 'Comment',
      variables: {
        input: {
          title: 'comment Title',
          contents: 'comment Contents',
          post_id: `${post.body.data.createPost.id}`
        }
      }
    })
    await graphql.test(request, {
      query: `
        query Comments($id: ID!) {
          post: fetch(id: $id, type: POST) {
            ... on Post {
              id
              title
              comments {
                title
              }
            }
          }
        }
      `,
      variables: {
        id: post.body.data.createPost.id
      }
    }, graphql.assert.ok(({data, errors}, res) => {
      expect(data.post.comments).toBeInstanceOf(Array)
      expect(data.post.comments[0].title).not.toBe(null)
    }))
  })
})
