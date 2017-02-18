process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, require('./default/pm2'), require(`./${process.env.NODE_ENV}/pm2`))
