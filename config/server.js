process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, require('./default/server'), require(`./${process.env.NODE_ENV}/server`))
