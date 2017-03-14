const { ResourceRouter } = require('koapi')
const { File } = require('../../models')
const { default: user } = require('../middlewares/user')
const _ = require('lodash')

exports.default = ResourceRouter.define({
  collection: File.collection(),
  setup (router) {
    router.use(user.required())
    router.create(async (ctx, next) => {
      const upload = ctx.request.files['file']
      if (upload) {
        ctx.state.attributes = Object.assign({
          file_name: upload.name,
          file_size: upload.size,
          file_type: upload.type,
          file_path: upload.path
        }, _.omit(ctx.request.body, 'files'))
        await next()
      }
    })
    router.read().update(async(ctx, next) => {
      ctx.state.attributes = _.pick(ctx.request.body, ['title', 'desc'])
      await next()
    }).destroy()
  }
})