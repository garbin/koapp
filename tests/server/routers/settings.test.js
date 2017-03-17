const { request } = require('koapi/lib/test')
const { server } = require('../../__lib__/init')

test('READ /settings/general', () =>
  request(server).get('/settings/general')
                 .set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')
                 .then(res => { expect(res.status).toBe(200) })
)
test('PATCH /settings/general', () =>
  request(server).patch('/settings/general')
                 .set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')
                 .send({ settings: {site_title: 'Site Title'} })
                 .then(res => { expect(res.status).toBe(202) })
)
