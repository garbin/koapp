const { server, middlewares } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global
const md5 = require('blueimp-md5')
const random = require('randomatic')

describe('Users', () => {
  const users = restful(server, '/users')
  users.use(middlewares.admin)
  users.setup(async ({create}) => {
    return await create([{
      username: random('Aa0', 10),
      password: md5('test'),
      roles: [1],
      email: random('Aa0', 10) + '@gmail.com'
    }], { use: middlewares.admin })
  })
  users.crud({ patch: {avatar: 'avatar'} })
})
