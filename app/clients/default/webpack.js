const webpack = require('webpack')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const assetDir = 'static/'
const pkg = require('../../../package')
const { path } = require('../../lib/helper')
const client = require('./config')
const { config } = require('koapi')

const compiler = {
  devtool: 'source-map',
  context: __dirname,
  entry: {
    main: './index.js',
    vendor: [
      'react', 'redux', 'react-redux', 'react-router-redux', 'react-router',
      'redux-actions', 'react-dom', 'react-addons-css-transition-group'
    ]
  },
  output: {
    filename: assetDir + 'js/[name].js',
    chunkFilename: assetDir + 'js/[chunkhash].[name].js',
    path: path.storage('/public/default'),
    publicPath: client.basename || '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader' },
      { test: /\.(exec|min)\.(js|jsx)$/,
        loader: 'script-loader' },
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
        use: [ 'style-loader', 'css-loader?importLoaders=1', 'postcss-loader' ]
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
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'main', async: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      title: `${pkg.title} - ${pkg.name}`,
      template: './index.ejs',
      filename: './index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss () {
          return [ require('postcss-cssnext')() ]
        }
      }
    })
  ],
  devServer: {
    hot: false,
    compress: true,
    port: 5002
  }
}

module.exports = Object.assign(compiler, config('webpack/default').all())
