var webpack = require('webpack')
// var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../../config')
var assetDir = 'static/'

var compiler = {
  devtool: 'source-map',
  context: path.join(__dirname, '../../app/client'),
  entry: {
    main: './index.js',
    vendor: [
      'react', 'redux', 'react-redux', 'react-router-redux', 'react-router',
      'redux-actions', 'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, '../../storage/public'),
    filename: assetDir + 'js/[name].js',
    chunkFilename: assetDir + 'js/[chunkhash].[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader' },
      { test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: assetDir + 'img/[name].[ext]'
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          mimetype: 'application/font-woff'
        }
      },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: assetDir + 'fonts/[name].[ext]'
        }
      },
      { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: assetDir + 'svg/[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      joi: 'joi-browser'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, '../../app/client')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'main', async: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        __SERVER__: JSON.stringify(false),
        __CLIENT__: JSON.stringify(true)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Koapp',
      template: './index.ejs',
      filename: './index.html'
    })
  ],
  devServer: {
    hot: false,
    compress: true,
    port: config.client_dev_port || config.port + 1
  }
}

if (config.universal.ssr) {
  var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
  var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'))
  compiler.plugins.push(process.env.NODE_ENV !== 'production' ? webpackIsomorphicToolsPlugin.development() : webpackIsomorphicToolsPlugin)
}

module.exports = compiler
