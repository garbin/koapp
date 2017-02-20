exports.default = {
  command: 'example [test]',
  describe: 'Example',
  builder: yargs => yargs.option('haha', {
    alias: 'h',
    default: 'Haha'
  }),
  handler: async (argv) => {
    const log = require('winston')
    const { Post } = require('../models')
    let a = await Post.fetchAll()
    log.info('haha', a.toJSON())
  }
}
