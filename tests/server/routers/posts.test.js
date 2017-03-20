const { server, teardown } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global

describe('Posts', () => restful(server, '/posts').teardown(teardown).setup({
  title: 'Post Title', contents: 'Post Contents', user_id: 1
}).crud({
  patch: {title: 'new Title'}
}))
