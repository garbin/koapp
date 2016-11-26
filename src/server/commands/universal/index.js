// import server from '../'
import path from 'path';
import config from '../../../../config';

export default {
  command: 'universal',
  description: 'run universal server',
  action: options => {
    if (config.universal.ssr) {
      const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
      const toolsConfig = require('../../../../config/webpack/isomorphic-tools');
      const webpackIsomorphicTools = new WebpackIsomorphicTools(toolsConfig);
      webpackIsomorphicTools.server(
        path.resolve(`${__dirname}/../../../client`),
        () => {
          global.__SERVER__ = true;
          require('./server').default(webpackIsomorphicTools);
        });
    } else {
      require('./server').default();
    }
  },
};
