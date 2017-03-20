const { server, middlewares, teardown } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global
const path = require('path')
const fs = require('fs')

describe('Files', () => {
  const files = restful(server, '/files').teardown(teardown)
  files.use(middlewares.admin)
  files.setup(null, req => req.attach('file', fs.readFileSync(
    path.join(__dirname, '/../../__lib__/iphone.jpg')), 'iphone.jpg'
  ))
  files.crud({patch: {title: 'hehe'}})
})
