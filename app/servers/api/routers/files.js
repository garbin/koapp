const { router } = require('koapi')
const { File } = require('../../../models')
const user = require('../middlewares/user')
const { pick, omit } = require('lodash')

module.exports = class extends router.Resource {
  get model () { return File }
  setup () {
    this.use(user.required())
    this.create(async (ctx, next) => {
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
    this.read({ list: { sortable: ['created_at', 'updated_at'] } })
    this.update(user.grant('admin.files'), async(ctx, next) => {
      ctx.state.attributes = pick(ctx.request.body, ['title', 'desc'])
      await next()
    })
    this.destroy(user.grant('admin.files'))
  }
}
