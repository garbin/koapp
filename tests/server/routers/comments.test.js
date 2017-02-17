const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

describe('Comments', () => restful(server, '/posts/1/comments').setup({
   title: 'Post Title', contents: 'Post Contents'
}).crud({
  patch: {title: 'new Title'}
}))
