var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var rucksack = require('rucksack-css')
var env = process.env.NODE_ENV || 'development';
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
var config = require('./config');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    app: [
      './app',
    ],
    vendor: [
      'expose?jQuery!expose?$!jquery', 'lodash',
      'react', 'react-dom',
      'react-router', 'redux',
      'react-redux', 'react-router-redux',
      'redux-form', 'redux-thunk',
      'bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/js/bootstrap.min.js',
    ],
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'js/app.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /\.html$/,
        loader: 'file?name=[name].[ext]' },
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [ 'babel' ] },
      { test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=img/[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=100000&minetype=application/font-woff" },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=fonts/[name].[ext]" },
      { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=svg/[name].[ext]" },
      { test: /\.(scss|css)$/, // Only .less files
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass!postcss') }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias:{
      joi: 'joi-browser'
    }
    // packageAlias: 'browser'
  },
  node: {
    tls: 'empty',
    net: 'empty',
    dns: 'empty'
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'),
    new ExtractTextPlugin("css/[name].css"),
    (env == 'production' ? new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }) : function(){}),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),
    (env == 'production' ? webpackIsomorphicToolsPlugin.development() : webpackIsomorphicToolsPlugin ),

  ],
  devServer: {
    contentBase: './static',
    hot: true,
    port: config.webpack_port,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    }
  }
}
