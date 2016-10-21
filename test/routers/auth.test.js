import {server} from '../init'
import {test, expect, request} from 'koapi/lib/test'


test('GET /auth/github', t =>
  // redirect to /auth/github/callback
  // redirect to /protected
  request(server).get('/auth/github?state=eyJjbGllbnRfaWQiOiIxMjMifQ%3D%3D')
                 .then(res => res).catch(res => {
                   expect(res).to.have.status(422);
                 })
);
