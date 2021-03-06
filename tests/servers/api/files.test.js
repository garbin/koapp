const { server, middlewares } = require('../../__lib__/init')
const { restful } = require('koapi/lib/test')
const { describe } = global
const path = require('path')
const fs = require('fs')

describe('Files', () => {
  const files = restful(server, '/files')
  files.use(middlewares.admin)
  files.setup(async ({ create }) => {
    return await create([null], {
      use (req) {
        req.attach(
          'file',
          fs.readFileSync(path.join(__dirname, '/../../__lib__/iphone.jpg')),
          'iphone.jpg'
        )
      }
    })
  })
  files.crud({ patch: { title: 'hehe' } })
})
