const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

describe('Posts', () => restful(server, '/posts').setup({
  title: 'Post Title', contents: 'Post Contents', user_id: 1
}).crud({
  patch: {title: 'new Title'}
}))
