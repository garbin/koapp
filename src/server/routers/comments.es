import { ResourceRouter } from 'koapi'
import Comment from '../models/comment'
import Post from '../models/post'

export default ResourceRouter.define({
  collection: ctx => ctx.state.post.comments(),
  model: Comment,
  setup (router) {
    router.use(async (ctx, next) => {
      ctx.state.post = await Post.where({ id: ctx.params.post_id }).fetch({ required: true })
      await next()
    })
    router.crud()
  }
})
