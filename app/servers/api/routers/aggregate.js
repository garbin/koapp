const { router } = require('koapi')
const user = require('../middlewares/user')
const { connection, User } = require('../../../models')

module.exports = router.aggregate(route => {
  route.use(user.grant('admin.aggregate'))
  route.aggregate(User, {
    dimensions: [
      {name: 'created_date', column: connection.raw('created_at::date as created_date')}
    ],
    metrics: [
      {name: 'total', aggregate: 'count', column: 'id as total'}
    ]
  })
})
