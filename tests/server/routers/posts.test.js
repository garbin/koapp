import restful from 'koapi/lib/test'
import { server } from '../../__lib__/init'

describe('Posts', () => restful(server, '/posts').setup({
  title: 'Post Title', contents: 'Post Contents', user_id: 1
}).crud({
  patch: {title: 'new Title'}
}))
