import {server} from '../init';
import suite from 'koapi/lib/test'

suite(({ResourceTester, expect}) => {
  let tester = new ResourceTester(server, '/posts');
  tester.create({
    title: 'Post Title', contents:'Post Contents', user_id:1
  }).test(res => {
    expect(res.body.id).equals(3);
  });
  tester.read().test();
  tester.read(1).test();
  tester.update(1, {title:'new title'}).test();
  tester.destroy(2).test();
});
