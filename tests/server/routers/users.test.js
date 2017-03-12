const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')
const md5 = require('blueimp-md5')
const random = require('randomatic')

describe('Users', () => restful(server, '/users').setup(() => ({
  username: random('Aa0', 10), password: md5('test'), email: random('Aa0', 10) + '@gmail.com'
})).use(req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')).crud({
  patch: {avatar: 'avatar'}
}))
