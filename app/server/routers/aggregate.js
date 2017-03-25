const { router } = require('koapi')
const Raw = require('knex/lib/raw')
const { default: user } = require('../middlewares/user')
const { User } = require('../..//models')

exports.default = router.define('aggregate', router => {
  // /aggregate/users
  router.use(user.grant('admin.aggregate'))
  router.aggregate(User.collection(), {
    dimensions: [
      {name: 'created_date', column: new Raw().set('created_at::date as created_date')}
    ],
    metrics: [
      {name: 'total', aggregate: 'count', column: 'id as total'}
    ]
  })
})
