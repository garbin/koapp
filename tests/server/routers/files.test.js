const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')
const path = require('path')
const fs = require('fs')

const token = req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')

describe('Files', () => {
  const files = restful(server, '/files').use(token)
  files.setup(null, req => req.attach('file', fs.readFileSync(path.join(__dirname, '/../../__lib__/iphone.jpg')), 'iphone.jpg'))
  files.crud({patch:{title: 'hehe'}})
})
