const { Router } = require('koapi')

exports.default = Router.define(router => {
  /**
   * @api {get} / Index
   * @apiName Index
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */
  router.get('/', async ctx => {
    // return ctx.throw('haha', 422);
    let e = new Error('haha')
    e.name = 'ValidationError'
    throw e
  })
  router.get('/resources', async ctx => {
    // await new Promise((resolve, reject) => {
    //   setTimeout(resolve, 1000)
    // })
    ctx.body = [
      {
        id: 1,
        media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
        name: '12 Myths Uncovered About IT & Software',
        sales: '46323',
        stats: '',
        category: 'Software',
        author: 'Meadow Katheryne',
        created_at: '120129'
      },
      {
        id: 2,
        media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
        name: '12 Myths Uncovered About IT & Software',
        sales: '46323',
        stats: '',
        category: 'Software',
        author: 'Meadow Katheryne',
        created_at: '120129'
      },
      {
        id: 3,
        media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
        name: '12 Myths Uncovered About IT & Software',
        sales: '46323',
        stats: '',
        category: 'Software',
        author: 'Meadow Katheryne',
        created_at: '120129'
      }
    ]
  })

  router.get('/test', async ctx => {
    const { queue } = require('../../services/queues/resque')
    queue.enqueue('abc', 'mailer', [{ msg: 'hehe' }])
    ctx.body = 'hehe'
  })

  router.post('/', async ctx => {
    ctx.body = ctx.request.body
  })
})
