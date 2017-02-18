const env = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, require('./default/client'), require(`./${env}/client`))
