import { ResourceRouter } from 'koapi'
import Comment from '../models/comment'

export default ResourceRouter.define({
  collection: ctx => ctx.state.children.post.comments(),
  model: Comment,
  setup (router) {
    router.crud()
  }
})
