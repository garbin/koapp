const { server } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global

describe('Posts', () => {
  const posts = restful(server, '/posts')
  posts.setup(null, { title: 'Post Title', contents: 'Post Contents', user_id: 1 })
  posts.crud({ patch: {title: 'new Title'} })
})
