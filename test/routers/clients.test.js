import {server} from '../init'
import suite from 'koapi/lib/test'

suite(({ResourceTester, request, expect, test}) => {
  let tester = new ResourceTester(server, '/oauth/clients');
  let token = req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878');

  // POST
  tester.create({
    client_secret: 'aaa',
    redirect_uri: 'abc',
    grant_types: 'aaa',
    scope: 'aaa',
    user_id: '111',
  }, token).test();


  // GET
  tester.read().catch(e => expect(e).to.have.status(401)).test();
  tester.read(token).test();
  tester.read('123', token).test();
});
