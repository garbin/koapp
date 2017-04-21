const { server, middlewares } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global
const md5 = require('blueimp-md5')
const random = require('randomatic')

describe('Users', () => {
  const users = restful(server, '/users')
  users.use(middlewares.admin)
  users.setup(null, e => ({
    username: random('Aa0', 10),
    password: md5('test'),
    email: random('Aa0', 10) + '@gmail.com'
  }))
  users.crud({ patch: {avatar: 'avatar'} })
})
