exports.default = {
  command: 'example [test]',
  describe: 'Example',
  builder: yargs => yargs.option('haha', {
    alias: 'h',
    default: 'Haha'
  }),
  handler: async (argv) => {
    const { Model } = require('koapi')
    const config = require('../../../config')
    Model.initialize(config.database)
    const log = require('winston')
    const { Post } = require('../models')
    log.info('haha', await Post.fetchAll())
  }
}
