import suite from 'koapi/lib/test';
import { server } from '../../__lib__/init';


suite(({ ResourceTester }) => {
  let tester = new ResourceTester(server, '/posts/1/comments');
  tester.create({ title: 'Post Title', contents: 'Post Contents' }).test();
  tester.read().test();
  tester.read(1).test();
  tester.update(1, { title: 'new title' }).test();
  tester.destroy(2).test();
});
