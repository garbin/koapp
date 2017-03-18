const { request } = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

test('READ /stat/:resource', () =>
  request(server).get('/stat/users')
                 .set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')
                 .then(res => {
                   expect(res.status).toBe(200)
                   expect(res.body).toBeInstanceOf(Array)
                 })
)
