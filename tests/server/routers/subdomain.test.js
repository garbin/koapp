const { server, teardown } = require('../../__lib__/init')
const { request } = require('koapi/lib/test')
const { afterAll, test, expect } = global

afterAll(teardown)

test('GET http://api.koapi.com/', () =>
  request(server)
  .get('/')
  .set('Host', 'api.koapi.com')
  .set('Accept', 'application/json')
  .then(res => {
    expect(res.status).toBe(200)
    expect(res.text).toBe('api')
  })
)
