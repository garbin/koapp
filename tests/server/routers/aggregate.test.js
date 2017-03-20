const { server, tokens } = require('../../__lib__/init')
const { request } = require('koapi/lib/test')
const { afterAll, test, expect } = global

afterAll(e => server.close())

test('GET /aggregate/users', () =>
  request(server).get('/aggregate/users')
                 .set('Authorization', `Bearer ${tokens.admin}`)
                 .then(res => {
                   expect(res.status).toBe(200)
                   expect(res.body).toBeInstanceOf(Array)
                 })
)
