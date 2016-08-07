var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools'));
var development = false;
var root = './build';
if (process.env.NODE_ENV == 'development') {
  development = true;
  root = './src';
}

webpackIsomorphicTools.development(development).server(root, function () {
  require(root + '/server');
});

module.exports = webpackIsomorphicTools;
