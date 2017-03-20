const { server, middlewares } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global
const random = require('randomatic')

describe('Roles', () => {
  const roles = restful(server, '/roles')
  roles.setup(e => ({ name: random('Aa0', 10), permissions: true }))
  roles.use(middlewares.admin)
  roles.crud({ patch: {desc: 'desc'} })
})
