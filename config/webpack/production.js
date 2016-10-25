var webpack = require('webpack');

module.exports = function (compiler) {
  compiler.plugins.push(new webpack.optimize.UglifyJsPlugin());

  return compiler;
};
