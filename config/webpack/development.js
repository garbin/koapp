var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));

module.exports = function (compiler) {
  compiler.devtool = 'cheap-module-eval-source-map';
  compiler.plugins.push(webpackIsomorphicToolsPlugin.development());

  return compiler;
};
