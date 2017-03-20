const { server, middlewares, teardown } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global

describe('Clients', () => {
  const clients = restful(server, '/oauth/clients').teardown(teardown)
  // const token = req => { req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878'); console.log(req); return req }
  clients.setup({
    redirect_uri: 'abc',
    user_id: '111'
  }).use(middlewares.admin).create().read()
})
