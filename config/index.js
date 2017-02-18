process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, require('./default'), require('./' + process.env.NODE_ENV))
