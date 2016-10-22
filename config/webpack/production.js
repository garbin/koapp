var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function (compiler) {
  compiler.module.loaders[6].loader = ExtractTextPlugin.extract('style',
    'css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!postcss!less');
  compiler.module.loaders[7].loader = ExtractTextPlugin.extract('style',
    'css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!postcss!sass');
  compiler.module.loaders[8].loader = ExtractTextPlugin.extract('style',
    'css!postcss');
  compiler.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
  compiler.plugins.push(new ExtractTextPlugin("static/css/[name].css"));

  return compiler;
};
