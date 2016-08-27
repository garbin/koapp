var webpack = require('webpack')
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var rucksack = require('rucksack-css')
var config = require('../../config');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, '../../src'),
  entry: {
    app: [
      './client',
    ],
    vendor: [
      'expose?jQuery!expose?$!jquery', 'lodash',
      'react', 'react-dom',
      'react-router', 'redux',
      'react-redux', 'react-router-redux',
      'redux-form', 'redux-thunk',
      'font-awesome/css/font-awesome.min.css',
      'bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/js/bootstrap.min.js'
    ],
  },
  output: {
    path: path.join(__dirname, '../../storage/public'),
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
      { test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
      { test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss') }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias:{
      joi: 'joi-browser'
    }
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    process.env.WEBPACK_DASHBOARD ? new DashboardPlugin() : function(){},
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      __SERVER__: false,
      __CLIENT__: true
    }),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    port: config.port + 1,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    }
  }
}
