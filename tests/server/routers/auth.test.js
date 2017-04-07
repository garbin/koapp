const { server, tokens, middlewares } = require('../../__lib__/init')
const { restful, request } = require('koapi/lib/test')
const { describe, test, expect } = global

describe('Clients', () => {
  const clients = restful(server, '/auth/oauth/clients')
  // const token = req => { req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878'); console.log(req); return req }
  clients.setup({
    redirect_uri: 'abc',
    user_id: '111'
  }).use(middlewares.admin).crud({patch: {redirect_uri: 'def'}})
  test('GET /auth/connect/github', () =>
  // redirect to /auth/github/callback
  // redirect to /protected
    request(server).get('/auth/connect/github?state=eyJjbGllbnRfaWQiOiIxMjMifQ%3D%3D')
    .then(res => res).catch(res => {
      expect(res.status).toBe(422)
    }
  ))
  test('POST /auth/token', async () => {
    const res = await request(server).post('/auth/token')
    .set('Accept', 'application/json')
    .send({
      client_id: '0f434d4b-06bf-4cb2-b8f4-f20bf9349beb',
      client_secret: '530897d5880494a6a9ac92d1273d8ba5',
      grant_type: 'password',
      username: 'admin',
      password: 'admin',
      scope: 'all'
    })
    expect(res.status).toBe(200)
    expect(res.body.access_token).toBeDefined()
  })
  test('GET /auth/user/profile', () => {
    return request(server)
    .get('/auth/user/profile')
    .set('Authorization', `Bearer ${tokens.admin}`)
    .then(res => { expect(res.status).toBe(200) })
  })
  test('PATCH /auth/user/forget', () => {
    return request(server)
    .patch('/auth/user/forget')
    .send({email: 'garbinh@gmail.com'})
    .then(res => { expect(res.status).toBe(202) })
  })
  test('PATCH /auth/user/profile', () => {
    return request(server)
    .patch('/auth/user/profile')
    .set('Authorization', `Bearer ${tokens.admin}`)
    .send({old_password: 'admin', password: 'admin', avatar: 'http://google.com'})
    .then(res => {
      expect(res.status).toBe(202)
      expect(res.body.avatar).toBe('http://google.com')
    })
  })
})
