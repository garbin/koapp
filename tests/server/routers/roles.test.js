const {default: restful} = require('koapi/lib/test')
const { server, adminToken } = require('../../__lib__/init')
const random = require('randomatic')

describe('Roles', () => restful(server, '/roles').setup(() => ({
  name: random('Aa0', 10),
  permissions: true
})).use(adminToken).crud({
  patch: {desc: 'desc'}
}))
