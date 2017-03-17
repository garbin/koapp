const { server, adminToken } = require('../../__lib__/init')
const {default: restful} = require('koapi/lib/test')

describe('Clients', () => {
  const clients = restful(server, '/oauth/clients')
  // const token = req => { req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878'); console.log(req); return req }
  clients.setup({
    redirect_uri: 'abc',
    user_id: '111'
  }).use(adminToken).create().read()
})
