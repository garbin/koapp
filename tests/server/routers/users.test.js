const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')
const md5 = require('blueimp-md5')

describe('Users', () => restful(server, '/users').setup({
  username: 'test1', password: md5('test'), email: 'test1@gmail.com'
}).use(req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')).crud({
  patch: {username: 'test2'}
}))
