module.exports = Object.assign({}, require('./default/client'), require('./' + (process.env.NODE_ENV || 'development') + '/client'))
