var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools'));
var development = false;
var root = './build';
if (process.env.NODE_ENV == 'development') {
  development = true;
  root = './src';
  require('babel-register');
}

webpackIsomorphicTools.development(development).server(root, function () {
  require('babel-polyfill');
  require(root + '/server');
});

module.exports = webpackIsomorphicTools;
