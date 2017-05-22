const { server, middlewares } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global
const random = require('randomatic')

describe('Roles', () => {
  const roles = restful(server, '/roles')
  roles.use(middlewares.admin)
  roles.setup(async ({create}) => await create({
    name: random('Aa0', 10), permissions: true
  }))
  roles.crud({ patch: {desc: 'desc'} })
})
