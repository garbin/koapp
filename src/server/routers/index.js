import {ResourceRouter, Router} from 'koapi';
import Post from '../models/post';
import Comment from '../models/comment';
import index from './default'
import auth from './auth'
import clients from './oauth/clients'
import token from './oauth/token'
import {subdomain} from 'koapi/lib/middlewares'

const posts = ResourceRouter.define(Post.collection());

const comments =  ResourceRouter.define({
  collection: ctx => ctx.state.post.comments(),
  model: Comment,
  setup(router){
    router.use(async (ctx, next)=>{
      ctx.state.post = await Post.where({id:ctx.params.post_id}).fetch({required:true});
      await next()
    });
    router.crud();
  }
});

posts.use('/posts/:post_id(\\d+)', comments.routes());

const sm = Router.define(router => {
  router.get('/', async (ctx) => {
    ctx.body = 'api';
  });
});

export const nested = [
  comments,
];

export default [
  subdomain('api.*', sm.routes()),
  index,
  posts,
  auth,
  token,
  clients,
]
