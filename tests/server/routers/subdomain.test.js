const { request } = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

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
