const { router } = require('koapi')
const { default: user } = require('../middlewares/user')
const { connection, User } = require('../../../models')

exports.default = router.define('aggregate', router => {
  // /aggregate/users
  router.use(user.grant('admin.aggregate'))
  router.aggregate(User, {
    dimensions: [
      {name: 'created_date', column: connection.raw('created_at::date as created_date')}
    ],
    metrics: [
      {name: 'total', aggregate: 'count', column: 'id as total'}
    ]
  })
})
