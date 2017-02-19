const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../../config/server')
const assetDir = 'static/'

const compiler = {
  devtool: 'source-map',
  output: {
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
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'main', async: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
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

module.exports = compiler
