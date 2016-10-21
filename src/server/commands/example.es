import Post from '../models/post'
import {Model} from 'koapi'
import log from 'winston'

// see https://github.com/tj/commander.js
export default {
  command: 'example [test]',
  description: 'Example',
  options:{
    '-h, --haha [mode]': 'Haha'
  },
  action: async (test, options) => {
    // test will be [test]
    // options can access options
    // console.log(test, options.haha || '(not set)', await Post.fetchAll());
    log.info('haha', await Post.fetchAll());
  },
  done: async()=>{
    log.info('done');
  }
};
