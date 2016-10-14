var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function (compiler) {
  compiler.plugins.push(webpackIsomorphicToolsPlugin);
  compiler.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
  compiler.plugins.push(new ExtractTextPlugin("css/[name].css"));
  compiler.module.loaders[7].loader = ExtractTextPlugin.extract('style',
    'css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!postcss!less');
  compiler.module.loaders[8].loader = ExtractTextPlugin.extract('style',
    'css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!postcss!sass');
  compiler.module.loaders[9].loader = ExtractTextPlugin.extract('style',
    'css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!postcss');
    
  return compiler;
};
