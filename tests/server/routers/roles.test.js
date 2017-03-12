const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

describe('Roles', () => restful(server, '/roles').setup({
  name: 'test',
  permissions: true
}).use(req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')).crud({
  patch: {name: 'test1'}
}))
