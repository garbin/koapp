const { router } = require('koapi')
const { File } = require('../../../models')
const { default: user } = require('../middlewares/user')
const _ = require('lodash')

exports.default = router.define('resource', {
  model: File,
  setup (router) {
    router.use(user.required())
    router.create(async (ctx, next) => {
      const upload = ctx.request.body.files.file
      if (upload) {
        ctx.state.attributes = Object.assign({
          file_name: upload.name,
          file_size: upload.size,
          file_type: upload.type,
          file_path: upload.path
        }, _.omit(ctx.request.body, ['files', 'fields']))
        await next()
      }
    })
    router.read({ list: { sortable: ['created_at', 'updated_at'] } })
    router.update(user.grant('admin.files'), async(ctx, next) => {
      ctx.state.attributes = _.pick(ctx.request.body, ['title', 'desc'])
      await next()
    })
    router.destroy(user.grant('admin.files'))
  }
})
