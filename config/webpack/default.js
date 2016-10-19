var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');
var rucksack = require('rucksack-css');
var cssnext  = require('postcss-cssnext');
var nested  = require('postcss-nested');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('../../config');

var compiler = {
  devtool: 'source-map',
  context: path.join(__dirname, '../../src'),
  entry: {
    app: [
      './client',
    ],
    vendor: [
      'expose?jQuery!expose?$!jquery', 'lodash',
      'metismenu', 'metismenu/dist/metisMenu.min.css',
      'react', 'react-dom', 'react-router', 'redux',
      'react-redux', 'react-router-redux', 'redux-form', 'redux-thunk',
      'font-awesome/css/font-awesome.min.css', 'bootstrap/dist/css/bootstrap.css'
    ],
  },
  output: {
    path: path.join(__dirname, '../../storage/public'),
    filename: 'js/app.js',
    publicPath: '/'
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
        loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!postcss-loader!less-loader' },
      { test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!postcss-loader!sass-loader' },
      { test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader' },
    ],
  },
  // sassLoader: {
  //   data: '@import "' + path.resolve(__dirname, '../theme.scss') + '";'
  // },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias:{
      joi: 'joi-browser'
    }
  },
  postcss: [
    cssnext,
    nested,
  ],
  plugins: [
    process.env.WEBPACK_DASHBOARD ? new DashboardPlugin() : function(){},
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      __SERVER__: false,
      __CLIENT__: true
    }),
    new HtmlWebpackPlugin({
      title: 'Koapp',
      template: './index.ejs',
      filename: './index.html'
    }),
  ],
  devServer: {
    // contentBase: './public',
    // publicPath: '/',
    hot: true,
    port: config.dev_server_port || config.port + 1
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 100
    // }
  }
}

if (config.ssr) {
  var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
  var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));
  compiler.plugins.push(process.env.NODE_ENV!='production' ? webpackIsomorphicToolsPlugin.development() : webpackIsomorphicToolsPlugin);
}

module.exports = compiler;
