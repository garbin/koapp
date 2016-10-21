import {server} from '../init'
import {test, expect, request} from 'koapi/lib/test'


test('POST /oauth/token', t =>
  request(server).post('/oauth/token')
                 .set('Accept', 'application/json')
                 .send({
                   "client_id":"123",
                   "client_secret":"123",
                   "grant_type":"password",
                   "username":"test",
                   "password":"123",
                   "scope":"all"
                 })
                 .then(res => {
                   expect(res).to.have.status(200);
                   expect(res.body.access_token).to.not.be.empty;
                 })
);
