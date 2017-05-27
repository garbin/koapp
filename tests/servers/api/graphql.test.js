const { server, teardown } = require('../../__lib__/init')
const { request } = require('koapi/lib/test')
const { afterAll, test, expect, describe } = global

afterAll(teardown)

describe('GraphQL', () => {
  test('posts', async () => {
    const response = await request(server).post('/graphql').send({query: `
        query Query {
          posts {
            id
            title
            contents
          }
        }
    `})
    expect(response.status).toBe(200)
    expect(response.body.data.posts).toBeInstanceOf(Array)
  })
  test('searchByType', async () => {
    const response = await request(server).post('/graphql').send({query: `
        query Query {
          search(first: 1, type: POST) {
            totalCount
            edges {
              node {
                ... on Post {
                  id
                  title
                  comments {
                    id
                    title
                  }
                }
              }
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
    `})
    expect(response.status).toBe(200)
    expect(response.body.data.search.edges).toBeInstanceOf(Array)
    expect(response.body.data.search.pageInfo.hasNextPage).toBe(true)
    expect(response.body.data.search.edges[0].cursor).not.toBe(null)
    expect(response.body.data.search.edges[0].node).not.toBe(null)
  })
  test('nested', async () => {
    const response = await request(server).post('/graphql').send({query: `
        query Query {
          posts {
            id
            title
            contents
            commentList: comments {
              id
              title
              contents
            }
          }
        }
    `})
    expect(response.status).toBe(200)
    expect(response.body.data.posts).toBeInstanceOf(Array)
    expect(response.body.data.posts[0].commentList).toBeInstanceOf(Array)
  })
  test('mutation test', async () => {
    const response = await request(server).post('/graphql').send({query: `
        mutation {
          test(id: 110)
        }
    `})
    expect(response.status).toBe(200)
    expect(response.body.data.test).toBe(true)
  })
})
