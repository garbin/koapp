const { Router } = require('koapi')
const Raw = require('knex/lib/raw')
const { default: user } = require('../middlewares/user')
const { User } = require('../..//models')

const stats = {
  users: {
    collection: User.collection(),
    dimensions: {
      createDate: new Raw().set('created_at::date as created_date')
    },
    metrics: {
      total: ['sum', 'id as total']
    },
    defaults: {
      dimensions: ['createDate'],
      metrics: ['total'],
      by: 'created_date'
    }
  }
}

exports.default = Router.define(router => {
  router.use(user.grant('admin.stat'))
  router.get('/stat/:resource', async (ctx, next) => {
    const {collection, dimensions, metrics, defaults} = stats[ctx.params.resource]
    const query = collection.query()
    ;(ctx.request.query.dimensions || defaults.dimensions).forEach(dim => {
      query.column(dimensions[dim])
    })
    ;(ctx.request.query.metrics || defaults.metrics).forEach(metric => {
      query[metrics[metric][0]](metrics[metric][1])
    })
    query.groupBy(ctx.request.query.by || defaults.by)
    ctx.body = await query.select()
  })
})
