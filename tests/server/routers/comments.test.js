const { server, teardown } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global

describe('Comments', () => restful(server, '/posts/1/comments').teardown(teardown).setup({
  title: 'Post Title', contents: 'Post Contents'
}).crud({
  patch: {title: 'new Title'}
}))
