const { request } = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

test('GET /auth/github', () =>
  // redirect to /auth/github/callback
  // redirect to /protected
  request(server).get('/auth/github?state=eyJjbGllbnRfaWQiOiIxMjMifQ%3D%3D')
                 .then(res => res).catch(res => {
                   expect(res.status).toBe(422)
                 })
)
