const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')
const random = require('randomatic')

describe('Roles', () => restful(server, '/roles').setup(() => ({
  name: random('Aa0', 10),
  permissions: true
})).use(req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')).crud({
  patch: {desc: 'desc'}
}))
