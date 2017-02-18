process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, require('./default/service'), require(`./${process.env.NODE_ENV}/service`))
