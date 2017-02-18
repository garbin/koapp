const { request } = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

test('POST /oauth/token', () =>
  request(server).post('/oauth/token')
                 .set('Accept', 'application/json')
                 .send({
                   client_id: '01B98M4375SQ2TQYNMHSNTKPDK',
                   client_secret: '530897d5880494a6a9ac92d1273d8ba5',
                   grant_type: 'password',
                   username: 'test',
                   password: 'test',
                   scope: 'all'
                 })
                 .then(res => {
                   expect(res.status).toBe(200)
                 })
)
