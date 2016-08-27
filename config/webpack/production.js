var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));

module.exports = function (compiler) {
  compiler.plugins.push(webpackIsomorphicToolsPlugin);
  compiler.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));

  return compiler;
};
