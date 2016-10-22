// import server from '../'
import config from '../../../../config'
import path from 'path'

export default {
  command: 'universal',
  description: 'run universal server',
  action: (options) => {
    if (config.universal.ssr) {
      var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
      var tools_config = require('../../../../config/webpack/isomorphic-tools');
      var webpackIsomorphicTools = new WebpackIsomorphicTools(tools_config);
      webpackIsomorphicTools.server(
        path.resolve(__dirname + '/../../../client'),
        function () {
          global.__SERVER__ = true;
          require('./server').default(webpackIsomorphicTools);
      });
    } else {
      require('./server').default();
    }
  }
};
