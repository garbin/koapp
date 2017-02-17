module.exports = Object.assign({}, require('./default/pm2'), require('./' + (process.env.NODE_ENV || 'development') + '/pm2'))
