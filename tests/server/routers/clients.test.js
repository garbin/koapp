import suite from 'koapi/lib/test';
import { server } from '../../__lib__/init';

suite(({ ResourceTester, request, expect, test }) => {
  let tester = new ResourceTester(server, '/oauth/clients');
  let token = req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878');

  // POST
  tester.create({
    redirect_uri: 'abc',
    user_id: '111',
  }, token).test();


  // GET
  tester.read().catch(e => expect(e).to.have.status(401)).test();
  tester.read(token).test();
  tester.read('0f434d4b-06bf-4cb2-b8f4-f20bf9349beb', token).test();
});
