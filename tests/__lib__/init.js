const { logger } = require('koapi')
logger.emitErr = true
logger.on('error', console.error)
process.on('unhandledRejection', (reason, p) => { logger.error('unhandled rejection', reason, p) })
const { start } = require('../../app/servers/default')
const nock = require('nock')
const server = start(null, false)

nock('https://github.com').post('/login/oauth/access_token', {
  grant_type: 'authorization_code',
  client_id: 'f2ee0541fecc7c773d5d',
  client_secret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
  code: '5b7469b93ec67d18b57f',
  redirect_uri: 'http://ubuntu:5000/auth/github/callback'
}).reply(201, {
  access_token: 'c289867c51acefe7857a674dd414cd58cf6febd7',
  token_type: 'bearer'
})

nock('https://github.com').get('/login/oauth/authorize').query({
  response_type: 'code',
  redirect_uri: 'http://ubuntu:5000/auth/github/callback',
  state: 'eyJjbGllbnRfaWQiOiIxMjMifQ==',
  client_id: 'f2ee0541fecc7c773d5d'
}).reply(302, undefined, {
  Location: 'http://127.0.0.1:' + server.address().port + '/auth/github/callback?code=5b7469b93ec67d18b57f'
})

nock('https://api.github.com').get('/user').reply(200, {
  id: 111,
  login: 'garbin',
  name: 'Garbin Huang',
  email: 'garbinh@gmail.com'
})

const tokens = { admin: '691ae08f7b038e5b09983d2435d3a878' }

const middlewares = {
  admin: req => req.set('Authorization', `Bearer ${tokens.admin}`)
}
const teardown = async () => {
  await Promise.promisify(server.close).call(server)
}

module.exports = {
  server,
  tokens,
  teardown,
  middlewares
}
