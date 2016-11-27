import { ResourceRouter } from 'koapi'
import Post from '../models/post'
import comments from './comments'

export default ResourceRouter.define(Post.collection()).use('/posts/:post_id(\\d+)', comments.routes())
