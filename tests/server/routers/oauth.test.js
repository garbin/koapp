import { request } from 'koapi/lib/test'
import { server } from '../../__lib__/init'

test('POST /oauth/token', () =>
  request(server).post('/oauth/token')
                 .set('Accept', 'application/json')
                 .send({
                   client_id: '0f434d4b-06bf-4cb2-b8f4-f20bf9349beb',
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
