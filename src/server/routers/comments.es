import { ResourceRouter } from 'koapi'
import Comment from '../models/comment'
import Post from '../models/post'
import posts from './posts'

export const comments = ResourceRouter.define({
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

export default posts.use('/posts/:post_id(\\d+)', comments.routes());
