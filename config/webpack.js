module.exports = require('./' + (process.env.NODE_ENV || 'development') + '/webpack')(require('./default/webpack'))
