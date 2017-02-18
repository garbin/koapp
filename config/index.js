process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = Object.assign({
  server: require('./server'),
  service: require('./service')
}, require('./default'), require(`./${process.env.NODE_ENV}`))
