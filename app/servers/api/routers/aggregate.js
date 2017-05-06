const { router } = require('koapi')
const user = require('../middlewares/user')
const { connection, User } = require('../../../models')

module.exports = class extends router.Aggregate {
  setup () {
    this.use(user.grant('admin.aggregate'))
    this.aggregate(User, {
      dimensions: [
        {name: 'created_date', column: connection.raw('created_at::date as created_date')}
      ],
      metrics: [
        {name: 'total', aggregate: 'count', column: 'id as total'}
      ]
    })
  }
}
