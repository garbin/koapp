import { ResourceRouter } from 'koapi';
import Post from '../models/post';

export default ResourceRouter.define(Post.collection());
