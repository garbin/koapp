import restful from 'koapi/lib/test'
import { server } from '../../__lib__/init'

describe('Comments', () => restful(server, '/posts/1/comments').setup({
   title: 'Post Title', contents: 'Post Contents'
}).crud({
  patch: {title: 'new Title'}
}))
