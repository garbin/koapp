const {default: restful} = require('koapi/lib/test')
const { server } = require('../../__lib__/init')
const path = require('path')
const fs = require('fs')

const token = req => req.set('Authorization', 'Bearer 691ae08f7b038e5b09983d2435d3a878')

describe('Files', () => {
  const files = restful(server, '/files').use(token)
  files.setup(null, req => req.attach('file', fs.readFileSync(path.join(__dirname, '/../../__lib__/d8ded4bd9f7c7d41551ff73c7b297aee.jpg')), 'haha.jpg'))
  files.crud({patch:{title: 'hehe'}})
})
