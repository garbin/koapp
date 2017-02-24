process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const base = require('./default/webpack')
const clients = require('../app/clients')

module.exports = env => clients[env.client](require(`./${process.env.NODE_ENV}/webpack`)(base))
