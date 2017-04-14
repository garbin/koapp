const { server } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global

describe('Comments', () => {
  const comments = restful(server, '/posts/1/comments')
  comments.setup(null, { title: 'Post Title', contents: 'Post Contents' })
  comments.crud({
    patch: {title: 'new Title'}
  })
})
