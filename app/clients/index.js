const { storage } = require('../lib/helper')
const path = require('path')
const config = require('../../config/client')

module.exports = {
  website (compiler) {
    compiler.context = path.join(__dirname, './website')
    compiler.entry = {
      main: './index.js',
      vendor: [
        'react', 'redux', 'react-redux', 'react-router-redux', 'react-router',
        'redux-actions', 'react-dom', 'react-addons-css-transition-group'
      ]
    }
    compiler.output.path = storage('/public/website')
    compiler.devServer.port = 5001
    return compiler
  },
  admin (compiler) {
    compiler.context = path.join(__dirname, './admin')
    compiler.entry = {
      main: './index.js',
      vendor: [
        'react', 'redux', 'react-redux', 'react-router-redux', 'react-router',
        'redux-actions', 'react-dom', 'react-addons-css-transition-group'
      ]
    }
    compiler.output.path = storage('/public/admin')
    compiler.output.publicPath = config.admin.basename
    compiler.devServer.port = 5002
    return compiler
  }
}
