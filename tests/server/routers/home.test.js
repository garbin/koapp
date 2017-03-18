const { request } = require('koapi/lib/test')
const { server, tokens } = require('../../__lib__/init')

test('GET /home/profile', () => {
  return request(server)
    .get('/home/profile')
    .set('Authorization', `Bearer ${tokens.admin}`)
    .then(res => { expect(res.status).toBe(200) })
})

test('PATCH /home/profile', () => {
  return request(server)
    .patch('/home/profile')
    .set('Authorization', `Bearer ${tokens.admin}`)
    .send({old_password: 'admin', password: '987', avatar: 'http://google.com'})
    .then(res => {
      expect(res.status).toBe(202)
      expect(res.body.avatar).toBe('http://google.com')
    })
})
