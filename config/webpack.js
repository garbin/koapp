process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = require('./' + process.env.NODE_ENV + '/webpack')(require('./default/webpack'))
