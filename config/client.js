process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, require('./default/client'), require('./' + process.env.NODE_ENV + '/client'))
