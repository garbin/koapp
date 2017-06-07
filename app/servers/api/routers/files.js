const { router } = require('koapi')
const { File } = require('../../../models')
const user = require('../middlewares/user')
const { pick, omit } = require('lodash')

module.exports = router.resource(File, route => {
  route.use(user.required())
  route.create(async (ctx, next) => {
    const upload = ctx.request.body.files.file
    if (upload) {
      ctx.state.attributes = Object.assign({
        file_name: upload.name,
        file_size: upload.size,
        file_type: upload.type,
        file_path: upload.path
      }, omit(ctx.request.body, ['files', 'fields']))
      await next()
    }
  })
  route.read({ list: { sortable: ['created_at', 'updated_at'] } })
  route.update(user.grant('admin.files'), async(ctx, next) => {
    ctx.state.attributes = pick(ctx.request.body, ['title', 'desc'])
    await next()
  })
  route.destroy(user.grant('admin.files'))
})
