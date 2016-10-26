var webpack = require('webpack');
// var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');
var rucksack = require('rucksack-css');
var cssnext  = require('postcss-cssnext');
var nested  = require('postcss-nested');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('../../config');
var asset_dir = 'static/';
var css_options = {
  sourceMap: true,
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]-[local]___[hash:base64:5]'
};

var compiler = {
  devtool: 'source-map',
  context: path.join(__dirname, '../../src/client'),
  entry:  './index.js',
  output: {
    path: path.join(__dirname, '../../storage/public'),
    filename: asset_dir + 'js/[name].js',
    chunkFilename: asset_dir + 'js/[chunkhash].[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel' },
      { test: /\.(png|jpg|gif)$/,
        loader: 'file',
        options: {
          name: asset_dir + 'img/[name].[ext]'
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          limit: 100000,
          mimetype: 'application/font-woff'
        }
      },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: asset_dir + "fonts/[name].[ext]"
        }
       },
      { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: asset_dir + "svg/[name].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style', 'css', 'postcss'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias:{
      joi: 'joi-browser'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, '../../src/client'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      async: true,
    }),
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
    hot: true,
    port: config.client_dev_port || config.port + 1
  }
}

if (config.universal.ssr) {
  var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
  var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));
  compiler.plugins.push(process.env.NODE_ENV!='production' ? webpackIsomorphicToolsPlugin.development() : webpackIsomorphicToolsPlugin);
}

module.exports = compiler;
