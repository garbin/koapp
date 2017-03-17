const {default: restful} = require('koapi/lib/test')
const { server, adminToken } = require('../../__lib__/init')
const path = require('path')
const fs = require('fs')


describe('Files', () => {
  const files = restful(server, '/files').use(adminToken)
  files.setup(null, req => req.attach('file', fs.readFileSync(path.join(__dirname, '/../../__lib__/iphone.jpg')), 'iphone.jpg'))
  files.crud({patch:{title: 'hehe'}})
})
