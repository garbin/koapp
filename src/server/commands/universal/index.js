// const {default: server} = require('../')
const path = require('path')
const config = require('../../../../config')

exports.default = {
  command: 'universal',
  describe: 'run universal server',
  handler: argv => {
    if (config.universal.ssr) {
      const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
      const toolsConfig = require('../../../../config/webpack/isomorphic-tools')
      const webpackIsomorphicTools = new WebpackIsomorphicTools(toolsConfig)
      webpackIsomorphicTools.server(
        path.resolve(`${__dirname}/../../../client`),
        () => {
          global.__SERVER__ = true
          require('./server').default(webpackIsomorphicTools)
        })
    } else {
      require('./server').default()
    }
  }
}
