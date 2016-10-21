import {Router} from 'koapi'
import {queue} from '../services/queues/resque'


export default Router.define( router => {
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
  router.get('/', async (ctx) => {
    // return ctx.throw('haha', 422);
    let e = new Error('haha');
    e.name = 'ValidationError';
    throw e;
    ctx.body = 'Hello World! I\'m an API';
  });

  router.get('/test', async (ctx) => {
    queue.enqueue('abc', 'mailer', [{msg:'hehe'}]);
    ctx.body = 'hehe';
  });

  router.post('/', async (ctx) => {
    ctx.body = ctx.request.body;
  });
})
