const { server, middlewares, teardown } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global
const random = require('randomatic')

describe('Roles', () => restful(server, '/roles').teardown(teardown).setup(() => ({
  name: random('Aa0', 10),
  permissions: true
})).use(middlewares.admin).crud({
  patch: {desc: 'desc'}
}))
